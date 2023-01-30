import ApiCall from './ApiCall'
import Configuration from './Configuration'
import RequestWithCache from './RequestWithCache'
import { DocumentSchema, SearchParams, SearchResponse } from './Documents'

const RESOURCEPATH = '/multi_search'

export interface MultiSearchRequestSchema extends SearchParams {
  collection?: string
  'x-typesense-api-key'?: string
}

export interface MultiSearchRequestsSchema {
  searches: MultiSearchRequestSchema[]
}

export interface MultiSearchResponse<T extends DocumentSchema = {}> {
  results: SearchResponse<T>[]
}

export default class MultiSearch<T extends DocumentSchema = {}> {
  private requestWithCache: RequestWithCache

  constructor(
    private apiCall: ApiCall,
    private configuration: Configuration,
    private useTextContentType: boolean = false
  ) {
    this.requestWithCache = new RequestWithCache()
  }

  clearCache() {
    this.requestWithCache.clearCache()
  }

  async perform(
    searchRequests: MultiSearchRequestsSchema,
    commonParams: Partial<MultiSearchRequestSchema> = {},
    {
      cacheSearchResultsForSeconds = this.configuration.cacheSearchResultsForSeconds
    }: { cacheSearchResultsForSeconds?: number } = {}
  ): Promise<MultiSearchResponse<T>> {
    let additionalHeaders = {}
    if (this.useTextContentType) {
      additionalHeaders['content-type'] = 'text/plain'
    }

    let additionalQueryParams = {}
    if (this.configuration.useServerSideSearchCache === true) {
      additionalQueryParams['use_cache'] = true
    }
    const queryParams = Object.assign({}, commonParams, additionalQueryParams)

    return this.requestWithCache.perform(
      this.apiCall,
      this.apiCall.post,
      [RESOURCEPATH, searchRequests, queryParams, additionalHeaders],
      { cacheResponseForSeconds: cacheSearchResultsForSeconds }
    ) as Promise<MultiSearchResponse<T>>
  }
}
