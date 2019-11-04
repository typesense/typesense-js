'use strict'

import ApiCall from './ApiCall'

const RESOURCEPATH = '/aliases'

class Aliases {
  constructor (configuration) {
    this._configuration = configuration
  }

  upsert (name, mapping) {
    return new ApiCall(this._configuration).put(this._endpointPath(name), mapping)
  }

  retrieve (schema) {
    return new ApiCall(this._configuration).get(RESOURCEPATH)
  }

  _endpointPath (aliasName) {
    return `${Aliases.RESOURCEPATH}/${aliasName}`
  }

  static get RESOURCEPATH () {
    return RESOURCEPATH
  }
}

module.exports = Aliases
