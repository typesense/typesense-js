"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const RequestWithCache_1 = tslib_1.__importDefault(require("./RequestWithCache"));
const Utils_1 = require("./Utils");
const RESOURCEPATH = "/multi_search";
class MultiSearch {
    constructor(apiCall, configuration, useTextContentType = false) {
        this.apiCall = apiCall;
        this.configuration = configuration;
        this.useTextContentType = useTextContentType;
        this.requestWithCache = new RequestWithCache_1.default();
    }
    clearCache() {
        this.requestWithCache.clearCache();
    }
    async perform(searchRequests, commonParams = {}, { cacheSearchResultsForSeconds = this.configuration
        .cacheSearchResultsForSeconds, } = {}) {
        const additionalHeaders = {};
        if (this.useTextContentType) {
            additionalHeaders["content-type"] = "text/plain";
        }
        const additionalQueryParams = {};
        if (this.configuration.useServerSideSearchCache === true) {
            additionalQueryParams["use_cache"] = true;
        }
        const queryParams = { ...commonParams, ...additionalQueryParams };
        const normalizedSearchRequests = {
            searches: searchRequests.searches.map(Utils_1.normalizeArrayableParams),
        };
        const normalizedQueryParams = (0, Utils_1.normalizeArrayableParams)(queryParams);
        return this.requestWithCache.perform(this.apiCall, this.apiCall.post, [
            RESOURCEPATH,
            normalizedSearchRequests,
            normalizedQueryParams,
            additionalHeaders,
        ], { cacheResponseForSeconds: cacheSearchResultsForSeconds });
    }
}
exports.default = MultiSearch;
//# sourceMappingURL=MultiSearch.js.map