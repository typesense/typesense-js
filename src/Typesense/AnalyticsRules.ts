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

  /**
   * Create one or more analytics rules. You can send a single rule object or an array of rule objects.
   *
   * @example
   * await client.analytics.rules().create({ name: "products_query_hits", type: "popular_queries", params: {} })
   *
   * @see https://typesense.org/docs/latest/api/analytics-query-suggestions.html
   */
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

  /**
   * Upserts an analytics rule with the given name.
   *
   * @example
   * await client.analytics.rules().upsert("products_query_hits", { type: "popular_queries", params: {} })
   *
   * @see https://typesense.org/docs/latest/api/analytics-query-suggestions.html
   */
  async upsert(
    name: string,
    params: AnalyticsRuleUpsertSchema
  ): Promise<AnalyticsRuleSchema> {
    return this.apiCall.put<AnalyticsRuleSchema>(
      this.endpointPath(name),
      params
    );
  }

  /**
   * Retrieve all analytics rules. Use the optional rule_tag filter to narrow down results.
   *
   * @example
   * await client.analytics.rules().retrieve()
   *
   * @see https://typesense.org/docs/latest/api/analytics-query-suggestions.html
   */
  async retrieve(ruleTag?: string): Promise<AnalyticsRuleSchema[]> {
    const query: Record<string, string> = {};
    if (ruleTag) {
      query["rule_tag"] = ruleTag;
    }
    return this.apiCall.get<AnalyticsRuleSchema[]>(this.endpointPath(), query);
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
