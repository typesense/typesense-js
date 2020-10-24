'use strict'

import Collections from './Collections'

const RESOURCEPATH = '/documents'

export default class Documents {
  constructor (collectionName, apiCall) {
    this._collectionName = collectionName
    this._apiCall = apiCall
  }

  create (document) {
    return this._apiCall.post(this._endpointPath(), document)
  }

  upsert (document) {
    return this._apiCall.post(this._endpointPath(), document, {mode: 'upsert'})
  }

  update (document) {
    return this._apiCall.post(this._endpointPath(), document, {mode: 'update'})
  }

  async createMany (documents, options = {}) {
    this._apiCall.logger.warn('createMany is deprecated and will be removed in a future version. Use import instead, which now takes both an array of documents or a JSONL string of documents')
    let documentsInJSONLFormat = documents.map(document => JSON.stringify(document)).join('\n')
    let resultsInJSONLFormat = await this.import(documentsInJSONLFormat, options)
    return resultsInJSONLFormat.split('\n').map(r => JSON.parse((r)))
  }

  /**
   * Import a set of documents in a batch.
   * @param {string|Array} documents - Can be a JSONL string of documents or an array of document objects.
   * @return {string|Array} Returns a JSONL string if the input was a JSONL string, otherwise it returns an array of results.
   */
  async import (documents, options = {}) {
    let documentsInJSONLFormat
    if (Array.isArray(documents)) {
      documentsInJSONLFormat = documents.map(document => JSON.stringify(document)).join('\n')
    } else {
      documentsInJSONLFormat = documents
    }

    const resultsInJSONLFormat = await this._apiCall.performRequest(
      'post',
      this._endpointPath('import'),
      {
        queryParameters: options,
        bodyParameters: documentsInJSONLFormat,
        additionalHeaders: {'Content-Type': 'text/plain'}
      }
    )

    if (Array.isArray(documents)) {
      return resultsInJSONLFormat.split('\n').map(r => JSON.parse((r)))
    } else {
      return resultsInJSONLFormat
    }
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
