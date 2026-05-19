import ApiCall from "./ApiCall";
import { OverrideSchema } from "./Override";
export interface OverrideRuleQuerySchema {
    query?: string;
    match?: "exact" | "contains";
}
export interface OverrideRuleFilterSchema {
    filter_by?: string;
}
export interface OverrideRuleTagsSchema {
    tags?: string[];
}
export interface OverrideCreateSchema {
    rule: OverrideRuleQuerySchema & OverrideRuleFilterSchema & OverrideRuleTagsSchema;
    filter_by?: string;
    sort_by?: string;
    remove_matched_tokens?: boolean;
    replace_query?: string;
    includes?: Array<{
        id: string;
        position: number;
    }>;
    excludes?: Array<{
        id: string;
    }>;
    filter_curated_hits?: boolean;
    effective_from_ts?: number;
    effective_to_ts?: number;
    stop_processing?: boolean;
    metadata?: object;
}
export interface OverridesRetrieveSchema {
    overrides: OverrideSchema[];
}
export default class Overrides {
    private collectionName;
    private apiCall;
    constructor(collectionName: string, apiCall: ApiCall);
    /**
     * Create or update an override (curation rule) on this collection.
     *
     * @example
     * await client.collections("products").overrides().upsert("promote-hat", { rule: { query: "hat", match: "exact" }, includes: [] })
     *
     * @see https://typesense.org/docs/latest/api/curation.html
     */
    upsert(overrideId: string, params: OverrideCreateSchema): Promise<OverrideSchema>;
    /**
     * Retrieve all overrides (curation rules) on this collection.
     *
     * @example
     * await client.collections("products").overrides().retrieve()
     *
     * @see https://typesense.org/docs/latest/api/curation.html
     */
    retrieve(): Promise<OverridesRetrieveSchema>;
    private endpointPath;
    static get RESOURCEPATH(): string;
}
