'use strict'
import axios from 'axios'
import {
  HTTPError,
  ObjectAlreadyExists,
  ObjectNotFound,
  ObjectUnprocessable,
  RequestMalformed,
  RequestUnauthorized,
  ServerError
} from './Errors'

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
    this._sendApiKeyAsQueryParam = this._configuration.sendApiKeyAsQueryParam

    this.logger = this._configuration.logger

    this._initializeMetadataForNodes()
    this._currentNodeIndex = -1
  }

  get (endpoint, queryParameters = {}) {
    return this.performRequest('get', endpoint, {queryParameters})
  }

  delete (endpoint, queryParameters = {}) {
    return this.performRequest('delete', endpoint, {queryParameters})
  }

  post (endpoint, bodyParameters = {}, queryParameters = {}, additionalHeaders = {}) {
    return this.performRequest('post', endpoint, {queryParameters, bodyParameters, additionalHeaders})
  }

  put (endpoint, bodyParameters = {}, queryParameters = {}) {
    return this.performRequest('put', endpoint, {queryParameters, bodyParameters})
  }

  patch (endpoint, bodyParameters = {}, queryParameters = {}) {
    return this.performRequest('patch', endpoint, {queryParameters, bodyParameters})
  }

  async performRequest (requestType, endpoint, {
    queryParameters = null,
    bodyParameters = null,
    additionalHeaders = {}
  }) {
    this
      ._configuration
      .validate()

    const requestNumber = Date.now()
    let lastException
    this.logger.debug(`Request #${requestNumber}: Performing ${requestType.toUpperCase()} request: ${endpoint}`)
    for (let numTries = 1; numTries <= this._numRetriesPerRequest + 1; numTries++) {
      let node = this._getNextNode(requestNumber)
      this.logger.debug(`Request #${requestNumber}: Attempting ${requestType.toUpperCase()} request Try #${numTries} to Node ${node.index}`)
      try {
        let requestOptions = {
          method: requestType,
          url: this._uriFor(endpoint, node),
          headers: Object.assign({}, this._defaultHeaders(), additionalHeaders),
          timeout: this._connectionTimeoutSeconds * 1000,
          maxContentLength: Infinity,
          maxBodyLength: Infinity,
          validateStatus: (status) => {
            /* Override default validateStatus, which only considers 2xx a success.
                In our case, if the server returns any HTTP code, we will handle it below.
                We do this to be able to raise custom errors based on response code.
             */
            return status > 0
          },
          transformResponse: [(data, headers) => {
            let transformedData = data
            if (headers !== undefined && typeof data === 'string' && headers['content-type'].startsWith('application/json')) {
              transformedData = JSON.parse(data)
            }
            return transformedData
          }]
        }

        if (queryParameters && Object.keys(queryParameters).length !== 0) {
          requestOptions.params = queryParameters
        }

        if (this._sendApiKeyAsQueryParam) {
          requestOptions.params = requestOptions.params || {}
          requestOptions.params['x-typesense-api-key'] = this._apiKey
        }

        if (bodyParameters && Object.keys(bodyParameters).length !== 0) {
          requestOptions.data = bodyParameters
        }

        let response = await axios(requestOptions)
        if (response.status >= 1 && response.status <= 499) {
          // Treat any status code > 0 and < 500 to be an indication that node is healthy
          // We exclude 0 since some clients return 0 when request fails
          this._setNodeHealthcheck(node, HEALTHY)
        }
        this.logger.debug(`Request #${requestNumber}: Request to Node ${node.index} was made. Response Code was ${response.status}.`)

        if (response.status >= 200 && response.status < 300) {
          // If response is 2xx return a resolved promise
          return Promise.resolve(response.data)
        } else if (response.status < 500) {
          // Next, if response is anything but 5xx, don't retry, return a custom error
          return Promise.reject(this._customErrorForResponse(response, response.data.message))
        } else {
          // Retry all other HTTP errors (HTTPStatus > 500)
          // This will get caught by the catch block below
          throw this._customErrorForResponse(response, response.data.message)
        }
      } catch (error) {
        // This block handles retries for HTTPStatus > 500 and network layer issues like connection timeouts
        this._setNodeHealthcheck(node, UNHEALTHY)
        lastException = error
        this.logger.warn(`Request #${requestNumber}: Request to Node ${node.index} failed due to "${error.code} ${error.message}${error.response == null ? '' : ' - ' + JSON.stringify(error.response.data)}"`)
        // this.logger.debug(error.stack)
        this.logger.warn(`Request #${requestNumber}: Sleeping for ${this._retryIntervalSeconds}s and then retrying request...`)
        await this._timer(this._retryIntervalSeconds)
      }
    }
    this.logger.debug(`Request #${requestNumber}: No retries left. Raising last error`)
    return Promise.reject(lastException)
  }

  // Attempts to find the next healthy node, looping through the list of nodes once.
  //   But if no healthy nodes are found, it will just return the next node, even if it's unhealthy
  //     so we can try the request for good measure, in case that node has become healthy since
  _getNextNode (requestNumber = 0) {
    // Check if nearestNode is set and is healthy, if so return it
    if (this._nearestNode != null) {
      this.logger.debug(`Request #${requestNumber}: Nodes Health: Node ${this._nearestNode.index} is ${this._nearestNode.isHealthy === true ? 'Healthy' : 'Unhealthy'}`)
      if (this._nearestNode.isHealthy === true || this._nodeDueForHealthcheck(this._nearestNode, requestNumber)) {
        this.logger.debug(`Request #${requestNumber}: Updated current node to Node ${this._nearestNode.index}`)
        return this._nearestNode
      }
      this.logger.debug(`Request #${requestNumber}: Falling back to individual nodes`)
    }

    // Fallback to nodes as usual
    this.logger.debug(`Request #${requestNumber}: Nodes Health: ${this._nodes.map(node => `Node ${node.index} is ${node.isHealthy === true ? 'Healthy' : 'Unhealthy'}`).join(' || ')}`)
    let candidateNode
    for (let i = 0; i <= this._nodes.length; i++) {
      this._currentNodeIndex = (this._currentNodeIndex + 1) % this._nodes.length
      candidateNode = this._nodes[this._currentNodeIndex]
      if (candidateNode.isHealthy === true || this._nodeDueForHealthcheck(candidateNode, requestNumber)) {
        this.logger.debug(`Request #${requestNumber}: Updated current node to Node ${candidateNode.index}`)
        return candidateNode
      }
    }

    // None of the nodes are marked healthy, but some of them could have become healthy since last health check.
    //  So we will just return the next node.
    this.logger.debug(`Request #${requestNumber}: No healthy nodes were found. Returning the next node, Node ${candidateNode.index}`)
    return candidateNode
  }

  _nodeDueForHealthcheck (node, requestNumber = 0) {
    const isDueForHealthcheck = Date.now() - node.lastAccessTimestamp > (this._healthcheckIntervalSeconds * 1000)
    if (isDueForHealthcheck) {
      this.logger.debug(`Request #${requestNumber}: Node ${node.index} has exceeded healtcheckIntervalSeconds of ${this._healthcheckIntervalSeconds}. Adding it back into rotation.`)
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
    if (!this._sendApiKeyAsQueryParam) {
      defaultHeaders[APIKEYHEADERNAME] = this._apiKey
    }
    defaultHeaders['Content-Type'] = 'application/json'
    return defaultHeaders
  }

  async _timer (seconds) {
    return new Promise(resolve => setTimeout(resolve, seconds * 1000))
  }

  _customErrorForResponse (response, messageFromServer) {
    let CustomErrorKlass
    if (response.status === 400) {
      CustomErrorKlass = RequestMalformed
    } else if (response.status === 401) {
      CustomErrorKlass = RequestUnauthorized
    } else if (response.status === 404) {
      CustomErrorKlass = ObjectNotFound
    } else if (response.status === 409) {
      CustomErrorKlass = ObjectAlreadyExists
    } else if (response.status === 422) {
      CustomErrorKlass = ObjectUnprocessable
    } else if (response.status >= 500 && response.status <= 599) {
      CustomErrorKlass = ServerError
    } else {
      CustomErrorKlass = HTTPError
    }

    let errorMessage = `Request failed with HTTP code ${response.status}`
    if (typeof messageFromServer === 'string' && messageFromServer.trim() !== '') {
      errorMessage += ` | Server said: ${messageFromServer}`
    }

    const customErrror = new CustomErrorKlass(errorMessage)
    customErrror.httpStatus = response.status

    return customErrror
  }
}
