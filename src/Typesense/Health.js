'use strict'

const RESOURCEPATH = '/health'

export default class Health {
  constructor (apiCall) {
    this._apiCall = apiCall
  }

  retrieve () {
    return this._apiCall.get(RESOURCEPATH)
  }
}
