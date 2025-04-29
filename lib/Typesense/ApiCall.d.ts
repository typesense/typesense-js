import type { AxiosRequestConfig, AxiosResponse, Method } from "axios";
import Configuration from "./Configuration";
import type { NodeConfiguration, StreamConfig } from "./Configuration";
import TypesenseError from "./Errors/TypesenseError";
import type { DocumentSchema } from "./Documents";
interface Node extends NodeConfiguration {
    isHealthy: boolean;
    index: string | number;
}
export interface HttpClient {
    get<T>(endpoint: string, queryParameters: Record<string, unknown>, { abortSignal, responseType, streamConfig, isStreamingRequest, }: {
        abortSignal?: AbortSignal | null;
        responseType?: AxiosRequestConfig["responseType"] | undefined;
        streamConfig?: StreamConfig<T extends DocumentSchema ? T : DocumentSchema> | undefined;
        isStreamingRequest: boolean | undefined;
    }): Promise<T>;
    delete<T>(endpoint: string, queryParameters: Record<string, unknown>): Promise<T>;
    post<T>(endpoint: string, bodyParameters: unknown, queryParameters: Record<string, unknown>, additionalHeaders: Record<string, string>, { abortSignal, responseType, streamConfig, isStreamingRequest, }: {
        abortSignal?: AbortSignal | null;
        responseType?: AxiosRequestConfig["responseType"] | undefined;
        streamConfig?: StreamConfig<T extends DocumentSchema ? T : DocumentSchema> | undefined;
        isStreamingRequest: boolean | undefined;
    }): Promise<T>;
    put<T>(endpoint: string, bodyParameters: unknown, queryParameters: Record<string, unknown>): Promise<T>;
    patch<T>(endpoint: string, bodyParameters: unknown, queryParameters: Record<string, unknown>): Promise<T>;
}
export default class ApiCall implements HttpClient {
    private configuration;
    private readonly apiKey;
    private readonly nodes;
    private readonly nearestNode;
    private readonly connectionTimeoutSeconds;
    private readonly healthcheckIntervalSeconds;
    private readonly retryIntervalSeconds;
    private readonly sendApiKeyAsQueryParam?;
    private readonly numRetriesPerRequest;
    private readonly additionalUserHeaders?;
    private readonly logger;
    private currentNodeIndex;
    constructor(configuration: Configuration);
    get<T>(endpoint: string, queryParameters?: any, { abortSignal, responseType, streamConfig, isStreamingRequest, }?: {
        abortSignal?: any;
        responseType?: AxiosRequestConfig["responseType"] | undefined;
        streamConfig?: StreamConfig<T extends DocumentSchema ? T : DocumentSchema> | undefined;
        isStreamingRequest?: boolean | undefined;
    }): Promise<T>;
    delete<T>(endpoint: string, queryParameters?: any): Promise<T>;
    post<T>(endpoint: string, bodyParameters?: any, queryParameters?: any, additionalHeaders?: any, { abortSignal, responseType, streamConfig, isStreamingRequest, }?: {
        abortSignal?: AbortSignal | null;
        responseType?: AxiosRequestConfig["responseType"] | undefined;
        streamConfig?: StreamConfig<T extends DocumentSchema ? T : DocumentSchema> | undefined;
        isStreamingRequest?: boolean | undefined;
    }): Promise<T>;
    put<T>(endpoint: string, bodyParameters?: any, queryParameters?: any): Promise<T>;
    patch<T>(endpoint: string, bodyParameters?: any, queryParameters?: any): Promise<T>;
    private getAdapter;
    performRequest<T>(requestType: Method, endpoint: string, { queryParameters, bodyParameters, additionalHeaders, abortSignal, responseType, skipConnectionTimeout, enableKeepAlive, streamConfig, isStreamingRequest, }: {
        queryParameters?: any;
        bodyParameters?: any;
        additionalHeaders?: any;
        abortSignal?: any;
        responseType?: AxiosRequestConfig["responseType"] | undefined;
        skipConnectionTimeout?: boolean;
        enableKeepAlive?: boolean | undefined;
        streamConfig?: StreamConfig<T extends DocumentSchema ? T : DocumentSchema> | undefined;
        isStreamingRequest?: boolean | undefined;
    }): Promise<T>;
    private processStreamingLine;
    private processDataLine;
    private handleStreamingResponse;
    private handleNodeStreaming;
    private handleBrowserStreaming;
    private handleBrowserReadableStream;
    private handleBrowserStringResponse;
    private processStreamLines;
    private finalizeStreamResult;
    /**
     * Combines multiple streaming chunks into a single coherent result
     * This is critical for ensuring we return the complete data rather than just the last chunk
     */
    private combineStreamingChunks;
    private getMessageChunks;
    private isChunkMessage;
    private combineMessageChunks;
    private isCompleteSearchResponse;
    getNextNode(requestNumber?: number): Node;
    nodeDueForHealthcheck(node: any, requestNumber?: number): boolean;
    initializeMetadataForNodes(): void;
    setNodeHealthcheck(node: any, isHealthy: any): void;
    uriFor(endpoint: string, node: any): string;
    defaultHeaders(): any;
    timer(seconds: any): Promise<void>;
    customErrorForResponse(response: AxiosResponse, messageFromServer: string, httpBody?: string): TypesenseError;
    private invokeOnChunkCallback;
    private invokeOnCompleteCallback;
    private invokeOnErrorCallback;
}
export {};
