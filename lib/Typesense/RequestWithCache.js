"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var defaultCacheResponseForSeconds = 2 * 60;
var defaultMaxSize = 100;
var RequestWithCache = /** @class */ (function () {
    function RequestWithCache() {
        this.responseCache = new Map();
        this.responsePromiseCache = new Map();
    }
    RequestWithCache.prototype.clearCache = function () {
        this.responseCache = new Map();
        this.responsePromiseCache = new Map();
    };
    RequestWithCache.prototype.perform = function (requestContext, methodName, requestParams, cacheOptions) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _a, _b, cacheResponseForSeconds, _c, maxSize, isCacheDisabled, path, queryParams, body, headers, streamConfig, abortSignal, responseType, isStreamingRequest, requestParamsJSON, cacheEntry, now, isEntryValid, cachePromiseEntry, isEntryValid, responsePromise, response, isCacheOverMaxSize, oldestEntry, isResponsePromiseCacheOverMaxSize, oldestEntry;
            return tslib_1.__generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _a = cacheOptions || {}, _b = _a.cacheResponseForSeconds, cacheResponseForSeconds = _b === void 0 ? defaultCacheResponseForSeconds : _b, _c = _a.maxSize, maxSize = _c === void 0 ? defaultMaxSize : _c;
                        isCacheDisabled = cacheOptions === undefined ||
                            cacheResponseForSeconds <= 0 ||
                            maxSize <= 0;
                        path = requestParams.path, queryParams = requestParams.queryParams, body = requestParams.body, headers = requestParams.headers, streamConfig = requestParams.streamConfig, abortSignal = requestParams.abortSignal, responseType = requestParams.responseType, isStreamingRequest = requestParams.isStreamingRequest;
                        if (isCacheDisabled) {
                            return [2 /*return*/, this.executeRequest(requestContext, methodName, path, queryParams, body, headers, { abortSignal: abortSignal, responseType: responseType, streamConfig: streamConfig, isStreamingRequest: isStreamingRequest })];
                        }
                        requestParamsJSON = JSON.stringify(requestParams);
                        cacheEntry = this.responseCache.get(requestParamsJSON);
                        now = Date.now();
                        if (cacheEntry) {
                            isEntryValid = now - cacheEntry.requestTimestamp < cacheResponseForSeconds * 1000;
                            if (isEntryValid) {
                                this.responseCache.delete(requestParamsJSON);
                                this.responseCache.set(requestParamsJSON, cacheEntry);
                                return [2 /*return*/, cacheEntry.response];
                            }
                            else {
                                this.responseCache.delete(requestParamsJSON);
                            }
                        }
                        cachePromiseEntry = this.responsePromiseCache.get(requestParamsJSON);
                        if (cachePromiseEntry) {
                            isEntryValid = now - cachePromiseEntry.requestTimestamp <
                                cacheResponseForSeconds * 1000;
                            if (isEntryValid) {
                                this.responsePromiseCache.delete(requestParamsJSON);
                                this.responsePromiseCache.set(requestParamsJSON, cachePromiseEntry);
                                return [2 /*return*/, cachePromiseEntry.responsePromise];
                            }
                            else {
                                this.responsePromiseCache.delete(requestParamsJSON);
                            }
                        }
                        responsePromise = this.executeRequest(requestContext, methodName, path, queryParams, body, headers, { abortSignal: abortSignal, responseType: responseType, streamConfig: streamConfig, isStreamingRequest: isStreamingRequest });
                        this.responsePromiseCache.set(requestParamsJSON, {
                            requestTimestamp: now,
                            responsePromise: responsePromise,
                        });
                        return [4 /*yield*/, responsePromise];
                    case 1:
                        response = _d.sent();
                        this.responseCache.set(requestParamsJSON, {
                            requestTimestamp: now,
                            response: response,
                        });
                        isCacheOverMaxSize = this.responseCache.size > maxSize;
                        if (isCacheOverMaxSize) {
                            oldestEntry = this.responseCache.keys().next().value;
                            if (oldestEntry) {
                                this.responseCache.delete(oldestEntry);
                            }
                        }
                        isResponsePromiseCacheOverMaxSize = this.responsePromiseCache.size > maxSize;
                        if (isResponsePromiseCacheOverMaxSize) {
                            oldestEntry = this.responsePromiseCache.keys().next().value;
                            if (oldestEntry) {
                                this.responsePromiseCache.delete(oldestEntry);
                            }
                        }
                        return [2 /*return*/, response];
                }
            });
        });
    };
    RequestWithCache.prototype.executeRequest = function (context, methodName, path, queryParams, body, headers, options) {
        if (queryParams === void 0) { queryParams = {}; }
        var method = context[methodName];
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
                throw new Error("Unsupported method: ".concat(String(methodName)));
        }
    };
    return RequestWithCache;
}());
exports.default = RequestWithCache;
//# sourceMappingURL=RequestWithCache.js.map