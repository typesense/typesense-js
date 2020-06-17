'use strict'

const RESOURCEPATH = '/metrics.json'

export default class Metrics {
  constructor (apiCall) {
    this._apiCall = apiCall
  }

  retrieve () {
    return this._apiCall.get(RESOURCEPATH)
  }
}
