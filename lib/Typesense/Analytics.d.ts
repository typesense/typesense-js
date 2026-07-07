import ApiCall from "./ApiCall";
import AnalyticsRules from "./AnalyticsRules";
import AnalyticsRule from "./AnalyticsRule";
import AnalyticsEvents from "./AnalyticsEvents";
export default class Analytics {
    private readonly apiCall;
    private readonly _analyticsRules;
    private readonly individualAnalyticsRules;
    private readonly _analyticsEvents;
    constructor(apiCall: ApiCall);
    /**
     * Access the analytics rules resource. Call without arguments to list or create rules, or pass an ID to access a single rule.
     *
     * @example
     * await client.analytics.rules().retrieve()
     * @example
     * await client.analytics.rules("rule-1").retrieve()
     *
     * @see https://typesense.org/docs/latest/api/analytics-query-suggestions.html
     */
    rules(): AnalyticsRules;
    /**
     * Access an individual analytics rule by ID.
     *
     * @example
     * await client.analytics.rules("rule-1").retrieve()
     *
     * @see https://typesense.org/docs/latest/api/analytics-query-suggestions.html
     */
    rules(id: string): AnalyticsRule;
    /**
     * Access the analytics events resource to send analytics events.
     *
     * @example
     * await client.analytics.events().create({ type: "click", name: "products_click", data: {} })
     *
     * @see https://typesense.org/docs/latest/api/analytics-query-suggestions.html
     */
    events(): AnalyticsEvents;
    static get RESOURCEPATH(): string;
}
