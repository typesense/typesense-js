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

  rules(): AnalyticsRulesV1;
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

  events(): AnalyticsEvents {
    return this._analyticsEvents;
  }

  static get RESOURCEPATH() {
    return RESOURCEPATH;
  }
}


