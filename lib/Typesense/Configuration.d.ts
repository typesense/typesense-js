import logger from 'loglevel';
export interface Node {
    host: string;
    port: number;
    protocol: string;
    path?: string;
    url?: string;
    isHealthy?: boolean;
    index: string | number;
}
export interface ConfigurationOptions {
    apiKey: string;
    nodes: Node[];
    /**
     * @deprecated
     * masterNode is now consolidated to nodes, starting with Typesense Server v0.12'
     */
    masterNode: Node;
    /**
     * @deprecated
     * readReplicaNodes is now consolidated to nodes, starting with Typesense Server v0.12'
     */
    readReplicaNodes: Node[];
    nearestNode?: Node;
    connectionTimeoutSeconds?: number;
    timeoutSeconds?: number;
    healthcheckIntervalSeconds?: number;
    numRetries?: number;
    retryIntervalSeconds?: number;
    sendApiKeyAsQueryParam?: boolean;
    useServerSideSearchCache?: boolean;
    cacheSearchResultsForSeconds?: number;
    logLevel?: logger.LogLevel;
    logger?: any;
}
export default class Configuration {
    readonly nodes: Node[];
    readonly nearestNode: Node;
    readonly connectionTimeoutSeconds: number;
    readonly healthcheckIntervalSeconds: number;
    readonly numRetries: number;
    readonly retryIntervalSeconds: number;
    readonly apiKey: string;
    readonly sendApiKeyAsQueryParam: boolean;
    readonly cacheSearchResultsForSeconds: number;
    readonly useServerSideSearchCache: boolean;
    readonly logger: any;
    readonly logLevel: any;
    constructor(options: ConfigurationOptions);
    validate(): boolean;
    private validateNodes;
    private isNodeMissingAnyParameters;
    private setDefaultPathInNode;
    private setDefaultPortInNode;
    private showDeprecationWarnings;
}
