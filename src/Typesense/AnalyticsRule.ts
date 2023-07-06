import ApiCall from "./ApiCall";
import AnalyticsRules from "./AnalyticsRules";

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
  constructor(private name: string, private apiCall: ApiCall) {}

  async delete(): Promise<AnalyticsRuleDeleteSchema> {
    return this.apiCall.delete<AnalyticsRuleDeleteSchema>(this.endpointPath());
  }

  private endpointPath(): string {
    return `${AnalyticsRules.RESOURCEPATH}/${this.name}`;
  }
}
