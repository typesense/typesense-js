'use strict'

import ApiCall from './ApiCall'

const RESOURCEPATH = '/collections'

class Collections {
  constructor (configuration) {
    this._configuration = configuration
  }

  create (schema) {
    return new ApiCall(this._configuration).post(RESOURCEPATH, schema)
  }

  retrieveAll (schema) {
    return new ApiCall(this._configuration).get(RESOURCEPATH)
  }

  static get RESOURCEPATH () {
    return RESOURCEPATH
  }
}

module.exports = Collections
