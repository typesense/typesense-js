'use strict'

import Collections from './Collections'
import Documents from './Documents'
import Document from './Document'
import Overrides from './Overrides'
import Override from './Override'

class Collection {
  constructor (name, apiCall) {
    this._name = name
    this._apiCall = apiCall
    this._documents = new Documents(this._name, this._apiCall)
    this._individualDocuments = {}
    this._overrides = new Overrides(this._name, this._apiCall)
    this._individualOverrides = {}
  }

  retrieve () {
    return this._apiCall.get(this._endpointPath())
  }

  delete () {
    return this._apiCall.delete(this._endpointPath())
  }

  documents (documentId) {
    if (documentId === undefined) {
      return this._documents
    } else {
      if (this._individualDocuments[documentId] === undefined) {
        this._individualDocuments[documentId] = new Document(this._name, documentId, this._apiCall)
      }
      return this._individualDocuments[documentId]
    }
  }

  overrides (overrideId) {
    if (overrideId === undefined) {
      return this._overrides
    } else {
      if (this._individualOverrides[overrideId] === undefined) {
        this._individualOverrides[overrideId] = new Override(this._name, overrideId, this._apiCall)
      }
      return this._individualOverrides[overrideId]
    }
  }

  _endpointPath () {
    return `${Collections.RESOURCEPATH}/${this._name}`
  }
}

module.exports = Collection
