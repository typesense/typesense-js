'use strict'

import ApiCall from './ApiCall'
import Collections from './Collections'
import Overrides from './Overrides'

class Override {
  constructor (configuration, collectionName, overrideId) {
    this._configuration = configuration
    this._collectionName = collectionName
    this._overrideId = overrideId
  }

  retrieve () {
    return new ApiCall(this._configuration).get(this._endpointPath())
  }

  delete () {
    return new ApiCall(this._configuration).delete(this._endpointPath())
  }

  _endpointPath () {
    return `${Collections.RESOURCEPATH}/${this._collectionName}${Overrides.RESOURCEPATH}/${this._overrideId}`
  }
}

module.exports = Override
