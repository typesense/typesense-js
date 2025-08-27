import ApiCall from "./ApiCall";
import { AnalyticsRuleCreateSchema, AnalyticsRuleSchema, AnalyticsRuleUpsertSchema } from "./AnalyticsRule";
export interface AnalyticsRulesRetrieveSchema {
    rules: AnalyticsRuleSchema[];
}
export default class AnalyticsRules {
    private readonly apiCall;
    constructor(apiCall: ApiCall);
    create(params: AnalyticsRuleCreateSchema | AnalyticsRuleCreateSchema[]): Promise<AnalyticsRuleSchema | (AnalyticsRuleSchema | {
        error?: string;
    })[]>;
    upsert(name: string, params: AnalyticsRuleUpsertSchema): Promise<AnalyticsRuleSchema>;
    retrieve(ruleTag?: string): Promise<AnalyticsRulesRetrieveSchema>;
    private endpointPath;
    static get RESOURCEPATH(): string;
}
