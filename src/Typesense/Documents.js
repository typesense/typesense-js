'use strict'

import Collections from './Collections'

const RESOURCEPATH = '/documents'

export default class Documents {
  constructor (collectionName, apiCall) {
    this._collectionName = collectionName
    this._apiCall = apiCall
  }

  create (document, options = {}) {
    return this._apiCall.post(this._endpointPath(), document, options)
  }

  async createMany (documents, options = {}) {
    let documentsInJSONLFormat = documents.map(document => JSON.stringify(document)).join('\n')
    let resultsInJSONLFormat = await this.import(documentsInJSONLFormat, options)
    return resultsInJSONLFormat.split('\n').map(r => JSON.parse((r)))
  }

  import (documentsInJSONLFormat, options = {}) {
    return this._apiCall.performRequest(
      'post',
      this._endpointPath('import'),
      {
        queryParameters: options,
        bodyParameters: documentsInJSONLFormat,
        additionalHeaders: {'Content-Type': 'text/plain'}
      }
    )
  }

  export () {
    return this._apiCall.get(this._endpointPath('export'))
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
