import {
  DocumentSchema,
  SearchParamsWithPreset,
  SearchOptions,
  SearchResponse,
  DocumentWriteParameters,
  DeleteQuery,
  DeleteResponse,
  ImportResponse,
  DocumentsExportParameters,
} from "./Documents";

export type DropTokensMode = "right_to_left" | "left_to_right" | "both_sides:3";

export type OperationMode = "off" | "always" | "fallback";

export type UnionArrayKeys<T> = {
  [K in keyof T]: T[K] extends undefined
    ? never
    : NonNullable<T[K]> extends infer R
      ? R extends R[]
        ? never
        : R extends (infer U)[] | infer U
          ? U[] extends R
            ? K
            : never
          : never
      : never;
}[keyof T] &
  keyof T;

export type UnionArraySearchParams = UnionArrayKeys<SearchParams>;

export type ArraybleParams = {
  readonly [K in UnionArraySearchParams]: string;
};

export type ExtractBaseTypes<T> = {
  [K in keyof T]: K extends UnionArrayKeys<T>
    ? T[K] extends (infer U)[] | infer U
      ? U
      : T[K]
    : T[K];
};

export const arrayableParams: ArraybleParams = {
  query_by: "query_by",
  query_by_weights: "query_by_weights",
  facet_by: "facet_by",
  group_by: "group_by",
  include_fields: "include_fields",
  exclude_fields: "exclude_fields",
  highlight_fields: "highlight_fields",
  highlight_full_fields: "highlight_full_fields",
  pinned_hits: "pinned_hits",
  hidden_hits: "hidden_hits",
  infix: "infix",
  override_tags: "override_tags",
  num_typos: "num_typos",
  prefix: "prefix",
  sort_by: "sort_by",
};

export interface SearchParams {
  // From https://typesense.org/docs/latest/api/documents.html#arguments
  // eslint-disable-next-line @typescript-eslint/ban-types -- Can't use `object` here, it needs to intersect with `{}`
  q?: "*" | (string & {});
  query_by?: string | string[];
  query_by_weights?: string | number[];
  prefix?: string | boolean | boolean[]; // default: true
  filter_by?: string;
  max_filter_by_candidates?: number; // default: 4
  enable_synonyms?: boolean; // default: true
  enable_analytics?: boolean; // default: true
  filter_curated_hits?: boolean; // default: false
  enable_lazy_filter?: boolean; // default: false
  sort_by?: string | string[]; // default: text match desc
  facet_by?: string | string[];
  max_facet_values?: number;
  facet_sample_threshold?: number;
  facet_sample_percent?: number;
  facet_query?: string;
  facet_query_num_typos?: number;
  facet_return_parent?: string;
  facet_strategy?: "exhaustive" | "top_values" | "automatic";
  page?: number; // default: 1
  per_page?: number; // default: 10, max 250
  group_by?: string | string[];
  group_limit?: number; // default:
  group_missing_values?: boolean;
  include_fields?: string | string[];
  exclude_fields?: string | string[];
  highlight_fields?: string | string[]; // default: all queried fields
  highlight_full_fields?: string | string[]; // default: all fields
  highlight_affix_num_tokens?: number; // default: 4
  highlight_start_tag?: string; // default: <mark>
  highlight_end_tag?: string; // default: </mark>
  enable_highlight_v1?: boolean;
  snippet_threshold?: number; // default: 30
  num_typos?: string | number | number[]; // default: 2
  min_len_1typo?: number;
  min_len_2typo?: number;
  split_join_tokens?: OperationMode;
  exhaustive_search?: boolean;
  drop_tokens_threshold?: number; // default: 10
  drop_tokens_mode?: DropTokensMode;
  typo_tokens_threshold?: number; // default: 100
  pinned_hits?: string | string[];
  hidden_hits?: string | string[];
  limit_hits?: number; // default: no limit
  pre_segmented_query?: boolean;
  enable_overrides?: boolean;
  override_tags?: string | string[];
  prioritize_exact_match?: boolean; // default: true
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
  conversation_stream?: boolean;
  conversation_model_id?: string;
  conversation_id?: string;
  voice_query?: string;
}
export interface SearchableDocuments<T extends DocumentSchema> {
  search(
    searchParameters: SearchParams | SearchParamsWithPreset,
    options: SearchOptions,
  ): Promise<SearchResponse<T>>;
  clearCache(): void;
}

export interface WriteableDocuments<T> {
  create(document: T, options: DocumentWriteParameters): Promise<T>;
  upsert(document: T, options: DocumentWriteParameters): Promise<T>;
  update(document: T, options: DocumentWriteParameters): Promise<T>;
  delete(query: DeleteQuery): Promise<DeleteResponse>;
  import(
    documents: T[] | string,
    options: DocumentWriteParameters,
  ): Promise<string | ImportResponse[]>;
  export(options: DocumentsExportParameters): Promise<string>;
}
