import ApiCall from "./ApiCall";
export interface AnalyticsRuleCreateSchema {
    name: string;
    type: string;
    collection: string;
    event_type: string;
    rule_tag?: string;
    params?: {
        destination_collection?: string;
        limit?: number;
        capture_search_requests?: boolean;
        meta_fields?: string[];
        expand_query?: boolean;
        counter_field?: string;
        weight?: number;
    };
}
export interface AnalyticsRuleUpsertSchema {
    name?: string;
    type?: string;
    collection?: string;
    event_type?: string;
    rule_tag?: string;
    params?: {
        destination_collection?: string;
        limit?: number;
        capture_search_requests?: boolean;
        meta_fields?: string[];
        expand_query?: boolean;
        counter_field?: string;
        weight?: number;
    };
}
export interface AnalyticsRuleDeleteSchema {
    name: string;
}
export interface AnalyticsRuleSchema extends AnalyticsRuleCreateSchema {
    name: string;
}
export default class AnalyticsRule {
    private name;
    private apiCall;
    constructor(name: string, apiCall: ApiCall);
    retrieve(): Promise<AnalyticsRuleSchema>;
    delete(): Promise<AnalyticsRuleDeleteSchema>;
    private endpointPath;
}
