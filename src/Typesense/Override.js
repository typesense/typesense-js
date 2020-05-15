'use strict'

import Collections from './Collections'
import Overrides from './Overrides'

class Override {
  constructor (collectionName, overrideId, apiCall) {
    this._collectionName = collectionName
    this._overrideId = overrideId
    this._apiCall = apiCall
  }

  retrieve () {
    return this._apiCall.get(this._endpointPath())
  }

  delete () {
    return this._apiCall.delete(this._endpointPath())
  }

  _endpointPath () {
    return `${Collections.RESOURCEPATH}/${this._collectionName}${Overrides.RESOURCEPATH}/${this._overrideId}`
  }
}

module.exports = Override
