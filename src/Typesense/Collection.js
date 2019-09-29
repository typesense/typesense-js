'use strict'

import Collections from './Collections'
import Documents from './Documents'
import Document from './Document'
import Overrides from './Overrides'
import Override from './Override'
import ApiCall from './ApiCall'

class Collection {
  constructor (configuration, name) {
    this._configuration = configuration
    this._name = name
    this._documents = new Documents(this._configuration, this._name)
    this._individualDocuments = {}
    this._overrides = new Overrides(this._configuration, this._name)
    this._individualOverrides = {}
  }

  retrieve () {
    return new ApiCall(this._configuration).get(this._endpointPath())
  }

  delete () {
    return new ApiCall(this._configuration).delete(this._endpointPath())
  }

  documents (documentId) {
    if (documentId === undefined) {
      return this._documents
    } else {
      if (this._individualDocuments[documentId] === undefined) {
        this._individualDocuments[documentId] = new Document(this._configuration, this._name, documentId)
      }
      return this._individualDocuments[documentId]
    }
  }

  overrides (overrideId) {
    if (overrideId === undefined) {
      return this._overrides
    } else {
      if (this._individualOverrides[overrideId] === undefined) {
        this._individualOverrides[overrideId] = new Override(this._configuration, this._name, overrideId)
      }
      return this._individualOverrides[overrideId]
    }
  }

  _endpointPath () {
    return `${Collections.RESOURCEPATH}/${this._name}`
  }
}

module.exports = Collection
