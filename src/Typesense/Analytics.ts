import ApiCall from "./ApiCall";
import AnalyticsRules from "./AnalyticsRules";
import AnalyticsRule from "./AnalyticsRule";
import AnalyticsEvents from "./AnalyticsEvents";

const RESOURCEPATH = "/analytics";

export default class Analytics {
  private readonly _analyticsRules: AnalyticsRules;
  private readonly individualAnalyticsRules: Record<string, AnalyticsRule> = {};
  private readonly _analyticsEvents: AnalyticsEvents;

  constructor(private readonly apiCall: ApiCall) {
    this.apiCall = apiCall;
    this._analyticsRules = new AnalyticsRules(this.apiCall);
    this._analyticsEvents = new AnalyticsEvents(this.apiCall);
  }

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
  rules(id?: string): AnalyticsRules | AnalyticsRule {
    if (id === undefined) {
      return this._analyticsRules;
    } else {
      if (this.individualAnalyticsRules[id] === undefined) {
        this.individualAnalyticsRules[id] = new AnalyticsRule(id, this.apiCall);
      }
      return this.individualAnalyticsRules[id];
    }
  }

  /**
   * Access the analytics events resource to send analytics events.
   *
   * @example
   * await client.analytics.events().create({ type: "click", name: "products_click", data: {} })
   *
   * @see https://typesense.org/docs/latest/api/analytics-query-suggestions.html
   */
  events(): AnalyticsEvents {
    return this._analyticsEvents;
  }

  static get RESOURCEPATH() {
    return RESOURCEPATH;
  }
}
