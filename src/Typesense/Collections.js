'use strict'

const RESOURCEPATH = '/collections'

class Collections {
  constructor (apiCall) {
    this._apiCall = apiCall
  }

  create (schema) {
    return this._apiCall.post(RESOURCEPATH, schema)
  }

  retrieve (schema) {
    return this._apiCall.get(RESOURCEPATH)
  }

  static get RESOURCEPATH () {
    return RESOURCEPATH
  }
}

module.exports = Collections
