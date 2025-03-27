import type { AxiosRequestConfig, AxiosResponse, Method } from "axios";
import Configuration, { NodeConfiguration } from "./Configuration";
import TypesenseError from "./Errors/TypesenseError";
interface Node extends NodeConfiguration {
    isHealthy: boolean;
    index: string | number;
}
export default class ApiCall {
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
    get<T>(endpoint: string, queryParameters?: any, { abortSignal, responseType, }?: {
        abortSignal?: any;
        responseType?: AxiosRequestConfig["responseType"] | undefined;
    }): Promise<T>;
    delete<T>(endpoint: string, queryParameters?: any): Promise<T>;
    post<T>(endpoint: string, bodyParameters?: any, queryParameters?: any, additionalHeaders?: any): Promise<T>;
    put<T>(endpoint: string, bodyParameters?: any, queryParameters?: any): Promise<T>;
    patch<T>(endpoint: string, bodyParameters?: any, queryParameters?: any): Promise<T>;
    private getAdapter;
    performRequest<T>(requestType: Method, endpoint: string, { queryParameters, bodyParameters, additionalHeaders, abortSignal, responseType, skipConnectionTimeout, enableKeepAlive, }: {
        queryParameters?: any;
        bodyParameters?: any;
        additionalHeaders?: any;
        abortSignal?: any;
        responseType?: AxiosRequestConfig["responseType"] | undefined;
        skipConnectionTimeout?: boolean;
        enableKeepAlive?: boolean | undefined;
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
    private combineMessageChunks;
    private isCompleteSearchResponse;
    private attemptChunksMerge;
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
