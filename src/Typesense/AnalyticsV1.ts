import ApiCall from "./ApiCall";
import AnalyticsRulesV1 from "./AnalyticsRulesV1";
import AnalyticsRuleV1 from "./AnalyticsRuleV1";
import AnalyticsEvents from "./AnalyticsEvents";

const RESOURCEPATH = "/analytics";

/**
 * @deprecated Deprecated starting with Typesense Server v30. Please migrate to `client.analytics` (new Analytics APIs).
 */
export default class AnalyticsV1 {
  private static hasWarnedDeprecation = false;
  private readonly _analyticsRules: AnalyticsRulesV1;
  private readonly individualAnalyticsRules: Record<string, AnalyticsRuleV1> = {};
  private readonly _analyticsEvents: AnalyticsEvents;

  constructor(private readonly apiCall: ApiCall) {
    this.apiCall = apiCall;
    this._analyticsRules = new AnalyticsRulesV1(this.apiCall);
    this._analyticsEvents = new AnalyticsEvents(this.apiCall);
  }

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
  rules(id?: string): AnalyticsRulesV1 | AnalyticsRuleV1 {
    if (!AnalyticsV1.hasWarnedDeprecation) {
      // eslint-disable-next-line no-console
      console.warn(
        "[typesense] 'analyticsV1' is deprecated starting with Typesense Server v30 and will be removed in a future release. Please use 'analytics' instead.",
      );
      AnalyticsV1.hasWarnedDeprecation = true;
    }
    if (id === undefined) {
      return this._analyticsRules;
    } else {
      if (this.individualAnalyticsRules[id] === undefined) {
        this.individualAnalyticsRules[id] = new AnalyticsRuleV1(id, this.apiCall);
      }
      return this.individualAnalyticsRules[id];
    }
  }

  /**
   * Access the legacy v1 analytics events resource to send analytics events.
   *
   * @example
   * await client.analyticsV1.events().create({ type: "click", name: "products_click", data: {} })
   *
   * @see https://typesense.org/docs/29.0/api/analytics-query-suggestions.html
   */
  events(): AnalyticsEvents {
    return this._analyticsEvents;
  }

  static get RESOURCEPATH() {
    return RESOURCEPATH;
  }
}


