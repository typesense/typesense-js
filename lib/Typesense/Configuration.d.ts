import { Logger, LogLevelDesc } from "loglevel";
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
    constructor(options: ConfigurationOptions);
    validate(): boolean;
    private validateNodes;
    private isNodeMissingAnyParameters;
    private setDefaultPathInNode;
    private setDefaultPortInNode;
    private showDeprecationWarnings;
    private shuffleArray;
}
