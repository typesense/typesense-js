'use strict'

import Collections from './Collections'
import Documents from './Documents'

export default class Document {
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

  update (partialDocument, options = {}) {
    return this._apiCall.patch(this._endpointPath(), partialDocument, options)
  }

  _endpointPath () {
    return `${Collections.RESOURCEPATH}/${this._collectionName}${Documents.RESOURCEPATH}/${this._documentId}`
  }
}
