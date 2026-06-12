export type RequestMethod = "get" | "delete" | "post" | "put" | "patch";

export type ResponseType = "json" | "text" | "stream" | "arraybuffer" | "blob";

export type ParamsSerializer =
  | ((params: Record<string, unknown>) => string)
  | {
      serialize(params: Record<string, unknown>): string;
    };

export type FetchFunction = typeof fetch;

export type TransportErrorType =
  | "network"
  | "timeout"
  | "abort"
  | "parse"
  | "http";

export interface TypesenseRequest {
  method: RequestMethod;
  url: string;
  headers: Record<string, string>;
  queryParameters: Record<string, unknown>;
  bodyParameters?: unknown;
  body?: unknown;
  responseType?: ResponseType;
  isStreamingRequest?: boolean;
}

export interface TypesenseResponse<T = unknown> {
  status: number;
  headers: Record<string, string>;
  data: T;
  body: ReadableStream<Uint8Array> | null;
  request: TypesenseRequest;
  responseType?: ResponseType;
}

export interface TypesenseRequestHookContext {
  requestNumber: number;
  attemptNumber: number;
  nodeIndex: string | number;
}

export type TypesenseResponseHookContext = TypesenseRequestHookContext;

export interface TypesenseErrorHookContext extends TypesenseRequestHookContext {
  errorType: TransportErrorType;
  response?: TypesenseResponse;
}

export type RequestHook = (
  request: TypesenseRequest,
  context: TypesenseRequestHookContext,
) => void | Promise<void>;

export type ResponseHook = (
  response: TypesenseResponse,
  context: TypesenseResponseHookContext,
) => void | Promise<void>;

export type ErrorHook = (
  error: unknown,
  context: TypesenseErrorHookContext,
) => void | Promise<void>;

export interface FetchTransportOptions {
  fetch?: FetchFunction;
  paramsSerializer?: ParamsSerializer;
  dispatcher?: unknown;
  requestHooks?: RequestHook[];
  responseHooks?: ResponseHook[];
  errorHooks?: ErrorHook[];
  connectionTimeoutSeconds: number;
}

export interface FetchTransportRequestOptions {
  abortSignal?: AbortSignal | null;
  skipConnectionTimeout?: boolean;
  requestNumber: number;
  attemptNumber: number;
  nodeIndex: string | number;
}

export class FetchTransportError extends Error {
  readonly type: TransportErrorType;
  readonly request?: TypesenseRequest;
  readonly response?: TypesenseResponse;
  readonly originalError?: unknown;

  constructor(
    type: TransportErrorType,
    message: string,
    {
      request,
      response,
      originalError,
    }: {
      request?: TypesenseRequest;
      response?: TypesenseResponse;
      originalError?: unknown;
    } = {},
  ) {
    super(message);
    this.name = "FetchTransportError";
    this.type = type;
    this.request = request;
    this.response = response;
    this.originalError = originalError;
  }
}

const isNodeJSEnvironment =
  typeof process !== "undefined" &&
  process.versions != null &&
  process.versions.node != null &&
  typeof window === "undefined";

export default class FetchTransport {
  constructor(private readonly options: FetchTransportOptions) {}

  async perform<T>(
    request: TypesenseRequest,
    requestOptions: FetchTransportRequestOptions,
  ): Promise<TypesenseResponse<T>> {
    const mutableRequest: TypesenseRequest = {
      ...request,
      headers: { ...request.headers },
      queryParameters: { ...request.queryParameters },
    };

    await this.runRequestHooks(mutableRequest, requestOptions);

    const abortController = new AbortController();
    let abortType: "caller" | "timeout" | undefined;
    let timeoutHandle: ReturnType<typeof setTimeout> | undefined;
    let abortListener: (() => void) | undefined;

    const callerAbortSignal = requestOptions.abortSignal;
    if (callerAbortSignal?.aborted) {
      throw new FetchTransportError("abort", "Request aborted by caller.", {
        request: mutableRequest,
      });
    }

    if (callerAbortSignal) {
      abortListener = () => {
        abortType = "caller";
        abortController.abort();
      };
      callerAbortSignal.addEventListener("abort", abortListener);
    }

    if (requestOptions.skipConnectionTimeout !== true) {
      timeoutHandle = setTimeout(() => {
        abortType = "timeout";
        abortController.abort();
      }, this.options.connectionTimeoutSeconds * 1000);
    }

    try {
      const fetchFn = this.fetchFn();
      const url = this.urlWithQueryParameters(
        mutableRequest.url,
        mutableRequest.queryParameters,
      );
      const body = this.serializedBody(mutableRequest);
      mutableRequest.url = url;
      mutableRequest.body = body;

      const init: RequestInit & { dispatcher?: unknown; duplex?: "half" } = {
        method: mutableRequest.method.toUpperCase(),
        headers: mutableRequest.headers,
        signal: abortController.signal,
      };

      if (body !== undefined) {
        init.body = body as BodyInit;
        if (isNodeJSEnvironment) {
          init.duplex = "half";
        }
      }

      if (this.options.dispatcher !== undefined) {
        init.dispatcher = this.options.dispatcher;
      }

      const rawResponse = await fetchFn(url, init);
      const response = await this.normalizedResponse<T>(
        rawResponse,
        mutableRequest,
      );

      await this.runResponseHooks(response, requestOptions);

      return response;
    } catch (error) {
      if (error instanceof FetchTransportError) {
        await this.runErrorHooks(error, error.type, requestOptions);
        throw error;
      }

      const type =
        abortType === "caller"
          ? "abort"
          : abortType === "timeout"
            ? "timeout"
            : "network";
      const message =
        type === "abort"
          ? "Request aborted by caller."
          : type === "timeout"
            ? `Request timed out after ${this.options.connectionTimeoutSeconds} seconds.`
            : error instanceof Error
              ? error.message
              : String(error);
      const transportError = new FetchTransportError(type, message, {
        request: mutableRequest,
        originalError: error,
      });
      await this.runErrorHooks(transportError, type, requestOptions);
      throw transportError;
    } finally {
      if (timeoutHandle !== undefined) {
        clearTimeout(timeoutHandle);
      }
      if (callerAbortSignal && abortListener) {
        callerAbortSignal.removeEventListener("abort", abortListener);
      }
    }
  }

  async notifyError(
    error: unknown,
    type: TransportErrorType,
    requestOptions: FetchTransportRequestOptions,
    response?: TypesenseResponse,
  ): Promise<void> {
    await this.runErrorHooks(error, type, requestOptions, response);
  }

  private fetchFn(): FetchFunction {
    if (this.options.fetch) {
      return this.options.fetch;
    }

    if (typeof globalThis.fetch !== "function") {
      throw new FetchTransportError(
        "network",
        "No fetch implementation is available. Pass a custom fetch implementation in ConfigurationOptions.fetch.",
      );
    }

    return globalThis.fetch.bind(globalThis);
  }

  private async normalizedResponse<T>(
    response: Response,
    request: TypesenseRequest,
  ): Promise<TypesenseResponse<T>> {
    const headers = this.headersToObject(response.headers);
    const responseType = request.isStreamingRequest
      ? "stream"
      : request.responseType;

    try {
      const data = await this.responseData(response, responseType);
      return {
        status: response.status,
        headers,
        data: data as T,
        body: response.body,
        request,
        responseType,
      };
    } catch (error) {
      throw new FetchTransportError("parse", "Failed to parse response body.", {
        request,
        originalError: error,
      });
    }
  }

  private async responseData(
    response: Response,
    responseType?: ResponseType,
  ): Promise<unknown> {
    if (responseType === "stream") {
      return response.body;
    }

    if (responseType === "arraybuffer") {
      return response.arrayBuffer();
    }

    if (responseType === "blob") {
      return response.blob();
    }

    const contentType = response.headers.get("content-type") || "";
    const text = await response.text();

    if (text === "") {
      return "";
    }

    if (
      responseType === "json" ||
      contentType.toLowerCase().startsWith("application/json")
    ) {
      return JSON.parse(text);
    }

    return text;
  }

  private urlWithQueryParameters(
    url: string,
    queryParameters: Record<string, unknown>,
  ): string {
    if (Object.keys(queryParameters).length === 0) {
      return url;
    }

    const serializedQueryParameters =
      this.serializeQueryParameters(queryParameters);

    if (serializedQueryParameters === "") {
      return url;
    }

    const separator = url.includes("?") ? "&" : "?";
    return `${url}${separator}${serializedQueryParameters}`;
  }

  private serializeQueryParameters(
    queryParameters: Record<string, unknown>,
  ): string {
    const serializer = this.options.paramsSerializer;

    if (typeof serializer === "function") {
      return serializer(queryParameters);
    }

    if (serializer && typeof serializer.serialize === "function") {
      return serializer.serialize(queryParameters);
    }

    const urlSearchParams = new URLSearchParams();
    Object.entries(queryParameters).forEach(([key, value]) => {
      if (value === undefined || value === null) {
        return;
      }

      if (Array.isArray(value)) {
        value.forEach((entry) => {
          if (entry !== undefined && entry !== null) {
            urlSearchParams.append(key, String(entry));
          }
        });
        return;
      }

      urlSearchParams.append(key, String(value));
    });

    return urlSearchParams.toString();
  }

  private serializedBody(request: TypesenseRequest): unknown {
    const body =
      request.body !== undefined ? request.body : request.bodyParameters;

    if (body === undefined || body === null) {
      return undefined;
    }

    if (typeof body === "string") {
      return body.length === 0 ? undefined : body;
    }

    if (typeof body === "object" && this.isPlainEmptyObject(body)) {
      return undefined;
    }

    if (this.shouldSerializeAsJSON(request.headers, body)) {
      return JSON.stringify(body);
    }

    return body;
  }

  private shouldSerializeAsJSON(
    _headers: Record<string, string>,
    body: unknown,
  ): boolean {
    if (typeof body !== "object" || body === null) {
      return false;
    }

    if (this.isBodyInit(body)) {
      return false;
    }

    return true;
  }

  private isBodyInit(body: object): boolean {
    return (
      (typeof ArrayBuffer !== "undefined" && body instanceof ArrayBuffer) ||
      (typeof Blob !== "undefined" && body instanceof Blob) ||
      (typeof FormData !== "undefined" && body instanceof FormData) ||
      (typeof URLSearchParams !== "undefined" &&
        body instanceof URLSearchParams) ||
      (typeof ReadableStream !== "undefined" &&
        body instanceof ReadableStream) ||
      ("pipe" in body && typeof body["pipe"] === "function")
    );
  }

  private isPlainEmptyObject(body: object): boolean {
    return (
      Object.prototype.toString.call(body) === "[object Object]" &&
      Object.keys(body).length === 0
    );
  }

  private headersToObject(headers: Headers): Record<string, string> {
    const result: Record<string, string> = {};
    headers.forEach((value, key) => {
      result[key] = value;
    });
    return result;
  }

  private async runRequestHooks(
    request: TypesenseRequest,
    requestOptions: FetchTransportRequestOptions,
  ): Promise<void> {
    for (const hook of this.options.requestHooks || []) {
      await hook(request, this.hookContext(requestOptions));
    }
  }

  private async runResponseHooks(
    response: TypesenseResponse,
    requestOptions: FetchTransportRequestOptions,
  ): Promise<void> {
    for (const hook of this.options.responseHooks || []) {
      await hook(response, this.hookContext(requestOptions));
    }
  }

  private async runErrorHooks(
    error: unknown,
    errorType: TransportErrorType,
    requestOptions: FetchTransportRequestOptions,
    response?: TypesenseResponse,
  ): Promise<void> {
    for (const hook of this.options.errorHooks || []) {
      await hook(error, {
        ...this.hookContext(requestOptions),
        errorType,
        response,
      });
    }
  }

  private hookContext(
    requestOptions: FetchTransportRequestOptions,
  ): TypesenseRequestHookContext {
    return {
      requestNumber: requestOptions.requestNumber,
      attemptNumber: requestOptions.attemptNumber,
      nodeIndex: requestOptions.nodeIndex,
    };
  }
}
