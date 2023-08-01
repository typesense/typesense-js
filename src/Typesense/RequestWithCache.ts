const defaultCacheResponseForSeconds = 2 * 60;
const defaultMaxSize = 100;

export default class RequestWithCache {
  private responseCache: Map<string, any> = new Map<string, any>();
  private responsePromiseCache: Map<string, any> = new Map<string, any>();

  clearCache() {
    this.responseCache = new Map<string, any>();
    this.responsePromiseCache = new Map<string, any>();
  }

  // Todo: should probably be passed a callback instead, or an apiCall instance. Types are messy this way
  async perform<T>(
    requestContext: any,
    requestFunction: (...params: any) => unknown,
    requestFunctionArguments: any[],
    cacheOptions: CacheOptions
  ): Promise<T | unknown> {
    const {
      cacheResponseForSeconds = defaultCacheResponseForSeconds,
      maxSize = defaultMaxSize,
    } = cacheOptions;
    const isCacheDisabled = cacheResponseForSeconds <= 0 || maxSize <= 0;

    if (isCacheDisabled) {
      return requestFunction.call(requestContext, ...requestFunctionArguments);
    }

    const requestFunctionArgumentsJSON = JSON.stringify(
      requestFunctionArguments
    );
    const cacheEntry = this.responseCache.get(requestFunctionArgumentsJSON);
    const now = Date.now();

    if (cacheEntry) {
      const isEntryValid =
        now - cacheEntry.requestTimestamp < cacheResponseForSeconds * 1000;
      if (isEntryValid) {
        this.responseCache.delete(requestFunctionArgumentsJSON);
        this.responseCache.set(requestFunctionArgumentsJSON, cacheEntry);
        return Promise.resolve(cacheEntry.response);
      } else {
        this.responseCache.delete(requestFunctionArgumentsJSON);
      }
    }

    const cachePromiseEntry = this.responsePromiseCache.get(
      requestFunctionArgumentsJSON
    );

    if (cachePromiseEntry) {
      const isEntryValid =
        now - cachePromiseEntry.requestTimestamp <
        cacheResponseForSeconds * 1000;
      if (isEntryValid) {
        this.responsePromiseCache.delete(requestFunctionArgumentsJSON);
        this.responsePromiseCache.set(
          requestFunctionArgumentsJSON,
          cachePromiseEntry
        );
        return cachePromiseEntry.responsePromise;
      } else {
        this.responsePromiseCache.delete(requestFunctionArgumentsJSON);
      }
    }

    const responsePromise = requestFunction.call(
      requestContext,
      ...requestFunctionArguments
    );
    this.responsePromiseCache.set(requestFunctionArgumentsJSON, {
      requestTimestamp: now,
      responsePromise,
    });

    const response = await responsePromise;
    this.responseCache.set(requestFunctionArgumentsJSON, {
      requestTimestamp: now,
      response,
    });

    const isCacheOverMaxSize = this.responseCache.size > maxSize;
    if (isCacheOverMaxSize) {
      const oldestEntry = this.responseCache.keys().next().value;
      this.responseCache.delete(oldestEntry);
    }
    const isResponsePromiseCacheOverMaxSize =
      this.responsePromiseCache.size > maxSize;
    if (isResponsePromiseCacheOverMaxSize) {
      const oldestEntry = this.responsePromiseCache.keys().next().value;
      this.responsePromiseCache.delete(oldestEntry);
    }
    return response as T;
  }
}

interface CacheOptions {
  cacheResponseForSeconds?: number;
  maxSize?: number;
}
