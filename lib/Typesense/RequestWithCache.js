var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const defaultCacheResponseForSeconds = 2 * 60;
    const defaultMaxSize = 100;
    class RequestWithCache {
        constructor() {
            this.responseCache = new Map();
        }
        // Todo: should probably be passed a callback instead, or an apiCall instance. Types are messy this way
        perform(requestContext, requestFunction, requestFunctionArguments, cacheOptions) {
            return __awaiter(this, void 0, void 0, function* () {
                const { cacheResponseForSeconds = defaultCacheResponseForSeconds, maxSize = defaultMaxSize } = cacheOptions;
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
                const response = yield requestFunction.call(requestContext, ...requestFunctionArguments);
                this.responseCache.set(requestFunctionArgumentsJSON, {
                    requestTimestamp: now,
                    response
                });
                const isCacheOverMaxSize = this.responseCache.size > maxSize;
                if (isCacheOverMaxSize) {
                    const oldestEntry = this.responseCache.keys().next().value;
                    this.responseCache.delete(oldestEntry);
                }
                return response;
            });
        }
    }
    exports.default = RequestWithCache;
});
//# sourceMappingURL=RequestWithCache.js.map