'use strict'

import logger from 'loglevel'

class Configuration {
  constructor (options = {}) {
    this.nodes = options.nodes || []
    this.nodes = this.nodes.map((node) => {
      if (!node.hasOwnProperty('path')) {
        node.path = ''
      }
      return node
    })
    this.connectionTimeoutSeconds = options.connectionTimeoutSeconds || options.timeoutSeconds || 10
    this.healthcheckIntervalSeconds = options.healthcheckIntervalSeconds || 15
    this.numRetries = options.numRetries || this.nodes.length || 3
    this.retryIntervalSeconds = options.retryIntervalSeconds || 0.1
    this.apiKey = options.apiKey

    this.logger = options.logger || logger
    this.logLevel = options.logLevel || 'warn'
    this.logger.setLevel(this.logLevel)

    this._showDeprecationWarnings(options)
    this.validate()
  }

  validate () {
    if (this.nodes == null || this.nodes.length === 0 || this._validateNodes()) {
      throw new Error('Missing required configuration. Ensure that nodes[].protocol, nodes[].host and nodes[].port are set.')
    }

    if (this.apiKey == null) {
      throw new Error('Missing required configuration. Ensure that apiKey is set.')
    }
  }

  _validateNodes () {
    return this.nodes.some((node) => {
      return this._isNodeMissingAnyParameters(node)
    })
  }

  _isNodeMissingAnyParameters (node) {
    return !['protocol', 'host', 'port', 'path'].every((key) => {
      return node.hasOwnProperty(key)
    })
  }

  _showDeprecationWarnings (options) {
    if (options.timeoutSeconds) {
      this._logger.warn('Deprecation warning: timeoutSeconds is now renamed to connectionTimeoutSeconds')
    }
    if (options.masterNode) {
      this._logger.warn('Deprecation warning: masterNode is now consolidated to nodes, starting with Typesense Server v0.12')
    }
    if (options.readReplicaNodes) {
      this._logger.warn('Deprecation warning: readReplicaNodes is now consolidated to nodes, starting with Typesense Server v0.12')
    }
  }
}

module.exports = Configuration
