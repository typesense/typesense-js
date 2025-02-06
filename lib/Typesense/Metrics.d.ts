import ApiCall from "./ApiCall";
export interface MetricsResponse {
    [key: `system_cpu${number}_active_percentage`]: string;
    system_cpu_active_percentage: string;
    system_disk_total_bytes: string;
    system_disk_used_bytes: string;
    system_memory_total_bytes: string;
    system_memory_total_swap_bytes?: string;
    system_memory_used_bytes: string;
    system_memory_used_swap_bytes?: string;
    system_network_received_bytes: string;
    system_network_sent_bytes: string;
    typesense_memory_active_bytes: string;
    typesense_memory_allocated_bytes: string;
    typesense_memory_fragmentation_ratio: string;
    typesense_memory_mapped_bytes: string;
    typesense_memory_metadata_bytes: string;
    typesense_memory_resident_bytes: string;
    typesense_memory_retained_bytes: string;
}
export default class Metrics {
    private apiCall;
    constructor(apiCall: ApiCall);
    retrieve(): Promise<MetricsResponse>;
}
