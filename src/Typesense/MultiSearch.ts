import type ApiCall from "./ApiCall";
import type Configuration from "./Configuration";
import RequestWithCache from "./RequestWithCache";
import type {
  DocumentSchema,
  ExtractBaseTypes,
  SearchOptions,
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
import { Logger } from "loglevel";

const RESOURCEPATH = "/multi_search";

export default class MultiSearch {
  private requestWithCache: RequestWithCache;
  readonly logger: Logger;

  constructor(
    private apiCall: ApiCall,
    private configuration: Configuration,
    private useTextContentType: boolean = false,
  ) {
    this.requestWithCache = new RequestWithCache();
    this.logger = this.apiCall.logger;
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
    options?: SearchOptions,
  ): Promise<UnionSearchResponse<T[number]>>;

  async perform<
    const T extends DocumentSchema[] = [],
    const Infix extends string = string,
  >(
    searchRequests: MultiSearchRequestsWithoutUnionSchema<T[number], Infix>,
    commonParams?: MultiSearchResultsParameters<T, Infix>,
    options?: SearchOptions,
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
    options?: SearchOptions,
  ): Promise<MultiSearchResponse<T, Infix>> {
    const params = commonParams ? { ...commonParams } : {};

    if (this.configuration.useServerSideSearchCache === true) {
      params.use_cache = true;
    }

    if (searchRequests.union === true && this.hasAnySearchObjectPagination(searchRequests)) {
      this.logger.warn(
        "Individual `searches` pagination parameters are ignored when `union: true` is set. Use a top-level pagination parameter instead. See https://typesense.org/docs/29.0/api/federated-multi-search.html#union-search"
      );
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
        abortSignal: options?.abortSignal,
        isStreamingRequest: this.isStreamingRequest(params),
      },
      options?.cacheSearchResultsForSeconds !== undefined
        ? { cacheResponseForSeconds: options.cacheSearchResultsForSeconds }
        : undefined,
    );
  }

  private isStreamingRequest(commonParams: { streamConfig?: unknown }) {
    return commonParams.streamConfig !== undefined;
  }

  private hasAnySearchObjectPagination(searchRequests: MultiSearchRequestsSchema<DocumentSchema, string>) {
    return searchRequests.searches.some(search => search.page !== undefined || search.per_page !== undefined || search.offset !== undefined || search.limit !== undefined || search.limit_hits !== undefined);
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
