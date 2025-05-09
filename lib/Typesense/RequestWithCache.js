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
    async perform(requestContext, methodName, requestParams, cacheOptions) {
        const { cacheResponseForSeconds = defaultCacheResponseForSeconds, maxSize = defaultMaxSize, } = cacheOptions;
        const isCacheDisabled = cacheResponseForSeconds <= 0 || maxSize <= 0;
        const { path, queryParams, body, headers, streamConfig, abortSignal, responseType, isStreamingRequest, } = requestParams;
        if (isCacheDisabled) {
            return this.executeRequest(requestContext, methodName, path, queryParams, body, headers, { abortSignal, responseType, streamConfig, isStreamingRequest });
        }
        const requestParamsJSON = JSON.stringify(requestParams);
        const cacheEntry = this.responseCache.get(requestParamsJSON);
        const now = Date.now();
        if (cacheEntry) {
            const isEntryValid = now - cacheEntry.requestTimestamp < cacheResponseForSeconds * 1000;
            if (isEntryValid) {
                this.responseCache.delete(requestParamsJSON);
                this.responseCache.set(requestParamsJSON, cacheEntry);
                return cacheEntry.response;
            }
            else {
                this.responseCache.delete(requestParamsJSON);
            }
        }
        const cachePromiseEntry = this.responsePromiseCache.get(requestParamsJSON);
        if (cachePromiseEntry) {
            const isEntryValid = now - cachePromiseEntry.requestTimestamp <
                cacheResponseForSeconds * 1000;
            if (isEntryValid) {
                this.responsePromiseCache.delete(requestParamsJSON);
                this.responsePromiseCache.set(requestParamsJSON, cachePromiseEntry);
                return cachePromiseEntry.responsePromise;
            }
            else {
                this.responsePromiseCache.delete(requestParamsJSON);
            }
        }
        const responsePromise = this.executeRequest(requestContext, methodName, path, queryParams, body, headers, { abortSignal, responseType, streamConfig, isStreamingRequest });
        this.responsePromiseCache.set(requestParamsJSON, {
            requestTimestamp: now,
            responsePromise,
        });
        const response = await responsePromise;
        this.responseCache.set(requestParamsJSON, {
            requestTimestamp: now,
            response: response,
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
    executeRequest(context, methodName, path, queryParams = {}, body, headers, options) {
        const method = context[methodName];
        switch (methodName) {
            case "get":
                return method.call(context, path, queryParams, {
                    abortSignal: options === null || options === void 0 ? void 0 : options.abortSignal,
                    responseType: options === null || options === void 0 ? void 0 : options.responseType,
                    streamConfig: options === null || options === void 0 ? void 0 : options.streamConfig,
                    isStreamingRequest: options === null || options === void 0 ? void 0 : options.isStreamingRequest,
                });
            case "delete":
                return method.call(context, path, queryParams);
            case "post":
                return method.call(context, path, body, queryParams, headers || {}, {
                    abortSignal: options === null || options === void 0 ? void 0 : options.abortSignal,
                    responseType: options === null || options === void 0 ? void 0 : options.responseType,
                    streamConfig: options === null || options === void 0 ? void 0 : options.streamConfig,
                    isStreamingRequest: options === null || options === void 0 ? void 0 : options.isStreamingRequest,
                });
            case "put":
            case "patch":
                return method.call(context, path, body, queryParams);
            default:
                throw new Error(`Unsupported method: ${String(methodName)}`);
        }
    }
}
exports.default = RequestWithCache;
//# sourceMappingURL=RequestWithCache.js.map