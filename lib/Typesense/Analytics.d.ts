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
    rules(): AnalyticsRules;
    rules(id: string): AnalyticsRule;
    events(): AnalyticsEvents;
    static get RESOURCEPATH(): string;
}
