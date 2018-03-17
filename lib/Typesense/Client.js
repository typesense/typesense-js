'use strict'

import Collections from './Collections'
import Documents from './Documents'
import ApiCall from './ApiCall'

class Client {
  constructor (configuration) {
    this._configuration = configuration || {}

    this._configuration.masterNode = this._configuration.masterNode || {
      host: 'localhost',
      port: '8108',
      protocol: 'http'
    }

    this._configuration.readReplicaNodes = this._configuration.readReplicaNodes || []
    this._configuration.timeout = this._configuration.timeout || 10
    this.Collections = new Collections(this._configuration)
    this.Documents = new Documents(this._configuration)
    this.ApiCall = new ApiCall(this._configuration)
  }
}

module.exports = Client
