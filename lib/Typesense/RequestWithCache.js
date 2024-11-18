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
    // Todo: should probably be passed a callback instead, or an apiCall instance. Types are messy this way
    RequestWithCache.prototype.perform = function (requestContext, requestFunction, requestFunctionArguments, cacheOptions) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _a, cacheResponseForSeconds, _b, maxSize, isCacheDisabled, requestFunctionArgumentsJSON, cacheEntry, now, isEntryValid, cachePromiseEntry, isEntryValid, responsePromise, response, isCacheOverMaxSize, oldestEntry, isResponsePromiseCacheOverMaxSize, oldestEntry;
            return tslib_1.__generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = cacheOptions.cacheResponseForSeconds, cacheResponseForSeconds = _a === void 0 ? defaultCacheResponseForSeconds : _a, _b = cacheOptions.maxSize, maxSize = _b === void 0 ? defaultMaxSize : _b;
                        isCacheDisabled = cacheResponseForSeconds <= 0 || maxSize <= 0;
                        if (isCacheDisabled) {
                            return [2 /*return*/, requestFunction.call.apply(requestFunction, tslib_1.__spreadArray([requestContext], requestFunctionArguments, false))];
                        }
                        requestFunctionArgumentsJSON = JSON.stringify(requestFunctionArguments);
                        cacheEntry = this.responseCache.get(requestFunctionArgumentsJSON);
                        now = Date.now();
                        if (cacheEntry) {
                            isEntryValid = now - cacheEntry.requestTimestamp < cacheResponseForSeconds * 1000;
                            if (isEntryValid) {
                                this.responseCache.delete(requestFunctionArgumentsJSON);
                                this.responseCache.set(requestFunctionArgumentsJSON, cacheEntry);
                                return [2 /*return*/, Promise.resolve(cacheEntry.response)];
                            }
                            else {
                                this.responseCache.delete(requestFunctionArgumentsJSON);
                            }
                        }
                        cachePromiseEntry = this.responsePromiseCache.get(requestFunctionArgumentsJSON);
                        if (cachePromiseEntry) {
                            isEntryValid = now - cachePromiseEntry.requestTimestamp <
                                cacheResponseForSeconds * 1000;
                            if (isEntryValid) {
                                this.responsePromiseCache.delete(requestFunctionArgumentsJSON);
                                this.responsePromiseCache.set(requestFunctionArgumentsJSON, cachePromiseEntry);
                                return [2 /*return*/, cachePromiseEntry.responsePromise];
                            }
                            else {
                                this.responsePromiseCache.delete(requestFunctionArgumentsJSON);
                            }
                        }
                        responsePromise = requestFunction.call.apply(requestFunction, tslib_1.__spreadArray([requestContext], requestFunctionArguments, false));
                        this.responsePromiseCache.set(requestFunctionArgumentsJSON, {
                            requestTimestamp: now,
                            responsePromise: responsePromise,
                        });
                        return [4 /*yield*/, responsePromise];
                    case 1:
                        response = _c.sent();
                        this.responseCache.set(requestFunctionArgumentsJSON, {
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
    return RequestWithCache;
}());
exports.default = RequestWithCache;
//# sourceMappingURL=RequestWithCache.js.map