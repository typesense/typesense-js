/// <reference types="node" />
/// <reference types="node" />
import { Logger, LogLevelDesc } from 'loglevel';
import type { Agent as HTTPAgent } from 'http';
import type { Agent as HTTPSAgent } from 'https';
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
    constructor(options: ConfigurationOptions);
    validate(): boolean;
    private validateNodes;
    private isNodeMissingAnyParameters;
    private setDefaultPathInNode;
    private setDefaultPortInNode;
    private showDeprecationWarnings;
    private shuffleArray;
}
