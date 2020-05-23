'use strict'

import Collections from './Collections'
import Documents from './Documents'

class Document {
  constructor (collectionName, documentId, apiCall) {
    this._collectionName = collectionName
    this._documentId = documentId
    this._apiCall = apiCall
  }

  retrieve () {
    return this._apiCall.get(this._endpointPath())
  }

  delete () {
    return this._apiCall.delete(this._endpointPath())
  }

  _endpointPath () {
    return `${Collections.RESOURCEPATH}/${this._collectionName}${Documents.RESOURCEPATH}/${this._documentId}`
  }
}

module.exports = Document
