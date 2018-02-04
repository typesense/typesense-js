'use strict'

import Collections from './typesense/collections'

class Typesense {
  constructor (configuration) {
    this.__configuration = configuration || {}

    this.__configuration.master_node = this.__configuration.master_node || {
      host: 'localhost',
      port: '8108',
      protocol: 'http'
    }

    this.__configuration.read_replica_nodes = this.__configuration.read_replica_nodes || []

    this.__configuration.timeout = this.__configuration.timeout || 10
  }
}

module.exports = Typesense
