import ApiCall from "./ApiCall";
import AnalyticsRules from "./AnalyticsRules";

export interface AnalyticsRuleCreateSchema {
  name: string;
  type: string;
  collection: string;
  event_type: string;
  rule_tag?: string;
  params?: {
    destination_collection?: string;
    limit?: number;
    capture_search_requests?: boolean;
    meta_fields?: string[];
    expand_query?: boolean;
    counter_field?: string;
    weight?: number;
  };
}

export interface AnalyticsRuleUpsertSchema {
  name?: string;
  type?: string;
  collection?: string;
  event_type?: string;
  rule_tag?: string;
  params?: {
    destination_collection?: string;
    limit?: number;
    capture_search_requests?: boolean;
    meta_fields?: string[];
    expand_query?: boolean;
    counter_field?: string;
    weight?: number;
  };
}

export interface AnalyticsRuleDeleteSchema {
  name: string;
}

export interface AnalyticsRuleSchema extends AnalyticsRuleCreateSchema {
  name: string;
}

export default class AnalyticsRule {
  constructor(
    private name: string,
    private apiCall: ApiCall,
  ) {}

  async retrieve(): Promise<AnalyticsRuleSchema> {
    return this.apiCall.get<AnalyticsRuleSchema>(this.endpointPath());
  }

  async delete(): Promise<AnalyticsRuleDeleteSchema> {
    return this.apiCall.delete<AnalyticsRuleDeleteSchema>(this.endpointPath());
  }

  private endpointPath(): string {
    return `${AnalyticsRules.RESOURCEPATH}/${encodeURIComponent(this.name)}`;
  }
}
