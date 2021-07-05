'use strict'

import Collections from './Collections'
import RequestWithCache from './RequestWithCache'
import { ImportError } from './Errors'

const RESOURCEPATH = '/documents'

export default class Documents {
  constructor (collectionName, apiCall, configuration) {
    this._collectionName = collectionName
    this._apiCall = apiCall
    this._configuration = configuration

    this._requestWithCache = new RequestWithCache()
  }

  create (document, options = {}) {
    return this._apiCall.post(this._endpointPath(), document, options)
  }

  upsert (document, options = {}) {
    return this._apiCall.post(this._endpointPath(), document, Object.assign({}, options, {action: 'upsert'}))
  }

  update (document, options = {}) {
    return this._apiCall.post(this._endpointPath(), document, Object.assign({}, options, {action: 'update'}))
  }

  delete (options = {}) {
    return this._apiCall.delete(this._endpointPath(), options)
  }

  async createMany (documents, options = {}) {
    this._apiCall.logger.warn('createMany is deprecated and will be removed in a future version. Use import instead, which now takes both an array of documents or a JSONL string of documents')
    return this.import(documents, options)
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
      const resultsInJSONFormat = resultsInJSONLFormat.split('\n').map(r => JSON.parse((r)))
      const failedItems = resultsInJSONFormat.filter(r => r.success === false)
      if (failedItems.length > 0) {
        throw new ImportError(`${resultsInJSONFormat.length - failedItems.length} documents imported successfully, ${failedItems.length} documents failed during import. Use \`error.importResults\` from the raised exception to get a detailed error reason for each document.`, resultsInJSONFormat)
      } else {
        return resultsInJSONFormat
      }
    } else {
      return resultsInJSONLFormat
    }
  }

  export (options = {}) {
    return this._apiCall.get(this._endpointPath('export'), options)
  }

  search (searchParameters, {cacheSearchResultsForSeconds = this._configuration.cacheSearchResultsForSeconds} = {}) {
    let additionalQueryParams = {}
    if (this._configuration.useServerSideSearchCache === true) {
      additionalQueryParams['use_cache'] = true
    }
    const queryParams = Object.assign({}, searchParameters, additionalQueryParams)

    return this._requestWithCache.perform(
      this._apiCall,
      this._apiCall.get,
      [this._endpointPath('search'), queryParams],
      {cacheResponseForSeconds: cacheSearchResultsForSeconds}
    )
  }

  _endpointPath (operation) {
    return `${Collections.RESOURCEPATH}/${this._collectionName}${Documents.RESOURCEPATH}${operation === undefined ? '' : '/' + operation}`
  }

  static get RESOURCEPATH () {
    return RESOURCEPATH
  }
}
