'use strict'

import ApiCall from './ApiCall'
import Collections from './Collections'

const RESOURCEPATH = '/documents'

class Documents {
  constructor (configuration, collectionName) {
    this._configuration = configuration
    this._collectionName = collectionName
  }

  search (searchParameters) {
    return (new ApiCall(this._configuration)).get(this._endpointPath('search'), searchParameters)
  }

  _endpointPath (operation) {
    return `${Collections.RESOURCEPATH}/${this._collectionName}${Documents.RESOURCEPATH}${operation === undefined ? '' : '/' + operation}`
  }

  static get RESOURCEPATH () {
    return RESOURCEPATH
  }
}

module.exports = Documents
