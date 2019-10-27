'use strict'

import Configuration from './Configuration'
import Collections from './Collections'
import Collection from './Collection'
import Aliases from './Aliases'
import Alias from './Alias'
import Debug from './Debug'

class Client {
  constructor (options) {
    this.configuration = new Configuration(options)
    this.debug = new Debug(this.configuration)
    this._collections = new Collections(this.configuration)
    this._individualCollections = {}
    this._aliases = new Aliases(this.configuration)
    this._individualAliases = {}
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

  aliases (aliasName) {
    if (aliasName === undefined) {
      return this._aliases
    } else {
      if (this._individualAliases[aliasName] === undefined) {
        this._individualAliases[aliasName] = new Alias(this.configuration, aliasName)
      }
      return this._individualAliases[aliasName]
    }
  }
}

module.exports = Client
