import ApiCall from "./ApiCall";
export interface HealthResponse {
    ok: boolean;
}
export default class Health {
    private apiCall;
    constructor(apiCall: ApiCall);
    /**
     * Checks if Typesense server is ready to accept requests.
     *
     * @example
     * await client.health.retrieve()
     *
     * @see https://typesense.org/docs/latest/api/cluster-operations.html#health
     */
    retrieve(): Promise<HealthResponse>;
}
