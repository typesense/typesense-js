import ApiCall from "./ApiCall";
import { AnalyticsRuleCreateSchema, AnalyticsRuleSchema } from "./AnalyticsRule";
export interface AnalyticsRulesRetrieveSchema {
    rules: AnalyticsRuleSchema[];
}
export default class AnalyticsRules {
    private readonly apiCall;
    constructor(apiCall: ApiCall);
    create(schema: AnalyticsRuleCreateSchema): Promise<AnalyticsRuleCreateSchema>;
    retrieve(): Promise<AnalyticsRulesRetrieveSchema>;
    static get RESOURCEPATH(): string;
}
