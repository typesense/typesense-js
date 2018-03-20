'use strict'
import axios from 'axios'

const APIKEYHEADERNAME = 'X-TYPESENSE-API-KEY'

class ApiCall {
  constructor (configuration) {
    this._configuration = configuration
    this._defaultNode = 'master'
    this._defaultNodeIndex = 0
  }

  _uriFor (endpoint, node = this._defaultNode, nodeIndex = this._defaultNodeIndex) {
    if (node === 'readReplica') {
      return `${this._configuration.readReplicaNodes[nodeIndex].protocol}://${this._configuration.readReplicaNodes[nodeIndex].host}:${this._configuration.readReplicaNodes[nodeIndex].port}${endpoint}`
    } else {
      return `${this._configuration.masterNode.protocol}://${this._configuration.masterNode.host}:${this._configuration.masterNode.port}${endpoint}`
    }
  }

  _apiKey (node = this._defaultNode, nodeIndex = this._defaultNodeIndex) {
    if (node === 'readReplica') {
      return this._configuration.readReplicaNodes[nodeIndex].apiKey
    } else {
      return this._configuration.masterNode.apiKey
    }
  }

  _defaultHeaders (node = this._defaultNode, nodeIndex = this._defaultNodeIndex) {
    let defaultHeaders = {}
    defaultHeaders[APIKEYHEADERNAME] = this._apiKey(node, nodeIndex)
    defaultHeaders['Content-Type'] = 'application/json'
    defaultHeaders['Accept'] = 'application/json'
    return defaultHeaders
  }

  get (endpoint, parameters = {}, node = this._defaultNode, nodeIndex = this._defaultNodeIndex) {
    return this.performRequest('get', endpoint, parameters, undefined, undefined, node, nodeIndex)
  }

  delete (endpoint, parameters = {}, node = this._defaultNode, nodeIndex = this._defaultNodeIndex) {
    return this.performRequest('delete', endpoint, parameters, undefined, undefined, node, nodeIndex)
  }

  post (endpoint, parameters = {}) {
    return this.performRequest('post', endpoint, undefined, parameters, undefined, 'master')
  }

  performRequest (requestType, endpoint, queryParameters = {}, bodyParameters = {}, additionalHeaders = {}, node = this._defaultNode, nodeIndex = this._defaultNodeIndex) {
    this._configuration.validate()

    const requestOptions = {
      method: requestType,
      url: this._uriFor(endpoint, node, nodeIndex),
      headers: Object.assign({}, this._defaultHeaders(node, nodeIndex), additionalHeaders),
      params: queryParameters,
      data: bodyParameters
    }

    return axios(requestOptions)
      .then((response) => {
        return Promise.resolve(response.data)
      })
      .catch((error) => {
        if (requestType === 'get') {
          if (node === 'master' && this._configuration.readReplicaNodes.length > 0) {
            return this.performRequest(requestType, endpoint, queryParameters, bodyParameters, additionalHeaders, 'readReplica', 0)
          } else if (node === 'readReplica') {
            if (nodeIndex >= (this._configuration.readReplicaNodes.length - 1)) {
              // error, but we'll let the code outside the if...else return the error
            } else {
              return this.performRequest(requestType, endpoint, queryParameters, bodyParameters, additionalHeaders, node, nodeIndex + 1)
            }
          }
        }

        let responseMessage = ''
        if (error.response !== undefined) {
          responseMessage = ` - ${error.response.request.path} - ${error.response.data.message}`
        }
        return Promise.reject(new Error(`${error.message}${responseMessage}`))
      })
  }
}

module.exports = ApiCall
