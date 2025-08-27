import ApiCall from "./ApiCall";
import {
  AnalyticsRuleCreateSchema,
  AnalyticsRuleSchema,
  AnalyticsRuleUpsertSchema,
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
    params:
      | AnalyticsRuleCreateSchema
      | AnalyticsRuleCreateSchema[],
  ): Promise<
    | AnalyticsRuleSchema
    | (
        | AnalyticsRuleSchema
        | {
            error?: string;
          }
      )[]
  > {
    return this.apiCall.post(
      this.endpointPath(),
      params,
      {},
      {},
    );
  }

  async upsert(
    name: string,
    params: AnalyticsRuleUpsertSchema
  ): Promise<AnalyticsRuleSchema> {
    return this.apiCall.put<AnalyticsRuleSchema>(
      this.endpointPath(name),
      params
    );
  }

  async retrieve(ruleTag?: string): Promise<AnalyticsRulesRetrieveSchema> {
    const query: Record<string, string> = {};
    if (ruleTag) {
      query["rule_tag"] = ruleTag;
    }
    return this.apiCall.get<AnalyticsRulesRetrieveSchema>(
      this.endpointPath(),
      query,
    );
  }

  private endpointPath(operation?: string): string {
    return `${AnalyticsRules.RESOURCEPATH}${
      operation === undefined ? "" : "/" + encodeURIComponent(operation)
    }`;
  }

  static get RESOURCEPATH() {
    return RESOURCEPATH;
  }
}
