"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const defaultCacheResponseForSeconds = 2 * 60;
const defaultMaxSize = 100;
class RequestWithCache {
    constructor() {
        this.responseCache = new Map();
        this.responsePromiseCache = new Map();
    }
    clearCache() {
        this.responseCache = new Map();
        this.responsePromiseCache = new Map();
    }
    // Todo: should probably be passed a callback instead, or an apiCall instance. Types are messy this way
    async perform(requestContext, requestFunction, requestFunctionArguments, cacheOptions) {
        const { cacheResponseForSeconds = defaultCacheResponseForSeconds, maxSize = defaultMaxSize, } = cacheOptions;
        const isCacheDisabled = cacheResponseForSeconds <= 0 || maxSize <= 0;
        if (isCacheDisabled) {
            return requestFunction.call(requestContext, ...requestFunctionArguments);
        }
        const requestFunctionArgumentsJSON = JSON.stringify(requestFunctionArguments);
        const cacheEntry = this.responseCache.get(requestFunctionArgumentsJSON);
        const now = Date.now();
        if (cacheEntry) {
            const isEntryValid = now - cacheEntry.requestTimestamp < cacheResponseForSeconds * 1000;
            if (isEntryValid) {
                this.responseCache.delete(requestFunctionArgumentsJSON);
                this.responseCache.set(requestFunctionArgumentsJSON, cacheEntry);
                return Promise.resolve(cacheEntry.response);
            }
            else {
                this.responseCache.delete(requestFunctionArgumentsJSON);
            }
        }
        const cachePromiseEntry = this.responsePromiseCache.get(requestFunctionArgumentsJSON);
        if (cachePromiseEntry) {
            const isEntryValid = now - cachePromiseEntry.requestTimestamp <
                cacheResponseForSeconds * 1000;
            if (isEntryValid) {
                this.responsePromiseCache.delete(requestFunctionArgumentsJSON);
                this.responsePromiseCache.set(requestFunctionArgumentsJSON, cachePromiseEntry);
                return cachePromiseEntry.responsePromise;
            }
            else {
                this.responsePromiseCache.delete(requestFunctionArgumentsJSON);
            }
        }
        const responsePromise = requestFunction.call(requestContext, ...requestFunctionArguments);
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
            if (oldestEntry) {
                this.responseCache.delete(oldestEntry);
            }
        }
        const isResponsePromiseCacheOverMaxSize = this.responsePromiseCache.size > maxSize;
        if (isResponsePromiseCacheOverMaxSize) {
            const oldestEntry = this.responsePromiseCache.keys().next().value;
            if (oldestEntry) {
                this.responsePromiseCache.delete(oldestEntry);
            }
        }
        return response;
    }
}
exports.default = RequestWithCache;
//# sourceMappingURL=RequestWithCache.js.map