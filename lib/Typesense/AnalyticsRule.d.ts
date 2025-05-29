import ApiCall from "./ApiCall";
export interface AnalyticsRuleCreateSchema {
    type: "popular_queries" | "nohits_queries" | "counter" | "log";
    params: {
        enable_auto_aggregation?: boolean;
        source: {
            collections: string[];
            events?: Array<{
                type: string;
                weight?: number;
                name: string;
            }>;
        };
        expand_query?: boolean;
        destination?: {
            collection: string;
            counter_field?: string;
        };
        limit?: number;
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
