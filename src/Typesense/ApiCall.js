'use strict'
import axios from 'axios'

const APIKEYHEADERNAME = 'X-TYPESENSE-API-KEY'
const HEALTHY = true
const UNHEALTHY = false

export default class ApiCall {
  constructor (configuration) {
    this._configuration = configuration

    this._apiKey = this._configuration.apiKey
    this._nodes = JSON.parse(JSON.stringify(this._configuration.nodes)) // Make a copy, since we'll be adding additional metadata to the nodes
    this._nearestNode = JSON.parse(JSON.stringify(this._configuration.nearestNode))
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

    const requestNumber = Date.now()
    let lastException
    this._logger.debug(`Request #${requestNumber}: Performing ${requestType.toUpperCase()} request: ${endpoint}`)
    for (let numTries = 1; numTries <= this._numRetriesPerRequest + 1; numTries++) {
      let node = this._getNextNode(requestNumber)
      this._logger.debug(`Request #${requestNumber}: Attempting ${requestType.toUpperCase()} request Try #${numTries} to Node ${node.index}`)
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

        this._logger.debug(`Request #${requestNumber}: Request to Node ${node.index} was successfully made. Response Code was ${response.status}.`)

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
        this._logger.warn(`Request #${requestNumber}: Request to Node ${node.index} failed due to "${error.code} ${error.message}${error.response == null ? '' : ' - ' + JSON.stringify(error.response.data)}"`)
        // this._logger.debug(error.stack)
        this._logger.warn(`Request #${requestNumber}: Sleeping for ${this._retryIntervalSeconds}s and then retrying request...`)
        await this._timer(this._retryIntervalSeconds)
      }
    }
    this._logger.debug(`Request #${requestNumber}: No retries left. Raising last error`)
    return Promise.reject(lastException)
  }

  // Attempts to find the next healthy node, looping through the list of nodes once.
  //   But if no healthy nodes are found, it will just return the next node, even if it's unhealthy
  //     so we can try the request for good measure, in case that node has become healthy since
  _getNextNode (requestNumber = 0) {
    // Check if nearestNode is set and is healthy, if so return it
    if (this._nearestNode != null) {
      this._logger.debug(`Request #${requestNumber}: Nodes Health: Node ${this._nearestNode.index} is ${this._nearestNode.isHealthy === true ? 'Healthy' : 'Unhealthy'}`)
      if (this._nearestNode.isHealthy === true || this._nodeDueForHealthcheck(this._nearestNode, requestNumber)) {
        this._logger.debug(`Request #${requestNumber}: Updated current node to Node ${this._nearestNode.index}`)
        return this._nearestNode
      }
      this._logger.debug(`Request #${requestNumber}: Falling back to individual nodes`)
    }

    // Fallback to nodes as usual
    this._logger.debug(`Request #${requestNumber}: Nodes Health: ${this._nodes.map(node => `Node ${node.index} is ${node.isHealthy === true ? 'Healthy' : 'Unhealthy'}`).join(' || ')}`)
    let candidateNode
    for (let i = 0; i <= this._nodes.length; i++) {
      this._currentNodeIndex = (this._currentNodeIndex + 1) % this._nodes.length
      candidateNode = this._nodes[this._currentNodeIndex]
      if (candidateNode.isHealthy === true || this._nodeDueForHealthcheck(candidateNode, requestNumber)) {
        this._logger.debug(`Request #${requestNumber}: Updated current node to Node ${candidateNode.index}`)
        return candidateNode
      }
    }

    // None of the nodes are marked healthy, but some of them could have become healthy since last health check.
    //  So we will just return the next node.
    this._logger.debug(`Request #${requestNumber}: No healthy nodes were found. Returning the next node, Node ${candidateNode.index}`)
    return candidateNode
  }

  _nodeDueForHealthcheck (node, requestNumber = 0) {
    const isDueForHealthcheck = Date.now() - node.lastAccessTimestamp > (this._healthcheckIntervalSeconds * 1000)
    if (isDueForHealthcheck) {
      this._logger.debug(`Request #${requestNumber}: Node ${node.index} has exceeded healtcheckIntervalSeconds of ${this._healthcheckIntervalSeconds}. Adding it back into rotation.`)
    }
    return isDueForHealthcheck
  }

  _initializeMetadataForNodes () {
    if (this._nearestNode != null) {
      this._nearestNode.index = 'nearestNode'
      this._setNodeHealthcheck(this._nearestNode, HEALTHY)
    }

    this._nodes.forEach((node, i) => {
      node.index = i
      this._setNodeHealthcheck(node, HEALTHY)
    })
  }

  _setNodeHealthcheck (node, isHealthy) {
    node.isHealthy = isHealthy
    node.lastAccessTimestamp = Date.now()
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
