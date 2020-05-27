'use strict'

import Keys from './Keys'

class Key {
  constructor (id, apiCall) {
    this._apiCall = apiCall
    this._id = id
  }

  retrieve () {
    return this._apiCall.get(this._endpointPath())
  }

  delete () {
    return this._apiCall.delete(this._endpointPath())
  }

  _endpointPath () {
    return `${Keys.RESOURCEPATH}/${this._id}`
  }
}

module.exports = Key
