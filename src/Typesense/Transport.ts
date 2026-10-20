import { fetch as undiciFetch, getGlobalDispatcher, Dispatcher } from "undici";
import FetchTransportError from "./Errors/FetchTransportError";

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

const isNodeJSEnvironment =
  typeof process !== "undefined" &&
  process.versions != null &&
  process.versions.node != null &&
  typeof window === "undefined";

// Browser and edge bundles replace Undici with an empty module, including
// runtimes that report a Node version, such as Cloudflare's nodejs_compat
const isUndiciAvailable =
  isNodeJSEnvironment &&
  typeof undiciFetch === "function" &&
  typeof getGlobalDispatcher === "function";

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
    let streamReturned = false;
    let responseBody: ReadableStream<Uint8Array> | null = null;
    let bodyErrorReported = false;

    const cleanup = () => {
      if (timeoutHandle !== undefined) {
        clearTimeout(timeoutHandle);
      }
      if (callerAbortSignal && abortListener) {
        callerAbortSignal.removeEventListener("abort", abortListener);
      }
    };
    const resetTimeout = () => {
      if (timeoutHandle !== undefined) clearTimeout(timeoutHandle);
      if (
        requestOptions.skipConnectionTimeout !== true &&
        this.options.connectionTimeoutSeconds > 0
      ) {
        timeoutHandle = setTimeout(() => {
          if (abortType !== undefined) return;
          abortType = "timeout";
          abortController.abort();
        }, this.options.connectionTimeoutSeconds * 1000);
      }
    };
    const classifyError = (error: unknown): FetchTransportError => {
      // Cancellation takes precedence even if a body reader wraps the abort.
      if (abortType === undefined && error instanceof FetchTransportError) {
        return error;
      }
      if (abortType === "caller") {
        return new FetchTransportError("abort", "Request aborted by caller.", {
          request: mutableRequest,
          originalError: error,
        });
      }
      if (abortType === "timeout") {
        return new FetchTransportError(
          "timeout",
          `Request timed out after ${this.options.connectionTimeoutSeconds} seconds.`,
          { request: mutableRequest, originalError: error },
        );
      }
      return new FetchTransportError("network", networkErrorMessage(error), {
        code: networkErrorCode(error),
        request: mutableRequest,
        originalError: error,
      });
    };

    const callerAbortSignal = requestOptions.abortSignal;
    if (callerAbortSignal?.aborted) {
      throw new FetchTransportError("abort", "Request aborted by caller.", {
        request: mutableRequest,
      });
    }

    if (callerAbortSignal) {
      abortListener = () => {
        if (abortType !== undefined) return;
        abortType = "caller";
        abortController.abort();
      };
      callerAbortSignal.addEventListener("abort", abortListener);
    }

    resetTimeout();

    try {
      const fetchFn = this.fetchFn(requestOptions);
      const url = this.urlWithQueryParameters(
        mutableRequest.url,
        mutableRequest.queryParameters,
      );
      const body = this.serializedBody(mutableRequest);
      mutableRequest.url = url;
      mutableRequest.body = body;
      if (body === undefined) {
        // A bodyless GET with Content-Type is not a CORS simple request, so
        // browsers would send a preflight before every search.
        Object.keys(mutableRequest.headers)
          .filter((name) => name.toLowerCase() === "content-type")
          .forEach((name) => delete mutableRequest.headers[name]);
      }

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
      if (isUndiciAvailable && requestOptions.skipConnectionTimeout === true) {
        const dispatcher = (this.options.dispatcher ??
          getGlobalDispatcher()) as Dispatcher;
        // Override at dispatch time: some native fetch versions explicitly pass
        // their own timeouts, which would override an Agent's defaults.
        init.dispatcher = {
          dispatch: (
            options: Dispatcher.DispatchOptions,
            handler: Parameters<Dispatcher["dispatch"]>[1],
          ) =>
            dispatcher.dispatch(
              { ...options, headersTimeout: 0, bodyTimeout: 0 },
              handler,
            ),
        };
      }

      const rawResponse = await fetchFn(url, init);
      if (isNodeJSEnvironment) resetTimeout();
      responseBody = rawResponse.body
        ? this.managedBody(rawResponse.body, {
            signal: abortController.signal,
            cleanup,
            onActivity: () => {
              if (isNodeJSEnvironment) resetTimeout();
            },
            classifyError,
            onError: async (error) => {
              bodyErrorReported = true;
              await this.runErrorHooks(error, error.type, requestOptions);
            },
          })
        : null;
      const response = await this.normalizedResponse<T>(
        rawResponse,
        mutableRequest,
        responseBody,
      );

      await this.runResponseHooks(response, requestOptions);
      if (abortController.signal.aborted) {
        throw classifyError(abortController.signal.reason);
      }

      streamReturned =
        response.responseType === "stream" && responseBody !== null;
      return response;
    } catch (error) {
      if (responseBody && !responseBody.locked) {
        await responseBody.cancel().catch(() => {});
      }
      const transportError = classifyError(error);
      if (!bodyErrorReported) {
        await this.runErrorHooks(
          transportError,
          transportError.type,
          requestOptions,
        );
      }
      throw transportError;
    } finally {
      if (!streamReturned) cleanup();
    }
  }

  private managedBody(
    body: ReadableStream<Uint8Array>,
    lifecycle: {
      signal: AbortSignal;
      cleanup: () => void;
      onActivity: () => void;
      classifyError: (error: unknown) => FetchTransportError;
      onError: (error: FetchTransportError) => Promise<void>;
    },
  ): ReadableStream<Uint8Array> {
    const reader = body.getReader();
    let finished = false;
    let abortListener: () => void;
    const cleanup = () => {
      finished = true;
      lifecycle.signal.removeEventListener("abort", abortListener);
      lifecycle.cleanup();
    };
    let fail: (error: unknown) => Promise<void>;
    return new ReadableStream<Uint8Array>({
      start(controller) {
        fail = async (error) => {
          if (finished) return;
          cleanup();
          const transportError = lifecycle.classifyError(error);
          // Cancel also unblocks a pending read when a custom fetch ignores abort.
          void reader
            .cancel(error)
            .catch(() => {})
            .finally(() => reader.releaseLock());
          try {
            await lifecycle.onError(transportError);
            controller.error(transportError);
          } catch (hookError) {
            controller.error(hookError);
          }
        };
        abortListener = () => {
          void fail(lifecycle.signal.reason);
        };
        lifecycle.signal.addEventListener("abort", abortListener);
        if (lifecycle.signal.aborted) abortListener();
      },
      async pull(controller) {
        try {
          const { done, value } = await reader.read();
          if (finished) return;
          if (done) {
            cleanup();
            reader.releaseLock();
            controller.close();
          } else {
            lifecycle.onActivity();
            controller.enqueue(value);
          }
        } catch (error) {
          await fail(error);
        }
      },
      async cancel(reason) {
        cleanup();
        try {
          await reader.cancel(reason);
        } finally {
          reader.releaseLock();
        }
      },
    });
  }

  async notifyError(
    error: unknown,
    type: TransportErrorType,
    requestOptions: FetchTransportRequestOptions,
    response?: TypesenseResponse,
  ): Promise<void> {
    await this.runErrorHooks(error, type, requestOptions, response);
  }

  private fetchFn(requestOptions: FetchTransportRequestOptions): FetchFunction {
    if (this.options.fetch) {
      return this.options.fetch;
    }

    if (
      isUndiciAvailable &&
      (requestOptions.skipConnectionTimeout === true ||
        this.options.dispatcher !== undefined)
    ) {
      // Keep fetch and its dispatcher on the same Undici major. Node's native
      // fetch bundles a different one per release (6 on Node 20 and 22, 7 on
      // Node 24, 8 on Node 26), and the handler API changes between majors.
      return undiciFetch as unknown as FetchFunction;
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
    body: ReadableStream<Uint8Array> | null,
  ): Promise<TypesenseResponse<T>> {
    const headers = this.headersToObject(response.headers);
    const requestedType = request.isStreamingRequest
      ? "stream"
      : request.responseType;
    // Error responses must be consumed before retrying or throwing an HTTP
    // error. Fetch implementations without body streams, such as React
    // Native's, give streaming conversations the full text instead.
    const responseType =
      requestedType === "stream" &&
      (!response.ok || (body === null && request.isStreamingRequest))
        ? "text"
        : requestedType;

    const data =
      responseType === "stream"
        ? body
        : await this.responseData(
            body === null
              ? response
              : new Response(body, { headers: response.headers }),
            responseType,
            request,
          );
    return {
      status: response.status,
      headers,
      data: data as T,
      body,
      request,
      responseType,
    };
  }

  private async responseData(
    response: Response,
    responseType?: ResponseType,
    request?: TypesenseRequest,
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
      try {
        return JSON.parse(text);
      } catch (error) {
        throw new FetchTransportError(
          "parse",
          "Failed to parse response body.",
          {
            request,
            originalError: error,
          },
        );
      }
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
            urlSearchParams.append(`${key}[]`, String(entry));
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

    if (typeof body !== "object") {
      return body;
    }

    if (this.isEmptyObjectOrArray(body)) {
      return undefined;
    }

    return this.isBodyInit(body) ? body : JSON.stringify(body);
  }

  private isBodyInit(body: object): boolean {
    return (
      (typeof ArrayBuffer !== "undefined" &&
        (body instanceof ArrayBuffer || ArrayBuffer.isView(body))) ||
      (typeof Blob !== "undefined" && body instanceof Blob) ||
      (typeof FormData !== "undefined" && body instanceof FormData) ||
      (typeof URLSearchParams !== "undefined" &&
        body instanceof URLSearchParams) ||
      (typeof ReadableStream !== "undefined" &&
        body instanceof ReadableStream) ||
      ("pipe" in body && typeof body["pipe"] === "function")
    );
  }

  private isEmptyObjectOrArray(body: object): boolean {
    return Array.isArray(body)
      ? body.length === 0
      : Object.prototype.toString.call(body) === "[object Object]" &&
          Object.keys(body).length === 0;
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

type ErrorDetails = { message?: unknown; code?: unknown; errors?: unknown };

// Undici reports "fetch failed" and keeps the socket error in `cause`, which
// is an AggregateError when every address of a host refuses the connection.
function networkErrorSources(error: unknown): ErrorDetails[] {
  const outer = (error ?? {}) as ErrorDetails & { cause?: unknown };
  const cause = outer.cause as ErrorDetails | undefined;
  const firstOfCause = Array.isArray(cause?.errors)
    ? (cause.errors[0] as ErrorDetails | undefined)
    : undefined;
  return [cause, firstOfCause, outer].filter(
    (source): source is ErrorDetails =>
      typeof source === "object" && source !== null,
  );
}

function networkErrorMessage(error: unknown): string {
  const message = networkErrorSources(error)
    .map((source) => source.message)
    .find(
      (value): value is string => typeof value === "string" && value !== "",
    );
  return message ?? String(error);
}

function networkErrorCode(error: unknown): string | undefined {
  return networkErrorSources(error)
    .map((source) => source.code)
    .find((value): value is string => typeof value === "string");
}
