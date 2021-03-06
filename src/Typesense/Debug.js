'use strict'

const RESOURCEPATH = '/debug'

export default class Debug {
  constructor (apiCall) {
    this._apiCall = apiCall
  }

  retrieve () {
    return this._apiCall.get(RESOURCEPATH)
  }
}
