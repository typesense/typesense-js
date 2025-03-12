import { DocumentSchema, SearchParamsWithPreset, SearchOptions, SearchResponse, DocumentWriteParameters, DeleteQuery, DeleteResponse, ImportResponse, DocumentsExportParameters } from "./Documents";
export type DropTokensMode = "right_to_left" | "left_to_right" | "both_sides:3";
export type OperationMode = "off" | "always" | "fallback";
export type UnionArrayKeys<T> = {
    [K in keyof T]: T[K] extends undefined ? never : NonNullable<T[K]> extends infer R ? R extends R[] ? never : R extends (infer U)[] | infer U ? U[] extends R ? K : never : never : never;
}[keyof T] & keyof T;
export type UnionArraySearchParams = UnionArrayKeys<SearchParams>;
export type ArraybleParams = {
    readonly [K in UnionArraySearchParams]: string;
};
export type ExtractBaseTypes<T> = {
    [K in keyof T]: K extends UnionArrayKeys<T> ? T[K] extends (infer U)[] | infer U ? U : T[K] : T[K];
};
export declare const arrayableParams: ArraybleParams;
export interface SearchParams {
    q?: "*" | (string & {});
    query_by?: string | string[];
    query_by_weights?: string | number[];
    prefix?: string | boolean | boolean[];
    filter_by?: string;
    max_filter_by_candidates?: number;
    enable_synonyms?: boolean;
    enable_analytics?: boolean;
    filter_curated_hits?: boolean;
    enable_lazy_filter?: boolean;
    sort_by?: string | string[];
    facet_by?: string | string[];
    max_facet_values?: number;
    facet_sample_threshold?: number;
    facet_sample_percent?: number;
    facet_query?: string;
    facet_query_num_typos?: number;
    facet_return_parent?: string;
    facet_strategy?: "exhaustive" | "top_values" | "automatic";
    page?: number;
    per_page?: number;
    group_by?: string | string[];
    group_limit?: number;
    group_missing_values?: boolean;
    include_fields?: string | string[];
    exclude_fields?: string | string[];
    highlight_fields?: string | string[];
    highlight_full_fields?: string | string[];
    highlight_affix_num_tokens?: number;
    highlight_start_tag?: string;
    highlight_end_tag?: string;
    enable_highlight_v1?: boolean;
    snippet_threshold?: number;
    num_typos?: string | number | number[];
    min_len_1typo?: number;
    min_len_2typo?: number;
    split_join_tokens?: OperationMode;
    exhaustive_search?: boolean;
    drop_tokens_threshold?: number;
    drop_tokens_mode?: DropTokensMode;
    typo_tokens_threshold?: number;
    pinned_hits?: string | string[];
    hidden_hits?: string | string[];
    limit_hits?: number;
    pre_segmented_query?: boolean;
    enable_overrides?: boolean;
    override_tags?: string | string[];
    prioritize_exact_match?: boolean;
    prioritize_token_position?: boolean;
    prioritize_num_matching_fields?: boolean;
    search_cutoff_ms?: number;
    use_cache?: boolean;
    max_candidates?: number;
    infix?: OperationMode | OperationMode[];
    preset?: string;
    text_match_type?: "max_score" | "max_weight";
    vector_query?: string;
    "x-typesense-api-key"?: string;
    "x-typesense-user-id"?: string;
    offset?: number;
    limit?: number;
    stopwords?: string;
    conversation?: boolean;
    conversation_model_id?: string;
    conversation_id?: string;
    voice_query?: string;
}
export interface SearchableDocuments<T extends DocumentSchema> {
    search(searchParameters: SearchParams | SearchParamsWithPreset, options: SearchOptions): Promise<SearchResponse<T>>;
    clearCache(): void;
}
export interface WriteableDocuments<T> {
    create(document: T, options: DocumentWriteParameters): Promise<T>;
    upsert(document: T, options: DocumentWriteParameters): Promise<T>;
    update(document: T, options: DocumentWriteParameters): Promise<T>;
    delete(query: DeleteQuery): Promise<DeleteResponse>;
    import(documents: T[] | string, options: DocumentWriteParameters): Promise<string | ImportResponse[]>;
    export(options: DocumentsExportParameters): Promise<string>;
}
