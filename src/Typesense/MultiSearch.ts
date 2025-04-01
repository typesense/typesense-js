import ApiCall from "./ApiCall";
import Configuration from "./Configuration";
import RequestWithCache from "./RequestWithCache";
import {
  DocumentSchema,
  SearchParams,
  SearchParamsWithPreset,
  SearchResponse,
  SearchResponseRequestParams,
} from "./Documents";
import { normalizeArrayableParams } from "./Utils";

const RESOURCEPATH = "/multi_search";

export interface MultiSearchRequestSchema<T extends DocumentSchema>
  extends SearchParams<T> {
  collection?: string;
  rerank_hybrid_matches?: boolean;
  "x-typesense-api-key"?: string;
}

export interface MultiSearchRequestWithPresetSchema<T extends DocumentSchema>
  extends SearchParamsWithPreset<T> {
  collection?: string;
  "x-typesense-api-key"?: string;
}

export interface MultiSearchRequestsWithUnionSchema<T extends DocumentSchema> {
  union: true;
  searches: (
    | MultiSearchRequestSchema<T>
    | MultiSearchRequestWithPresetSchema<T>
  )[];
}

export interface MultiSearchRequestsWithoutUnionSchema<
  T extends DocumentSchema,
> {
  union?: false | undefined;
  searches: (
    | MultiSearchRequestSchema<T>
    | MultiSearchRequestWithPresetSchema<T>
  )[];
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
  R extends MultiSearchRequestsWithUnionSchema<any>
    ? UnionSearchResponse<T[number]>
    : {
        results: { [Index in keyof T]: SearchResponse<T[Index]> } & {
          length: T["length"];
        };
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
    commonParams?: Partial<MultiSearchRequestSchema<T[number]>>,
    options?: { cacheSearchResultsForSeconds?: number },
  ): Promise<UnionSearchResponse<T[number]>>;

  async perform<const T extends DocumentSchema[] = []>(
    searchRequests: MultiSearchRequestsWithoutUnionSchema<T[number]>,
    commonParams?: Partial<MultiSearchRequestSchema<T[number]>>,
    options?: { cacheSearchResultsForSeconds?: number },
  ): Promise<{
    results: { [Index in keyof T]: SearchResponse<T[Index]> } & {
      length: T["length"];
    };
  }>;

  async perform<const T extends DocumentSchema[] = []>(
    searchRequests: MultiSearchRequestsSchema<T[number]>,
    commonParams: Partial<MultiSearchRequestSchema<T[number]>> = {},
    {
      cacheSearchResultsForSeconds = this.configuration
        .cacheSearchResultsForSeconds,
    }: { cacheSearchResultsForSeconds?: number } = {},
  ): Promise<any> {
    const additionalHeaders = {};
    if (this.useTextContentType) {
      additionalHeaders["content-type"] = "text/plain";
    }

    const additionalQueryParams = {};
    if (this.configuration.useServerSideSearchCache === true) {
      additionalQueryParams["use_cache"] = true;
    }

    const queryParams = { ...commonParams, ...additionalQueryParams };

    const { extractedStreamConfig, searchesWithoutStreamConfig } =
      this.extractStreamConfig(searchRequests.searches);

    const normalizedSearchRequests = {
      ...searchRequests,
      searches: searchesWithoutStreamConfig.map(normalizeArrayableParams),
    };

    const normalizedQueryParams = normalizeArrayableParams(queryParams);

    return this.requestWithCache.perform(
      this.apiCall,
      "post",
      {
        path: RESOURCEPATH,
        body: normalizedSearchRequests,
        queryParams: normalizedQueryParams,
        headers: additionalHeaders,
        streamConfig: extractedStreamConfig,
        isStreamingRequest: this.isStreamingRequest(searchRequests),
      },
      { cacheResponseForSeconds: cacheSearchResultsForSeconds },
    );
  }

  private isStreamingRequest<T extends DocumentSchema>(
    searchRequests: MultiSearchRequestsSchema<T>,
  ) {
    return searchRequests.searches.some(
      (search) => search.streamConfig !== undefined,
    );
  }

  /**
   * Extracts streamConfig from search requests and returns both the config and clean requests
   */
  private extractStreamConfig<T extends DocumentSchema>(
    searches: (
      | MultiSearchRequestSchema<T>
      | MultiSearchRequestWithPresetSchema<T>
    )[],
  ) {
    const searchWithStreamConfig = searches.find(
      (search) => search.streamConfig !== undefined,
    );

    const searchesWithoutStreamConfig = searches.map(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      ({ streamConfig, ...rest }) => rest,
    );

    return {
      extractedStreamConfig: searchWithStreamConfig?.streamConfig,
      searchesWithoutStreamConfig,
    };
  }
}
