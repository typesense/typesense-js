'use strict'

const RESOURCEPATH = '/aliases'

class Aliases {
  constructor (apiCall) {
    this._apiCall = apiCall
  }

  upsert (name, mapping) {
    return this._apiCall.put(this._endpointPath(name), mapping)
  }

  retrieve (schema) {
    return this._apiCall.get(RESOURCEPATH)
  }

  _endpointPath (aliasName) {
    return `${Aliases.RESOURCEPATH}/${aliasName}`
  }

  static get RESOURCEPATH () {
    return RESOURCEPATH
  }
}

module.exports = Aliases
