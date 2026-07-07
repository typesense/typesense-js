import ApiCall from "./ApiCall";
import AnalyticsRulesV1 from "./AnalyticsRulesV1";
import AnalyticsRuleV1 from "./AnalyticsRuleV1";
import AnalyticsEvents from "./AnalyticsEvents";
/**
 * @deprecated Deprecated starting with Typesense Server v30. Please migrate to `client.analytics` (new Analytics APIs).
 */
export default class AnalyticsV1 {
    private readonly apiCall;
    private static hasWarnedDeprecation;
    private readonly _analyticsRules;
    private readonly individualAnalyticsRules;
    private readonly _analyticsEvents;
    constructor(apiCall: ApiCall);
    /**
     * Access the legacy v1 analytics rules resource. Call without arguments to list or upsert rules, or pass an ID to access a single rule.
     *
     * @example
     * await client.analyticsV1.rules().retrieve()
     * @example
     * await client.analyticsV1.rules("rule-1").retrieve()
     *
     * @see https://typesense.org/docs/29.0/api/analytics-query-suggestions.html
     */
    rules(): AnalyticsRulesV1;
    /**
     * Access an individual legacy v1 analytics rule by ID.
     *
     * @example
     * await client.analyticsV1.rules("rule-1").retrieve()
     *
     * @see https://typesense.org/docs/29.0/api/analytics-query-suggestions.html
     */
    rules(id: string): AnalyticsRuleV1;
    /**
     * Access the legacy v1 analytics events resource to send analytics events.
     *
     * @example
     * await client.analyticsV1.events().create({ type: "click", name: "products_click", data: {} })
     *
     * @see https://typesense.org/docs/29.0/api/analytics-query-suggestions.html
     */
    events(): AnalyticsEvents;
    static get RESOURCEPATH(): string;
}
