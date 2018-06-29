'use strict'

class Configuration {
  constructor (options = {}) {
    this.masterNode = options.masterNode || {
      host: 'localhost',
      port: '8108',
      path: '',
      protocol: 'http'
    }

    this.readReplicaNodes = options.readReplicaNodes || []
    this.timeoutSeconds = options.timeoutSeconds || 10
  }

  validate () {
    if (this._isNodeMissingAnyParameters(this.masterNode)) {
      throw new Error('Missing required parameters in masterNode')
    }

    if (this._validateReadReplicaNodes()) {
      throw new Error('Missing required parameters in one of readReplicaNodes')
    }
  }

  _validateReadReplicaNodes () {
    return this.readReplicaNodes.some((node) => {
      return this._isNodeMissingAnyParameters(node)
    })
  }

  _isNodeMissingAnyParameters (node) {
    return !['protocol', 'host', 'port', 'path', 'apiKey'].every((key) => {
      return node.hasOwnProperty(key)
    })
  }
}

module.exports = Configuration
