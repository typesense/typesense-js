'use strict'

const RESOURCEPATH = '/debug'

class Collections {
  constructor (apiCall) {
    this._apiCall = apiCall
  }

  retrieve () {
    return this._apiCall.get(RESOURCEPATH)
  }
}

module.exports = Collections
