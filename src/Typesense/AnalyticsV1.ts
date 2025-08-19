import ApiCall from "./ApiCall";
import AnalyticsRulesV1 from "./AnalyticsRulesV1";
import AnalyticsRuleV1 from "./AnalyticsRuleV1";
import AnalyticsEvents from "./AnalyticsEvents";

const RESOURCEPATH = "/analytics";

export default class AnalyticsV1 {
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


