/// <reference types="node" />
/// <reference types="node" />
import { Logger, LogLevelDesc } from "loglevel";
import type { Agent as HTTPAgent } from "http";
import type { Agent as HTTPSAgent } from "https";
import type { AxiosRequestConfig } from "axios";
import { DocumentSchema, SearchResponse } from "./Documents";
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
     * Set a custom HTTP Agent
     *
     * This is helpful for eg, to enable keepAlive which helps prevents ECONNRESET socket hang up errors
     *    Usage:
     *      const { Agent: HTTPAgent } = require("http");
     *      ...
     *      httpAgent: new HTTPAgent({ keepAlive: true }),
     * @type {HTTPAgent}
     */
    httpAgent?: HTTPAgent;
    /**
     * Set a custom HTTPS Agent
     *
     * This is helpful for eg, to enable keepAlive which helps prevents ECONNRESET socket hang up errors
     *    Usage:
     *      const { Agent: HTTPSAgent } = require("https");
     *      ...
     *      httpsAgent: new HTTPSAgent({ keepAlive: true }),
     * @type {HTTPSAgent}
     */
    httpsAgent?: HTTPSAgent;
    /**
     * Set a custom paramsSerializer
     *
     * See axios documentation for more information on how to use this parameter: https://axios-http.com/docs/req_config
     *  This is helpful for handling React Native issues like this: https://github.com/axios/axios/issues/6102#issuecomment-2085301397
     * @type {any}
     */
    paramsSerializer?: any;
    /**
     * Set a custom axios adapter
     *
     * Useful for customizing the underlying HTTP client library used by Typesense.
     *
     * For example, you can use this to use a custom HTTP client library like `fetch`, in order for the library to work on the edge.
     * Related GiHub issue: https://github.com/typesense/typesense-js/issues/161
     *
     * See axios documentation for more information on how to use this parameter: https://axios-http.com/docs/req_config
     */
    axiosAdapter?: AxiosRequestConfig["adapter"];
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
    readonly httpAgent?: HTTPAgent;
    readonly httpsAgent?: HTTPSAgent;
    readonly paramsSerializer?: any;
    readonly axiosAdapter?: AxiosRequestConfig["adapter"];
    constructor(options: ConfigurationOptions);
    validate(): boolean;
    private validateNodes;
    private isNodeMissingAnyParameters;
    private setDefaultPathInNode;
    private setDefaultPortInNode;
    private showDeprecationWarnings;
    private shuffleArray;
}
