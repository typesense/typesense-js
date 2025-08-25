import ApiCall from "./ApiCall";
import {
  AnalyticsRuleCreateSchemaV1,
  AnalyticsRuleSchemaV1,
} from "./AnalyticsRuleV1";

export interface AnalyticsRulesRetrieveSchemaV1 {
  rules: AnalyticsRuleSchemaV1[];
}

const RESOURCEPATH = "/analytics/rules";

export default class AnalyticsRulesV1 {
  constructor(private readonly apiCall: ApiCall) {
    this.apiCall = apiCall;
  }

  async upsert(
    name: string,
    params: AnalyticsRuleCreateSchemaV1
  ): Promise<AnalyticsRuleSchemaV1> {
    return this.apiCall.put<AnalyticsRuleSchemaV1>(
      this.endpointPath(name),
      params
    );
  }

  async retrieve(): Promise<AnalyticsRulesRetrieveSchemaV1> {
    return this.apiCall.get<AnalyticsRulesRetrieveSchemaV1>(this.endpointPath());
  }

  private endpointPath(operation?: string): string {
    return `${AnalyticsRulesV1.RESOURCEPATH}${
      operation === undefined ? "" : "/" + encodeURIComponent(operation)
    }`;
  }

  static get RESOURCEPATH() {
    return RESOURCEPATH;
  }
}


