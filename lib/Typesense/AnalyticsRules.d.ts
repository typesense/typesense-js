import ApiCall from "./ApiCall";
import { AnalyticsRuleCreateSchema, AnalyticsRuleSchema } from "./AnalyticsRule";
export interface AnalyticsRulesRetrieveSchema {
    rules: AnalyticsRuleSchema[];
}
export default class AnalyticsRules {
    private readonly apiCall;
    constructor(apiCall: ApiCall);
    upsert(name: string, params: AnalyticsRuleCreateSchema): Promise<AnalyticsRuleCreateSchema>;
    retrieve(): Promise<AnalyticsRulesRetrieveSchema>;
    private endpointPath;
    static get RESOURCEPATH(): string;
}
