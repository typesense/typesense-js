'use strict'

export default class RequestWithCache {
  constructor () {
    this._responseCache = {}
  }

  async perform (requestContext, requestFunction, requestFunctionArguments, {cacheResponseForSeconds = 2 * 60} = {}) {
    // Don't store any responses if cache is disabled
    if (cacheResponseForSeconds <= 0) {
      return requestFunction.call(requestContext, ...requestFunctionArguments)
    }

    const requestFunctionArgumentsJSON = JSON.stringify(requestFunctionArguments)
    const cacheEntry = this._responseCache[requestFunctionArgumentsJSON]
    if (cacheEntry) {
      if (Date.now() - cacheEntry.requestTimestamp < cacheResponseForSeconds * 1000) {
        // Cache entry is still valid, return it
        return Promise.resolve(cacheEntry.response)
      } else {
        // Cache entry has expired, so delete it explicitly
        delete this._responseCache[requestFunctionArgumentsJSON]
      }
    }
    const response = await requestFunction.call(requestContext, ...requestFunctionArguments)
    this._responseCache[requestFunctionArgumentsJSON] = {
      requestTimestamp: Date.now(),
      response
    }
    return response
  }
}
