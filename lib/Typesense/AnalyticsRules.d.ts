import ApiCall from "./ApiCall";
import { AnalyticsRuleCreateSchema, AnalyticsRuleSchema, AnalyticsRuleUpsertSchema } from "./AnalyticsRule";
export interface AnalyticsRulesRetrieveSchema {
    rules: AnalyticsRuleSchema[];
}
export default class AnalyticsRules {
    private readonly apiCall;
    constructor(apiCall: ApiCall);
    /**
     * Create one or more analytics rules. You can send a single rule object or an array of rule objects.
     *
     * @example
     * await client.analytics.rules().create({ name: "products_query_hits", type: "popular_queries", params: {} })
     *
     * @see https://typesense.org/docs/latest/api/analytics-query-suggestions.html
     */
    create(params: AnalyticsRuleCreateSchema | AnalyticsRuleCreateSchema[]): Promise<AnalyticsRuleSchema | (AnalyticsRuleSchema | {
        error?: string;
    })[]>;
    /**
     * Upserts an analytics rule with the given name.
     *
     * @example
     * await client.analytics.rules().upsert("products_query_hits", { type: "popular_queries", params: {} })
     *
     * @see https://typesense.org/docs/latest/api/analytics-query-suggestions.html
     */
    upsert(name: string, params: AnalyticsRuleUpsertSchema): Promise<AnalyticsRuleSchema>;
    /**
     * Retrieve all analytics rules. Use the optional rule_tag filter to narrow down results.
     *
     * @example
     * await client.analytics.rules().retrieve()
     *
     * @see https://typesense.org/docs/latest/api/analytics-query-suggestions.html
     */
    retrieve(ruleTag?: string): Promise<AnalyticsRuleSchema[]>;
    private endpointPath;
    static get RESOURCEPATH(): string;
}
