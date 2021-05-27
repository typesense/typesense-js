export default class RequestWithCache {
  private responseCache: Record<string, any> = {}

  // Todo: should probably be passed a callback instead, or an apiCall instance. Types are messy this way
  // Todo: cache is only cleared upon a subsequent - identical - call. add a timeout for other cases
  // Todo: instead of specifying how long to cache a response for, i think it makes more sense to set a maxAge
  async perform<T extends any>(
    requestContext: any,
    requestFunction: (...params: any) => unknown,
    requestFunctionArguments: any[],
    {
      cacheResponseForSeconds = 2 * 60
    }: {
      cacheResponseForSeconds: number
    }
  ): Promise<T> {
    // Don't store any responses if cache is disabled

    // Todo: this still leaves an older cache in-tact. Is that desirable? Might as well update or delete it?
    if (cacheResponseForSeconds <= 0) {
      return requestFunction.call(requestContext, ...requestFunctionArguments)
    }

    const requestFunctionArgumentsJSON = JSON.stringify(requestFunctionArguments)
    const cacheEntry = this.responseCache[requestFunctionArgumentsJSON]
    if (cacheEntry) {
      if (Date.now() - cacheEntry.requestTimestamp < cacheResponseForSeconds * 1000) {
        // Cache entry is still valid, return it
        return Promise.resolve(cacheEntry.response)
      } else {
        // Cache entry has expired, so delete it explicitly
        delete this.responseCache[requestFunctionArgumentsJSON]
      }
    }
    const response = await requestFunction.call(requestContext, ...requestFunctionArguments)
    this.responseCache[requestFunctionArgumentsJSON] = {
      requestTimestamp: Date.now(),
      response
    }
    return response as T
  }
}
