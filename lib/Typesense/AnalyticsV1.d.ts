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
    rules(): AnalyticsRulesV1;
    rules(id: string): AnalyticsRuleV1;
    events(): AnalyticsEvents;
    static get RESOURCEPATH(): string;
}
