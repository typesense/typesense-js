'use strict'

import Configuration from './Configuration'
import Collections from './Collections'
import Collection from './Collection'
import Debug from './Debug'

class Client {
  constructor (options) {
    this.configuration = new Configuration(options)
    this.debug = new Debug(this.configuration)
    this._collections = new Collections(this.configuration)
    this._individualCollections = {}
  }

  collections (collectionName) {
    if (collectionName === undefined) {
      return this._collections
    } else {
      if (this._individualCollections[collectionName] === undefined) {
        this._individualCollections[collectionName] = new Collection(this.configuration, collectionName)
      }
      return this._individualCollections[collectionName]
    }
  }
}

module.exports = Client
