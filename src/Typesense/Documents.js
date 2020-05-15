'use strict'

import Collections from './Collections'

const RESOURCEPATH = '/documents'

class Documents {
  constructor (collectionName, apiCall) {
    this._collectionName = collectionName
    this._apiCall = apiCall
  }

  create (document) {
    return this._apiCall.post(this._endpointPath(), document)
  }

  export () {
    return this._apiCall.get(this._endpointPath('export')).then((result) => {
      return Promise.resolve(result.split('\n'))
    })
  }

  search (searchParameters) {
    return this._apiCall.get(this._endpointPath('search'), searchParameters)
  }

  _endpointPath (operation) {
    return `${Collections.RESOURCEPATH}/${this._collectionName}${Documents.RESOURCEPATH}${operation === undefined ? '' : '/' + operation}`
  }

  static get RESOURCEPATH () {
    return RESOURCEPATH
  }
}

module.exports = Documents
