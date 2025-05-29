import ApiCall from "./ApiCall";
export interface EndpointStats {
    [endpoint: string]: number;
}
export interface StatsResponse {
    delete_latency_ms?: number;
    delete_requests_per_second?: number;
    import_latency_ms?: number;
    import_requests_per_second?: number;
    latency_ms?: EndpointStats;
    overloaded_requests_per_second?: number;
    pending_write_batches?: number;
    requests_per_second?: EndpointStats;
    search_latency_ms?: number;
    search_requests_per_second?: number;
    total_requests_per_second?: number;
    write_latency_ms?: number;
    write_requests_per_second?: number;
}
export default class Metrics {
    private apiCall;
    constructor(apiCall: ApiCall);
    retrieve(): Promise<StatsResponse>;
}
