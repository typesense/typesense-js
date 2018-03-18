'use strict'

import ApiCall from './ApiCall'
import Collections from './Collections'
import Documents from './Documents'

class Document {
  constructor (configuration, collectionName, documentId) {
    this._configuration = configuration
    this._collectionName = collectionName
    this._documentId = documentId
  }

  retrieve () {
    return new ApiCall(this._configuration).get(this._endpointPath())
  }

  delete () {
    return new ApiCall(this._configuration).delete(this._endpointPath())
  }

  _endpointPath () {
    return `${Collections.RESOURCEPATH}/${this._collectionName}${Documents.RESOURCEPATH}/${this._documentId}`
  }
}

module.exports = Document
