'use strict'

const RESOURCEPATH = '/search'

export default class Search {
  constructor (apiCall, useTextContentType = false) {
    this._apiCall = apiCall
    this._useTextContentType = useTextContentType // To avoid OPTIONS request
  }

  perform (searchRequests, commonParams = {}) {
    let additionalHeaders = {}
    if (this._useTextContentType) {
      additionalHeaders['content-type'] = 'text/plain'
    }
    return this._apiCall.post(RESOURCEPATH, searchRequests, commonParams, additionalHeaders)
  }
}
