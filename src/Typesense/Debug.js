'use strict'

import ApiCall from './ApiCall'

const RESOURCEPATH = '/debug'

class Collections {
  constructor (configuration) {
    this._configuration = configuration
  }

  retrieve () {
    return new ApiCall(this._configuration).get(RESOURCEPATH)
  }
}

module.exports = Collections
