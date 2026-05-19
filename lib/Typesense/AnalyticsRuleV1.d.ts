import ApiCall from "./ApiCall";
export interface AnalyticsRuleCreateSchemaV1 {
    type: "popular_queries" | "nohits_queries" | "counter" | "log";
    params: {
        enable_auto_aggregation?: boolean;
        source: {
            collections: string[];
            events?: {
                type: string;
                weight?: number;
                name: string;
            }[];
        };
        expand_query?: boolean;
        destination?: {
            collection: string;
            counter_field?: string;
        };
        limit?: number;
    };
}
export interface AnalyticsRuleDeleteSchemaV1 {
    name: string;
}
export interface AnalyticsRuleSchemaV1 extends AnalyticsRuleCreateSchemaV1 {
    name: string;
}
export default class AnalyticsRuleV1 {
    private name;
    private apiCall;
    constructor(name: string, apiCall: ApiCall);
    /**
     * Retrieve a legacy v1 analytics rule by name.
     *
     * @example
     * await client.analyticsV1.rules("rule-1").retrieve()
     *
     * @see https://typesense.org/docs/29.0/api/analytics-query-suggestions.html
     */
    retrieve(): Promise<AnalyticsRuleSchemaV1>;
    /**
     * Delete a legacy v1 analytics rule by name.
     *
     * @example
     * await client.analyticsV1.rules("rule-1").delete()
     *
     * @see https://typesense.org/docs/29.0/api/analytics-query-suggestions.html
     */
    delete(): Promise<AnalyticsRuleDeleteSchemaV1>;
    private endpointPath;
}
