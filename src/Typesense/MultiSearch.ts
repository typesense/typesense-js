import ApiCall from "./ApiCall";
import Configuration from "./Configuration";
import RequestWithCache from "./RequestWithCache";
import {
  DocumentSchema,
  ExtractBaseTypes,
  SearchParams,
  SearchParamsWithPreset,
  SearchResponse,
  SearchResponseRequestParams,
} from "./Documents";
import { normalizeArrayableParams } from "./Utils";
import { BaseStreamConfig } from "./Configuration";

const RESOURCEPATH = "/multi_search";

type BaseMultiSearchRequestSchema = {
  collection?: string;
  rerank_hybrid_matches?: boolean;
  "x-typesense-api-key"?: string;
};

export type MultiSearchRequestSchema<T extends DocumentSchema> =
  BaseMultiSearchRequestSchema & Omit<SearchParams<T>, "streamConfig">;

export type MultiSearchRequestWithPresetSchema<T extends DocumentSchema> =
  BaseMultiSearchRequestSchema &
    Omit<SearchParamsWithPreset<T>, "streamConfig">;

interface SearchesMultiSearchesRequestSchema<T extends DocumentSchema> {
  searches: (
    | MultiSearchRequestSchema<T>
    | MultiSearchRequestWithPresetSchema<T>
  )[];
}

export interface MultiSearchRequestsWithUnionSchema<T extends DocumentSchema>
  extends SearchesMultiSearchesRequestSchema<T> {
  union: true;
}

export interface MultiSearchRequestsWithoutUnionSchema<T extends DocumentSchema>
  extends SearchesMultiSearchesRequestSchema<T> {
  union?: false | undefined;
}

export type MultiSearchRequestsSchema<T extends DocumentSchema> =
  | MultiSearchRequestsWithUnionSchema<T>
  | MultiSearchRequestsWithoutUnionSchema<T>;

export interface UnionSearchResponse<T extends DocumentSchema>
  extends Omit<SearchResponse<T>, "request_params"> {
  union_request_params: SearchResponseRequestParams[];
}

export type MultiSearchResponse<
  T extends DocumentSchema[],
  R extends MultiSearchRequestsSchema<T[number]> = MultiSearchRequestsSchema<
    T[number]
  >,
> =
  R extends MultiSearchRequestsWithUnionSchema<T[number]>
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

type CommonMultiSearchParametersBase<T extends DocumentSchema> = Partial<
  BaseMultiSearchRequestSchema & Omit<SearchParams<T>, "streamConfig">
>;

export type MultiSearchUnionParameters<T extends DocumentSchema> =
  CommonMultiSearchParametersBase<T> & {
    streamConfig?: MultiSearchUnionStreamConfig<T>;
    use_cache?: boolean;
  };

export type MultiSearchResultsParameters<T extends DocumentSchema[]> =
  CommonMultiSearchParametersBase<T[number]> & {
    streamConfig?: MultiSearchResultsStreamConfig<T>;
    use_cache?: boolean;
  };

export default class MultiSearch {
  private requestWithCache: RequestWithCache;

  constructor(
    private apiCall: ApiCall,
    private configuration: Configuration,
    private useTextContentType: boolean = false,
  ) {
    this.requestWithCache = new RequestWithCache();
  }

  clearCache() {
    this.requestWithCache.clearCache();
  }

  async perform<const T extends DocumentSchema[] = []>(
    searchRequests: MultiSearchRequestsWithUnionSchema<T[number]>,
    commonParams?: MultiSearchUnionParameters<T[number]>,
    options?: { cacheSearchResultsForSeconds?: number },
  ): Promise<UnionSearchResponse<T[number]>>;

  async perform<const T extends DocumentSchema[] = []>(
    searchRequests: MultiSearchRequestsWithoutUnionSchema<T[number]>,
    commonParams?: MultiSearchResultsParameters<T>,
    options?: { cacheSearchResultsForSeconds?: number },
  ): Promise<{
    results: { [Index in keyof T]: SearchResponse<T[Index]> } & {
      length: T["length"];
    };
  }>;

  async perform<const T extends DocumentSchema[] = []>(
    searchRequests: MultiSearchRequestsSchema<T[number]>,
    commonParams?:
      | MultiSearchUnionParameters<T[number]>
      | MultiSearchResultsParameters<T>,
    {
      cacheSearchResultsForSeconds = this.configuration
        .cacheSearchResultsForSeconds,
    }: { cacheSearchResultsForSeconds?: number } = {},
  ): Promise<MultiSearchResponse<T>> {
    const params = { ...commonParams } as
      | MultiSearchUnionParameters<T[number]>
      | MultiSearchResultsParameters<T>
      | { use_cache?: boolean; streamConfig?: unknown };

    if (this.configuration.useServerSideSearchCache === true) {
      params.use_cache = true;
    }

    const normalizedSearchRequests: Omit<typeof searchRequests, "searches"> & {
      searches: ExtractBaseTypes<SearchParams<T[number]>>[];
    } = {
      union: searchRequests.union,
      searches: searchRequests.searches.map(normalizeArrayableParams),
    };

    const { streamConfig, ...paramsWithoutStream } = params;
    const normalizedQueryParams = normalizeArrayableParams(
      paramsWithoutStream as SearchParams<T[number]>,
    );

    return this.requestWithCache.perform(
      this.apiCall,
      "post",
      {
        path: RESOURCEPATH,
        body: normalizedSearchRequests,
        queryParams: normalizedQueryParams,
        headers: this.useTextContentType
          ? { "content-type": "text/plain" }
          : {},
        streamConfig,
        isStreamingRequest: this.isStreamingRequest(params),
      },
      { cacheResponseForSeconds: cacheSearchResultsForSeconds },
    );
  }

  private isStreamingRequest(commonParams: { streamConfig?: unknown }) {
    return commonParams.streamConfig !== undefined;
  }
}
