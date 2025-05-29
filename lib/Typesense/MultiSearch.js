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
    async perform(searchRequests, commonParams, { cacheSearchResultsForSeconds = this.configuration
        .cacheSearchResultsForSeconds, } = {}) {
        const params = commonParams ? { ...commonParams } : {};
        if (this.configuration.useServerSideSearchCache === true) {
            params.use_cache = true;
        }
        const normalizedSearchRequests = {
            union: searchRequests.union,
            searches: searchRequests.searches.map((Utils_1.normalizeArrayableParams)),
        };
        const { streamConfig, ...paramsWithoutStream } = params;
        const normalizedQueryParams = (0, Utils_1.normalizeArrayableParams)(paramsWithoutStream);
        return this.requestWithCache.perform(this.apiCall, "post", {
            path: RESOURCEPATH,
            body: normalizedSearchRequests,
            queryParams: normalizedQueryParams,
            headers: this.useTextContentType
                ? { "content-type": "text/plain" }
                : {},
            streamConfig,
            isStreamingRequest: this.isStreamingRequest(params),
        }, { cacheResponseForSeconds: cacheSearchResultsForSeconds });
    }
    isStreamingRequest(commonParams) {
        return commonParams.streamConfig !== undefined;
    }
}
exports.default = MultiSearch;
//# sourceMappingURL=MultiSearch.js.map