'use strict'

const RESOURCEPATH = '/stats.json'

export default class Stats {
  constructor (apiCall) {
    this._apiCall = apiCall
  }

  retrieve () {
    return this._apiCall.get(RESOURCEPATH)
  }
}
