import ApiCall from "./ApiCall";
import {
  AnalyticsRuleCreateSchema,
  AnalyticsRuleSchema,
} from "./AnalyticsRule";

export interface AnalyticsRulesRetrieveSchema {
  rules: AnalyticsRuleSchema[];
}

const RESOURCEPATH = "/analytics/rules";

export default class AnalyticsRules {
  constructor(private readonly apiCall: ApiCall) {
    this.apiCall = apiCall;
  }

  async create(
    schema: AnalyticsRuleCreateSchema
  ): Promise<AnalyticsRuleCreateSchema> {
    return this.apiCall.post<AnalyticsRuleCreateSchema>(RESOURCEPATH, schema);
  }

  async retrieve(): Promise<AnalyticsRulesRetrieveSchema> {
    return this.apiCall.get<AnalyticsRulesRetrieveSchema>(RESOURCEPATH);
  }

  static get RESOURCEPATH() {
    return RESOURCEPATH;
  }
}
