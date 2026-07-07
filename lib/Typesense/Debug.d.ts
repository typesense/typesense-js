import ApiCall from "./ApiCall";
export interface DebugResponseSchema {
    state: number;
    version: string;
}
export default class Debug {
    private apiCall;
    constructor(apiCall: ApiCall);
    /**
     * Retrieve server version and state information.
     *
     * @example
     * await client.debug.retrieve()
     *
     * @see https://typesense.org/docs/latest/api/cluster-operations.html#debug
     */
    retrieve(): Promise<DebugResponseSchema>;
}
