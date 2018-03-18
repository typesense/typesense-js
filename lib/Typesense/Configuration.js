'use strict'

class Configuration {
  constructor (options = {}) {
    this.masterNode = options.masterNode || {
      host: 'localhost',
      port: '8108',
      protocol: 'http'
    }

    this.readReplicaNodes = options.readReplicaNodes || []
    this.timeoutSeconds = options.timeoutSeconds || 10
  }

  validate () {
    if (this.masterNode === null || this._isNodeMissingAnyParameters(this.masterNode)) {
      throw new Error('Missing required parameters in masterNode')
    }

    if (this.readReplicaNodes === null || this._validateReadReplicaNodes()) {
      throw new Error('Missing required parameters in masterNode')
    }
  }

  _validateReadReplicaNodes () {
    return this.readReplicaNodes.some((node) => {
      this._isNodeMissingAnyParameters(node)
    })
  }

  _isNodeMissingAnyParameters (node) {
    ['protocol', 'host', 'port', 'api_key'].every((key) => {
      node.hasOwnProperty(key)
    })
  }
}

module.exports = Configuration
