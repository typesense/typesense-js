import { Logger, LogLevelDesc } from "loglevel";
import { DocumentSchema, SearchResponse } from "./Documents";
import type { ErrorHook, FetchFunction, ParamsSerializer, RequestHook, ResponseHook } from "./Transport";
export interface NodeConfiguration {
    host: string;
    port: number;
    protocol: string;
    path?: string;
    url?: string;
}
export interface NodeConfigurationWithHostname {
    host: string;
    port: number;
    protocol: string;
    path?: string;
}
export interface NodeConfigurationWithUrl {
    url: string;
}
export interface ConfigurationOptions {
    apiKey: string;
    nodes: NodeConfiguration[] | NodeConfigurationWithHostname[] | NodeConfigurationWithUrl[];
    randomizeNodes?: boolean;
    /**
     * @deprecated
     * masterNode is now consolidated to nodes, starting with Typesense Server v0.12'
     */
    masterNode?: NodeConfiguration | NodeConfigurationWithHostname | NodeConfigurationWithUrl;
    /**
     * @deprecated
     * readReplicaNodes is now consolidated to nodes, starting with Typesense Server v0.12'
     */
    readReplicaNodes?: NodeConfiguration[] | NodeConfigurationWithHostname[] | NodeConfigurationWithUrl[];
    nearestNode?: NodeConfiguration | NodeConfigurationWithHostname | NodeConfigurationWithUrl;
    connectionTimeoutSeconds?: number;
    timeoutSeconds?: number;
    healthcheckIntervalSeconds?: number;
    numRetries?: number;
    retryIntervalSeconds?: number;
    sendApiKeyAsQueryParam?: boolean | undefined;
    useServerSideSearchCache?: boolean;
    cacheSearchResultsForSeconds?: number;
    additionalHeaders?: Record<string, string>;
    logLevel?: LogLevelDesc;
    logger?: Logger;
    /**
     * Set a custom fetch implementation.
     * Useful for tests, edge runtimes, and fetch wrappers.
     */
    fetch?: FetchFunction;
    /**
     * Set a custom Node fetch dispatcher using Undici semantics.
     * For example, migrate from `new http.Agent({ keepAlive: true })` to
     * `new undici.Agent({ keepAliveTimeout: ... })` and pass it as dispatcher.
     */
    dispatcher?: unknown;
    /**
     * Set a custom params serializer.
     */
    paramsSerializer?: ParamsSerializer;
    requestHooks?: RequestHook[];
    responseHooks?: ResponseHook[];
    errorHooks?: ErrorHook[];
}
/**
 * Configuration options for streaming responses
 */
export interface BaseStreamConfig {
    /**
     * Callback function that will be called for each chunk of data received
     * during streaming
     */
    onChunk?: (data: {
        conversation_id: string;
        message: string;
    }) => void;
    /**
     * Callback function that will be called if there is an error during streaming
     */
    onError?: (error: Error) => void;
}
/**
 * Stream configuration for standard search responses
 * For specialized responses like MultiSearch, extend BaseStreamConfig with the appropriate onComplete signature
 */
export interface StreamConfig<T extends DocumentSchema> extends BaseStreamConfig {
    /**
     * Callback function that will be called when the streaming is complete
     */
    onComplete?: (data: SearchResponse<T>) => void;
}
export default class Configuration {
    readonly nodes: NodeConfiguration[] | NodeConfigurationWithHostname[] | NodeConfigurationWithUrl[];
    readonly nearestNode?: NodeConfiguration | NodeConfigurationWithHostname | NodeConfigurationWithUrl;
    readonly connectionTimeoutSeconds: number;
    readonly healthcheckIntervalSeconds: number;
    readonly numRetries: number;
    readonly retryIntervalSeconds: number;
    readonly apiKey: string;
    readonly sendApiKeyAsQueryParam?: boolean;
    readonly cacheSearchResultsForSeconds: number;
    readonly useServerSideSearchCache: boolean;
    readonly logger: Logger;
    readonly logLevel: LogLevelDesc;
    readonly additionalHeaders?: Record<string, string>;
    readonly fetch?: FetchFunction;
    readonly dispatcher?: unknown;
    readonly paramsSerializer?: ParamsSerializer;
    readonly requestHooks?: RequestHook[];
    readonly responseHooks?: ResponseHook[];
    readonly errorHooks?: ErrorHook[];
    constructor(options: ConfigurationOptions);
    validate(): boolean;
    private validateNodes;
    private isNodeMissingAnyParameters;
    private setDefaultPathInNode;
    private setDefaultPortInNode;
    private showDeprecationWarnings;
    private shuffleArray;
}
