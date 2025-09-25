import ApiCall from "./ApiCall";
export interface CurationIncludeSchema {
    id: string;
    position: number;
}
export interface CurationExcludeSchema {
    id: string;
}
export interface CurationRuleSchema {
    query?: string;
    match?: "exact" | "contains";
    filter_by?: string;
    tags?: string[];
}
export interface CurationObjectSchema {
    id: string;
    rule?: CurationRuleSchema;
    includes?: CurationIncludeSchema[];
    excludes?: CurationExcludeSchema[];
    filter_by?: string;
    sort_by?: string;
    replace_query?: string;
    remove_matched_tokens?: boolean;
    filter_curated_hits?: boolean;
    stop_processing?: boolean;
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
export type CurationSetsListResponseSchema = CurationSetsListEntrySchema[];
export interface CurationSetDeleteResponseSchema {
    name: string;
}
export default class CurationSets {
    private apiCall;
    constructor(apiCall: ApiCall);
    static readonly RESOURCEPATH = "/curation_sets";
    retrieve(): Promise<CurationSetsListResponseSchema>;
}
