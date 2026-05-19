import ApiCall from "./ApiCall";
import { AnalyticsRuleCreateSchemaV1, AnalyticsRuleSchemaV1 } from "./AnalyticsRuleV1";
export interface AnalyticsRulesRetrieveSchemaV1 {
    rules: AnalyticsRuleSchemaV1[];
}
export default class AnalyticsRulesV1 {
    private readonly apiCall;
    constructor(apiCall: ApiCall);
    /**
     * Upsert a legacy v1 analytics rule by name.
     *
     * @example
     * await client.analyticsV1.rules().upsert("products_query_hits", { type: "popular_queries", params: {} })
     *
     * @see https://typesense.org/docs/29.0/api/analytics-query-suggestions.html
     */
    upsert(name: string, params: AnalyticsRuleCreateSchemaV1): Promise<AnalyticsRuleSchemaV1>;
    /**
     * Retrieve all legacy v1 analytics rules.
     *
     * @example
     * await client.analyticsV1.rules().retrieve()
     *
     * @see https://typesense.org/docs/29.0/api/analytics-query-suggestions.html
     */
    retrieve(): Promise<AnalyticsRulesRetrieveSchemaV1>;
    private endpointPath;
    static get RESOURCEPATH(): string;
}
