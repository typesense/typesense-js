import type { AxiosRequestConfig } from "axios";
import type { BaseStreamConfig, StreamConfig } from "./Configuration";
import type {
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

export type CommaSeparated<
  T extends string,
  ToExtend,
  OriginalString extends string = T,
  Previous extends string[] = [],
> = T extends `${infer Start},${infer Rest}`
  ? TrimString<Start> extends ToExtend
    ? CommaSeparated<
        Rest,
        ToExtend,
        OriginalString,
        [...Previous, TrimString<Start>]
      >
    : {
        error: "Invalid operation mode";
        value: TrimString<Start>;
      }
  : TrimString<T> extends ToExtend
    ? OriginalString
    : {
        error: "Invalid operation mode";
        value: TrimString<T>;
      };

export type MessageChunk = {
  message: string;
  conversation_id: string;
};

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

export type UnionArraySearchParams<T extends DocumentSchema = DocumentSchema> =
  UnionArrayKeys<T>;

export type ArraybleParams<T extends DocumentSchema = DocumentSchema> = {
  readonly [K in UnionArraySearchParams<T>]: string;
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

export interface SearchParams<
  TDoc extends DocumentSchema,
  Infix extends string,
> {
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
  infix?:
    | CommaSeparated<Infix, OperationMode>
    | OperationMode[]
    | OperationMode;
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
  streamConfig?: StreamConfig<TDoc>;
}

export interface SearchResponseRequestParams {
  collection_name?: string;
  q?: string;
  page?: number;
  per_page?: number;
  first_q?: string;
  voice_query?: {
    transcribed_query?: string;
  };
}

export interface SearchableDocuments<
  T extends DocumentSchema = DocumentSchema,
  Infix extends string = string,
> {
  search(
    searchParameters: SearchParams<T, Infix> | SearchParamsWithPreset<T, Infix>,
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

export interface MultiSearchUnionStreamConfig<T extends DocumentSchema>
  extends BaseStreamConfig {
  onComplete?: (data: UnionSearchResponse<T>) => void;
}

export interface MultiSearchResultsStreamConfig<T extends DocumentSchema[]>
  extends BaseStreamConfig {
  onComplete?: (data: {
    results: { [Index in keyof T]: SearchResponse<T[Index]> } & {
      length: T["length"];
    };
  }) => void;
}
export interface RequestParams<T extends DocumentSchema[]> {
  path: string;
  queryParams?: Record<string, unknown>;
  body?: unknown;
  headers?: Record<string, string>;
  streamConfig?:
    | StreamConfig<T[number]>
    | MultiSearchResultsStreamConfig<T>
    | MultiSearchUnionStreamConfig<T[number]>;
  abortSignal?: AbortSignal | null;
  responseType?: AxiosRequestConfig["responseType"] | undefined;
  isStreamingRequest: boolean | undefined;
}

export interface MultiSearchRequestsWithUnionSchema<
  T extends DocumentSchema,
  Infix extends string,
> extends SearchesMultiSearchesRequestSchema<T, Infix> {
  union: true;
}

export interface MultiSearchRequestsWithoutUnionSchema<
  T extends DocumentSchema,
  Infix extends string,
> extends SearchesMultiSearchesRequestSchema<T, Infix> {
  union?: false | undefined;
}

export type MultiSearchRequestsSchema<
  T extends DocumentSchema,
  Infix extends string,
> =
  | MultiSearchRequestsWithUnionSchema<T, Infix>
  | MultiSearchRequestsWithoutUnionSchema<T, Infix>;

export interface UnionSearchResponse<T extends DocumentSchema>
  extends Omit<SearchResponse<T>, "request_params"> {
  union_request_params: SearchResponseRequestParams[];
}

export type MultiSearchResponse<
  T extends DocumentSchema[],
  Infix extends string,
  R extends MultiSearchRequestsSchema<
    T[number],
    Infix
  > = MultiSearchRequestsSchema<T[number], Infix>,
> =
  R extends MultiSearchRequestsWithUnionSchema<T[number], Infix>
    ? UnionSearchResponse<T[number]>
    : {
        results: { [Index in keyof T]: SearchResponse<T[Index]> } & {
          length: T["length"];
        };
      };

export interface MultiSearchUnionStreamConfig<T extends DocumentSchema>
  extends BaseStreamConfig {
  onComplete?: (data: UnionSearchResponse<T>) => void;
}

export interface MultiSearchResultsStreamConfig<T extends DocumentSchema[]>
  extends BaseStreamConfig {
  onComplete?: (data: {
    results: { [Index in keyof T]: SearchResponse<T[Index]> } & {
      length: T["length"];
    };
  }) => void;
}

interface SearchesMultiSearchesRequestSchema<
  T extends DocumentSchema,
  Infix extends string,
> {
  searches: (
    | MultiSearchRequestSchema<T, Infix>
    | MultiSearchRequestWithPresetSchema<T, Infix>
  )[];
}

interface BaseMultiSearchRequestSchema {
  collection?: string;
  rerank_hybrid_matches?: boolean;
  "x-typesense-api-key"?: string;
}

type CommonMultiSearchParametersBase<
  T extends DocumentSchema,
  Infix extends string,
> = Partial<
  BaseMultiSearchRequestSchema & Omit<SearchParams<T, Infix>, "streamConfig">
>;

export type MultiSearchRequestSchema<
  T extends DocumentSchema,
  Infix extends string,
> = BaseMultiSearchRequestSchema & Omit<SearchParams<T, Infix>, "streamConfig">;

export type MultiSearchRequestWithPresetSchema<
  T extends DocumentSchema,
  Infix extends string,
> = BaseMultiSearchRequestSchema &
  Omit<SearchParamsWithPreset<T, Infix>, "streamConfig">;

export type MultiSearchUnionParameters<
  T extends DocumentSchema,
  Infix extends string,
> = CommonMultiSearchParametersBase<T, Infix> & {
  streamConfig?: MultiSearchUnionStreamConfig<T>;
  use_cache?: boolean;
};

export type MultiSearchResultsParameters<
  T extends DocumentSchema[],
  Infix extends string,
> = CommonMultiSearchParametersBase<T[number], Infix> & {
  streamConfig?: MultiSearchResultsStreamConfig<T>;
  use_cache?: boolean;
};

type Whitespace = " " | "\n" | "\t";

type TrimString<S extends string> = S extends `${Whitespace}${infer S}`
  ? TrimString<S>
  : S extends `${infer S}${Whitespace}`
    ? TrimString<S>
    : S;
