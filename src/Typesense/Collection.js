'use strict'

import Collections from './Collections'
import Documents from './Documents'
import Document from './Document'
import Overrides from './Overrides'
import Override from './Override'
import Synonyms from './Synonyms'
import Synonym from './Synonym'

export default class Collection {
  constructor (name, apiCall, configuration) {
    this._name = name
    this._apiCall = apiCall
    this._configuration = configuration

    this._documents = new Documents(this._name, this._apiCall, this._configuration)
    this._individualDocuments = {}
    this._overrides = new Overrides(this._name, this._apiCall)
    this._individualOverrides = {}
    this._synonyms = new Synonyms(this._name, this._apiCall)
    this._individualSynonyms = {}
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

  synonyms (synonymId) {
    if (synonymId === undefined) {
      return this._synonyms
    } else {
      if (this._individualSynonyms[synonymId] === undefined) {
        this._individualSynonyms[synonymId] = new Synonym(this._name, synonymId, this._apiCall)
      }
      return this._individualSynonyms[synonymId]
    }
  }

  _endpointPath () {
    return `${Collections.RESOURCEPATH}/${this._name}`
  }
}
