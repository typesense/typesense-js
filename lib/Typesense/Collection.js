'use strict'

import Documents from './Documents'
import Document from './Document'

class Collection {
  constructor (configuration, name) {
    this._configuration = configuration
    this._name = name
    this._documents = new Documents(this._configuration, this._name)
    this._individualDocuments = {}
  }

  documents (documentId) {
    if (documentId === undefined) {
      return this._documents
    } else {
      if (this._individualDocuments[documentId] === undefined) {
        this._individualDocuments[documentId] = new Document(this.configuration, this._name, documentId)
      }
      return this._individualDocuments[documentId]
    }
  }
}

module.exports = Collection
