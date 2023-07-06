import ApiCall from "./ApiCall";
import Configuration from "./Configuration";
import RequestWithCache from "./RequestWithCache";
import {
  DocumentSchema,
  SearchParams,
  SearchParamsWithPreset,
  SearchResponse,
} from "./Documents";

const RESOURCEPATH = "/multi_search";

export interface MultiSearchRequestSchema extends SearchParams {
  collection?: string;
  "x-typesense-api-key"?: string;
}

export interface MultiSearchRequestWithPresetSchema
  extends SearchParamsWithPreset {
  collection?: string;
  "x-typesense-api-key"?: string;
}

export interface MultiSearchRequestsSchema {
  searches: (MultiSearchRequestSchema | MultiSearchRequestWithPresetSchema)[];
}

export interface MultiSearchResponse<T extends DocumentSchema[] = []> {
  results: { [Index in keyof T]: SearchResponse<T[Index]> } & {
    length: T["length"];
  };
}

export default class MultiSearch {
  private requestWithCache: RequestWithCache;

  constructor(
    private apiCall: ApiCall,
    private configuration: Configuration,
    private useTextContentType: boolean = false
  ) {
    this.requestWithCache = new RequestWithCache();
  }

  clearCache() {
    this.requestWithCache.clearCache();
  }

  async perform<T extends DocumentSchema[] = []>(
    searchRequests: MultiSearchRequestsSchema,
    commonParams: Partial<MultiSearchRequestSchema> = {},
    {
      cacheSearchResultsForSeconds = this.configuration
        .cacheSearchResultsForSeconds,
    }: { cacheSearchResultsForSeconds?: number } = {}
  ): Promise<MultiSearchResponse<T>> {
    const additionalHeaders = {};
    if (this.useTextContentType) {
      additionalHeaders["content-type"] = "text/plain";
    }

    const additionalQueryParams = {};
    if (this.configuration.useServerSideSearchCache === true) {
      additionalQueryParams["use_cache"] = true;
    }
    const queryParams = Object.assign({}, commonParams, additionalQueryParams);

    return this.requestWithCache.perform(
      this.apiCall,
      this.apiCall.post,
      [RESOURCEPATH, searchRequests, queryParams, additionalHeaders],
      { cacheResponseForSeconds: cacheSearchResultsForSeconds }
    ) as Promise<MultiSearchResponse<T>>;
  }
}
