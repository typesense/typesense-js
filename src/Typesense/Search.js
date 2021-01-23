'use strict'

const RESOURCEPATH = '/search'

export default class Debug {
  constructor (apiCall) {
    this._apiCall = apiCall
  }

  perform (searchRequests, commonParams = {}) {
    return this._apiCall.post(RESOURCEPATH, searchRequests, commonParams)
  }
}
