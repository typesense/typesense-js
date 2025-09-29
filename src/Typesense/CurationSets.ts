import ApiCall from "./ApiCall";

export type CurationRuleSchema =
  | { tags: string[]; query?: never; match?: never; filter_by?: never }
  | {
      query: string;
      match: "exact" | "contains";
      tags?: never;
      filter_by?: never;
    }
  | { filter_by: string; tags?: never; query?: never; match?: never };

export interface CurationObjectSchema {
  id: string;
  rule: CurationRuleSchema;
  includes?: {
    id: string;
    position: number;
  }[];
  excludes?: {
    id: string;
  }[];
  filter_by?: string;
  sort_by?: string;
  replace_query?: string;
  remove_matched_tokens?: boolean;
  filter_curated_hits?: boolean;
  stop_processing?: boolean;
  effective_from_ts?: number;
  effective_to_ts?: number;
  metadata?: Record<string, unknown>;
}

export interface CurationSetUpsertSchema {
  items: CurationObjectSchema[];
}

export interface CurationSetSchema extends CurationSetUpsertSchema {
  name?: string;
}

export interface CurationSetsListEntrySchema {
  name: string;
  items: CurationObjectSchema[];
}

export interface CurationSetDeleteResponseSchema {
  name: string;
}

export default class CurationSets {
  constructor(private apiCall: ApiCall) {}
  static readonly RESOURCEPATH = "/curation_sets";

  async retrieve(): Promise<CurationSetsListEntrySchema[]> {
    return this.apiCall.get<CurationSetsListEntrySchema[]>(
      CurationSets.RESOURCEPATH,
    );
  }
}


