'use strict'
import axios from 'axios'

const APIKEYHEADERNAME = 'X-TYPESENSE-API-KEY'
const HEALTHY = true
const UNHEALTHY = false

class ApiCall {
  constructor (configuration) {
    this._configuration = configuration

    this._apiKey = this._configuration.apiKey
    this._nodes = JSON.parse(JSON.stringify(this._configuration.nodes)) // Make a copy, since we'll be adding additional metadata to the nodes
    this._distributedSearchNode = JSON.parse(JSON.stringify(this._configuration.distributedSearchNode))
    this._connectionTimeoutSeconds = this._configuration.connectionTimeoutSeconds
    this._healthcheckIntervalSeconds = this._configuration.healthcheckIntervalSeconds
    this._numRetriesPerRequest = this._configuration.numRetries
    this._retryIntervalSeconds = this._configuration.retryIntervalSeconds

    this._logger = this._configuration.logger

    this._initializeMetadataForNodes()
    this._currentNodeIndex = -1
  }

  get (endpoint, parameters = {}) {
    return this.performRequest('get', endpoint, parameters)
  }

  delete (endpoint, parameters = {}) {
    return this.performRequest('delete', endpoint, parameters)
  }

  post (endpoint, parameters = {}) {
    return this.performRequest('post', endpoint, undefined, parameters)
  }

  put (endpoint, parameters = {}) {
    return this.performRequest('put', endpoint, undefined, parameters)
  }

  async performRequest (requestType, endpoint, queryParameters = {}, bodyParameters = {}, additionalHeaders = {}) {
    this
      ._configuration
      .validate()

    let lastException

    this._logger.debug(`Performing ${requestType.toUpperCase()} request: ${endpoint}`)
    for (let numTries = 1; numTries <= this._numRetriesPerRequest + 1; numTries++) {
      let node = this._getNextNode()
      this._logger.debug(`Attempting ${requestType.toUpperCase()} request Try #${numTries} to Node ${node.index}`)
      try {
        const requestOptions = {
          method: requestType,
          url: this._uriFor(endpoint, node),
          headers: Object.assign({}, this._defaultHeaders(), additionalHeaders),
          params: queryParameters,
          data: bodyParameters,
          timeout: this._connectionTimeoutSeconds * 1000,
          validateStatus: (status) => {
            /* Override default validateStatus, which only considers 2xx a success.
                In our case, anything below 500 should be considered a "success" and not retried.
                We will handle anything not 2xx, but below 500 as a custom exception below.
             */
            return status > 0 && status < 500
          },
          transformResponse: [(data, headers) => {
            let transformedData = data
            if (headers !== undefined && typeof data === 'string' && headers['content-type'].startsWith('application/json')) {
              transformedData = JSON.parse(data)
            }
            return transformedData
          }]
        }

        let response = await axios(requestOptions)
        this._setNodeHealthcheck(node, HEALTHY)

        this._logger.debug(`Request to Node ${node.index} was successfully made. Response Code was ${response.status}.`)

        // If response is 2xx return a resolved promise, else reject
        if (response.status >= 200 && response.status < 300) {
          return Promise.resolve(response.data)
        } else {
          return Promise.reject(new Error(`${response.request.path} - ${response.data.message}`))
        }
      } catch (error) {
        // This block handles HTTPStatus < 0, HTTPStatus > 500 and network layer issues like connection timeouts
        this._setNodeHealthcheck(node, UNHEALTHY)
        lastException = error
        this._logger.warn(`Request to Node ${node.index} failed due to "${error.code} ${error.message}${error.response == null ? '' : ' - ' + JSON.stringify(error.response.data)}"`)
        // this._logger.debug(error.stack)
        this._logger.warn(`Sleeping for ${this._retryIntervalSeconds}s and then retrying request...`)
        await this._timer(this._retryIntervalSeconds)
      }
    }
    this._logger.debug(`No retries left. Raising last error`)
    return Promise.reject(lastException)
  }

  _getNextNode () {
    let candidateNode

    // Check if distributedSearchNode is set and is healthy, if so return it
    if (this._distributedSearchNode != null) {
      candidateNode = this._distributedSearchNode
      this._resetNodeHealthcheckIfExpired(candidateNode)
      this._logger.debug(`Nodes Health: Node ${candidateNode.index} is ${candidateNode.isHealthy === true ? 'Healthy' : 'Unhealthy'}`)
      if (candidateNode.isHealthy === true) {
        this._logger.debug(`Updated current node to Node ${candidateNode.index}`)
        return candidateNode
      } else {
        this._logger.debug(`Falling back to individual nodes`)
      }
    }

    // Fallback to nodes as usual
    this._logger.debug(`Nodes Health: ${this._nodes.map(node => `Node ${node.index} is ${node.isHealthy === true ? 'Healthy' : 'Unhealthy'}`).join(' || ')}`)
    let candidateNodeIndex = this._currentNodeIndex
    candidateNode = this._nodes[candidateNodeIndex]
    for (let i = 0; i <= this._nodes.length; i++) {
      candidateNodeIndex = (candidateNodeIndex + 1) % this._nodes.length
      candidateNode = this._nodes[candidateNodeIndex]
      this._resetNodeHealthcheckIfExpired(candidateNode)
      if (candidateNode.isHealthy === true) {
        break
      }
      if (i === this._nodes.length) {
        this._logger.debug(`No healthy nodes were found. Returning the next node, Node ${candidateNode.index}`)
      }
    }
    this._currentNodeIndex = candidateNodeIndex
    this._logger.debug(`Updated current node to Node ${candidateNode.index}`)
    return candidateNode
  }

  _resetNodeHealthcheckIfExpired (node) {
    // this._logger.debug(`Checking if Node ${node.index} healthcheck needs to be reset`)
    if (node.isHealthy === true || Date.now() - node.lastHealthcheckTimestamp < (this._healthcheckIntervalSeconds * 1000)) {
      // this._logger.debug(`Healthcheck reset not required for Node ${node.index}. It is currently marked as ${node.isHealthy === true ? 'Healthy' : 'Unhealthy'}. Difference between current time and last healthcheck timestamp is ${Date.now() - node.lastHealthcheckTimestamp}`)
      return null
    }

    this._logger.debug(`Node ${node.index} has exceeded healthcheckIntervalSeconds of ${this._healthcheckIntervalSeconds}s. Adding it back into rotation.`)
    this._setNodeHealthcheck(node, HEALTHY)
    this._logger.debug(`Nodes Health: ${this._nodes.map(node => `Node ${node.index} is ${node.isHealthy === true ? 'Healthy' : 'Unhealthy'}`).join(' || ')}`)
  }

  _initializeMetadataForNodes () {
    if (this._distributedSearchNode != null) {
      let node = this._distributedSearchNode
      node.index = 'DistributedSearch'
      this._setNodeHealthcheck(node, HEALTHY)
    }

    this._nodes.forEach((node, i) => {
      node.index = i
      this._setNodeHealthcheck(node, HEALTHY)
    })
  }

  _setNodeHealthcheck (node, isHealthy) {
    node.isHealthy = isHealthy
    node.lastHealthcheckTimestamp = Date.now()
  }

  _uriFor (endpoint, node) {
    return `${node.protocol}://${node.host}:${node.port}${node.path}${endpoint}`
  }

  _defaultHeaders () {
    let defaultHeaders = {}
    defaultHeaders[APIKEYHEADERNAME] = this._apiKey
    defaultHeaders['Content-Type'] = 'application/json'
    return defaultHeaders
  }

  async _timer (seconds) {
    return new Promise(resolve => setTimeout(resolve, seconds * 1000))
  }
}

module.exports = ApiCall
