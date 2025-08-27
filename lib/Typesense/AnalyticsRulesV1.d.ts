import ApiCall from "./ApiCall";
import { AnalyticsRuleCreateSchemaV1, AnalyticsRuleSchemaV1 } from "./AnalyticsRuleV1";
export interface AnalyticsRulesRetrieveSchemaV1 {
    rules: AnalyticsRuleSchemaV1[];
}
export default class AnalyticsRulesV1 {
    private readonly apiCall;
    constructor(apiCall: ApiCall);
    upsert(name: string, params: AnalyticsRuleCreateSchemaV1): Promise<AnalyticsRuleSchemaV1>;
    retrieve(): Promise<AnalyticsRulesRetrieveSchemaV1>;
    private endpointPath;
    static get RESOURCEPATH(): string;
}
