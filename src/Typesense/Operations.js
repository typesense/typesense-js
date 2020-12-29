'use strict'

const RESOURCEPATH = '/operations'

export default class Operations {
  constructor (apiCall) {
    this._apiCall = apiCall
  }

  perform (operationName, queryParameters = {}) {
    return this._apiCall.post(`${RESOURCEPATH}/${operationName}`, {}, queryParameters)
  }
}
