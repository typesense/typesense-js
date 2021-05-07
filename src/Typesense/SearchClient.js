'use strict'

import Configuration from './Configuration'
import ApiCall from './ApiCall'
import Collection from './Collection'
import MultiSearch from './MultiSearch'

export default class SearchClient {
  constructor (options) {
    options = options || {}

    // In v0.20.0 we restrict query params to 2000 in length
    // But sometimes scoped API keys can be over this limit, so we send long keys as headers instead.
    // The tradeoff is that using a header to send the API key will trigger the browser to send an OPTIONS request though.
    if ((options['apiKey'] || '').length < 2000) {
      options['sendApiKeyAsQueryParam'] = true
    }

    this.configuration = new Configuration(options)
    this._apiCall = new ApiCall(this.configuration)
    this.multiSearch = new MultiSearch(this._apiCall, this.configuration, true)
    this._individualCollections = {}
  }

  collections (collectionName) {
    if (collectionName === undefined) {
      throw new Error('Typesense.SearchClient only supports search operations, so the collectionName that needs to ' +
        'be searched must be specified. Use Typesense.Client if you need to access the collection object.')
    } else {
      if (this._individualCollections[collectionName] === undefined) {
        this._individualCollections[collectionName] = new Collection(collectionName, this._apiCall, this.configuration)
      }
      return this._individualCollections[collectionName]
    }
  }
}
