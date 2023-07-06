import ApiCall from "./ApiCall";
export interface AnalyticsRuleCreateSchema {
    name: string;
    type: "popular_queries";
    params: {
        source: {
            collections: string[];
        };
        destination: {
            collection: string;
        };
        limit: number;
    };
}
export interface AnalyticsRuleDeleteSchema {
    name: string;
}
export interface AnalyticsRuleSchema extends AnalyticsRuleCreateSchema {
    name: string;
}
export default class AnalyticsRule {
    private name;
    private apiCall;
    constructor(name: string, apiCall: ApiCall);
    delete(): Promise<AnalyticsRuleDeleteSchema>;
    private endpointPath;
}
