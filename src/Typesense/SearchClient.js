'use strict'

import Configuration from './Configuration'
import ApiCall from './ApiCall'
import Collection from './Collection'

export default class SearchClient {
  constructor (options) {
    this.configuration = new Configuration(options)
    this._apiCall = new ApiCall(this.configuration)
    this._individualCollections = {}
  }

  collections (collectionName) {
    if (collectionName === undefined) {
      throw new Error('Typesense.SearchClient only supports search operations, so the collectionName that needs to ' +
        'be searched must be specified. Use Typesense.Client if you need to access the collection object.')
    } else {
      if (this._individualCollections[collectionName] === undefined) {
        this._individualCollections[collectionName] = new Collection(collectionName, this._apiCall)
      }
      return this._individualCollections[collectionName]
    }
  }
}
