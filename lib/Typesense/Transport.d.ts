export type RequestMethod = "get" | "delete" | "post" | "put" | "patch";
export type ResponseType = "json" | "text" | "stream" | "arraybuffer" | "blob";
export type ParamsSerializer = ((params: Record<string, unknown>) => string) | {
    serialize(params: Record<string, unknown>): string;
};
export type FetchFunction = typeof fetch;
export type TransportErrorType = "network" | "timeout" | "abort" | "parse" | "http";
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
export type RequestHook = (request: TypesenseRequest, context: TypesenseRequestHookContext) => void | Promise<void>;
export type ResponseHook = (response: TypesenseResponse, context: TypesenseResponseHookContext) => void | Promise<void>;
export type ErrorHook = (error: unknown, context: TypesenseErrorHookContext) => void | Promise<void>;
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
export declare class FetchTransportError extends Error {
    readonly type: TransportErrorType;
    readonly request?: TypesenseRequest;
    readonly response?: TypesenseResponse;
    readonly originalError?: unknown;
    constructor(type: TransportErrorType, message: string, { request, response, originalError, }?: {
        request?: TypesenseRequest;
        response?: TypesenseResponse;
        originalError?: unknown;
    });
}
export default class FetchTransport {
    private readonly options;
    constructor(options: FetchTransportOptions);
    perform<T>(request: TypesenseRequest, requestOptions: FetchTransportRequestOptions): Promise<TypesenseResponse<T>>;
    notifyError(error: unknown, type: TransportErrorType, requestOptions: FetchTransportRequestOptions, response?: TypesenseResponse): Promise<void>;
    private fetchFn;
    private normalizedResponse;
    private responseData;
    private urlWithQueryParameters;
    private serializeQueryParameters;
    private serializedBody;
    private shouldSerializeAsJSON;
    private isBodyInit;
    private isPlainEmptyObject;
    private headersToObject;
    private runRequestHooks;
    private runResponseHooks;
    private runErrorHooks;
    private hookContext;
}
