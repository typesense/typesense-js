import ApiCall from "./ApiCall";
import Configuration from "./Configuration";
import RequestWithCache from "./RequestWithCache";
import {
  DocumentSchema,
  ExtractBaseTypes,
  SearchParams,
  SearchResponse,
} from "./Documents";
import { normalizeArrayableParams } from "./Utils";
import type {
  MultiSearchRequestsSchema,
  MultiSearchRequestsWithUnionSchema,
  MultiSearchResponse,
  MultiSearchUnionParameters,
  MultiSearchResultsParameters,
  UnionSearchResponse,
  MultiSearchRequestsWithoutUnionSchema,
} from "./Types";

const RESOURCEPATH = "/multi_search";

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
    const T extends DocumentSchema[] = [],
    const Infix extends string = string,
  >(
    searchRequests: MultiSearchRequestsWithUnionSchema<T[number], Infix>,
    commonParams?: MultiSearchUnionParameters<T[number], Infix>,
    options?: { cacheSearchResultsForSeconds?: number },
  ): Promise<UnionSearchResponse<T[number]>>;

  async perform<
    const T extends DocumentSchema[] = [],
    const Infix extends string = string,
  >(
    searchRequests: MultiSearchRequestsWithoutUnionSchema<T[number], Infix>,
    commonParams?: MultiSearchResultsParameters<T, Infix>,
    options?: { cacheSearchResultsForSeconds?: number },
  ): Promise<{
    results: { [Index in keyof T]: SearchResponse<T[Index]> } & {
      length: T["length"];
    };
  }>;

  async perform<
    const T extends DocumentSchema[] = [],
    const Infix extends string = string,
  >(
    searchRequests: MultiSearchRequestsSchema<T[number], Infix>,
    commonParams?:
      | MultiSearchUnionParameters<T[number], Infix>
      | MultiSearchResultsParameters<T, Infix>,
    {
      cacheSearchResultsForSeconds = this.configuration
        .cacheSearchResultsForSeconds,
    }: { cacheSearchResultsForSeconds?: number } = {},
  ): Promise<MultiSearchResponse<T, Infix>> {
    const params = commonParams ? { ...commonParams } : {};

    if (this.configuration.useServerSideSearchCache === true) {
      params.use_cache = true;
    }

    const normalizedSearchRequests: Omit<typeof searchRequests, "searches"> & {
      searches: ExtractBaseTypes<SearchParams<T[number], Infix>>[];
    } = {
      union: searchRequests.union,
      searches: searchRequests.searches.map(
        normalizeArrayableParams<
          T[number],
          SearchParams<T[number], Infix>,
          Infix
        >,
      ),
    };

    const { streamConfig, ...paramsWithoutStream } = params;
    const normalizedQueryParams = normalizeArrayableParams(
      paramsWithoutStream as SearchParams<T[number], Infix>,
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

export type {
  MultiSearchRequestsSchema,
  MultiSearchRequestsWithUnionSchema,
  MultiSearchResponse,
  MultiSearchUnionParameters,
  MultiSearchResultsParameters,
  UnionSearchResponse,
  MultiSearchRequestsWithoutUnionSchema,
} from "./Types";
