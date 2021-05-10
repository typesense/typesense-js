'use strict'

import logger from 'loglevel'
import {MissingConfigurationError} from './Errors'

export default class Configuration {
  constructor (options = {}) {
    this.nodes = options.nodes || []
    this.nodes = this.nodes
      .map(node => this._setDefaultPathInNode(node))
      .map(node => this._setDefaultPortInNode(node))
    this.nearestNode = options.nearestNode || null
    this.nearestNode = this._setDefaultPathInNode(this.nearestNode)
    this.nearestNode = this._setDefaultPortInNode(this.nearestNode)

    this.connectionTimeoutSeconds = options.connectionTimeoutSeconds || options.timeoutSeconds || 10
    this.healthcheckIntervalSeconds = options.healthcheckIntervalSeconds || 15
    this.numRetries = options.numRetries || this.nodes.length + (this.nearestNode == null ? 0 : 1) || 3
    this.retryIntervalSeconds = options.retryIntervalSeconds || 0.1

    this.apiKey = options.apiKey
    this.sendApiKeyAsQueryParam = options.sendApiKeyAsQueryParam || false

    this.cacheSearchResultsForSeconds = options.cacheSearchResultsForSeconds || 0 // Disable client-side cache by default
    this.useServerSideSearchCache = options.useServerSideSearchCache || false

    this.logger = options.logger || logger
    this.logLevel = options.logLevel || 'warn'
    this.logger.setLevel(this.logLevel)

    this._showDeprecationWarnings(options)
    this.validate()
  }

  validate () {
    if (this.nodes == null || this.nodes.length === 0 || this._validateNodes()) {
      throw new MissingConfigurationError('Ensure that nodes[].protocol, nodes[].host and nodes[].port are set')
    }

    if (this.nearestNode != null && this._isNodeMissingAnyParameters(this.nearestNode)) {
      throw new MissingConfigurationError('Ensure that nearestNodes.protocol, nearestNodes.host and nearestNodes.port are set')
    }

    if (this.apiKey == null) {
      throw new MissingConfigurationError('Ensure that apiKey is set')
    }

    return true
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

  _setDefaultPathInNode (node) {
    if (node != null && !node.hasOwnProperty('path')) {
      node.path = ''
    }
    return node
  }

  _setDefaultPortInNode (node) {
    if (node != null && !node.hasOwnProperty('port') && node.hasOwnProperty('protocol')) {
      switch (node.protocol) {
        case 'https':
          node.port = 443
          break
        case 'http':
          node.port = 80
          break
      }
    }
    return node
  }

  _showDeprecationWarnings (options) {
    if (options.timeoutSeconds) {
      this.logger.warn('Deprecation warning: timeoutSeconds is now renamed to connectionTimeoutSeconds')
    }
    if (options.masterNode) {
      this.logger.warn('Deprecation warning: masterNode is now consolidated to nodes, starting with Typesense Server v0.12')
    }
    if (options.readReplicaNodes) {
      this.logger.warn('Deprecation warning: readReplicaNodes is now consolidated to nodes, starting with Typesense Server v0.12')
    }
  }
}
