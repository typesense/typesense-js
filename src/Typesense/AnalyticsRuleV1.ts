import ApiCall from "./ApiCall";
import AnalyticsRulesV1 from "./AnalyticsRulesV1";

export interface AnalyticsRuleCreateSchemaV1 {
  type: "popular_queries" | "nohits_queries" | "counter" | "log";
  params: {
    enable_auto_aggregation?: boolean;
    source: {
      collections: string[];
      events?: {
        type: string;
        weight?: number;
        name: string;
      }[];
    };
    expand_query?: boolean;
    destination?: {
      collection: string;
      counter_field?: string;
    };
    limit?: number;
  };
}

export interface AnalyticsRuleDeleteSchemaV1 {
  name: string;
}

export interface AnalyticsRuleSchemaV1 extends AnalyticsRuleCreateSchemaV1 {
  name: string;
}

export default class AnalyticsRuleV1 {
  constructor(
    private name: string,
    private apiCall: ApiCall,
  ) {}

  async retrieve(): Promise<AnalyticsRuleSchemaV1> {
    return this.apiCall.get<AnalyticsRuleSchemaV1>(this.endpointPath());
  }

  async delete(): Promise<AnalyticsRuleDeleteSchemaV1> {
    return this.apiCall.delete<AnalyticsRuleDeleteSchemaV1>(this.endpointPath());
  }

  private endpointPath(): string {
    return `${AnalyticsRulesV1.RESOURCEPATH}/${encodeURIComponent(this.name)}`;
  }
}


