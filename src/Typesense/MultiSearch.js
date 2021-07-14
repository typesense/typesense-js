'use strict'

import RequestWithCache from './RequestWithCache'

const RESOURCEPATH = '/multi_search'

export default class MultiSearch {
  constructor (apiCall, configuration, useTextContentType = false) {
    this._apiCall = apiCall
    this._configuration = configuration
    this._useTextContentType = useTextContentType // To avoid OPTIONS request

    this._requestWithCache = new RequestWithCache()
  }

  perform (searchRequests, commonParams = {}, {cacheSearchResultsForSeconds = this._configuration.cacheSearchResultsForSeconds} = {}) {
    let additionalHeaders = {}
    if (this._useTextContentType) {
      additionalHeaders['content-type'] = 'text/plain'
    }

    let additionalQueryParams = {}
    if (this._configuration.useServerSideSearchCache === true) {
      additionalQueryParams['use_cache'] = true
    }
    const queryParams = Object.assign({}, commonParams, additionalQueryParams)

    return this._requestWithCache.perform(
      this._apiCall,
      this._apiCall.post,
      [RESOURCEPATH, searchRequests, queryParams, additionalHeaders],
      {cacheResponseForSeconds: cacheSearchResultsForSeconds}
    )
  }
}
