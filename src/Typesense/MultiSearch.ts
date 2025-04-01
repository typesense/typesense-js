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

export interface MultiSearchRequestsSchema<
  U extends boolean | undefined = undefined,
> {
  union?: U;
  searches: (MultiSearchRequestSchema | MultiSearchRequestWithPresetSchema)[];
}

export interface UnionSearchResponse<T extends DocumentSchema>
  extends Omit<SearchResponse<T>, "request_params"> {
  union_request_params: SearchResponseRequestParams[];
}

export type MultiSearchResponse<
  U extends boolean | undefined,
  T extends DocumentSchema[],
> = U extends true
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

  async perform<
    T extends DocumentSchema[] = [],
    const U extends boolean | undefined = undefined,
  >(
    searchRequests: MultiSearchRequestsSchema<U>,
    commonParams: Partial<MultiSearchRequestSchema> = {},
    {
      cacheSearchResultsForSeconds = this.configuration
        .cacheSearchResultsForSeconds,
    }: { cacheSearchResultsForSeconds?: number } = {},
  ): Promise<MultiSearchResponse<U, T>> {
    const additionalHeaders = {};
    if (this.useTextContentType) {
      additionalHeaders["content-type"] = "text/plain";
    }

    const additionalQueryParams = {};
    if (this.configuration.useServerSideSearchCache === true) {
      additionalQueryParams["use_cache"] = true;
    }

    const queryParams = { ...commonParams, ...additionalQueryParams };

    const normalizedSearchRequests = {
      ...searchRequests,
      searches: searchRequests.searches.map(normalizeArrayableParams),
    };

    const normalizedQueryParams = normalizeArrayableParams(queryParams);

    return this.requestWithCache.perform(
      this.apiCall,
      this.apiCall.post,
      [
        RESOURCEPATH,
        normalizedSearchRequests,
        normalizedQueryParams,
        additionalHeaders,
      ],
      { cacheResponseForSeconds: cacheSearchResultsForSeconds },
    ) as Promise<MultiSearchResponse<U, T>>;
  }
}
