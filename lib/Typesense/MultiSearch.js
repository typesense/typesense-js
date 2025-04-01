"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var RequestWithCache_1 = tslib_1.__importDefault(require("./RequestWithCache"));
var Utils_1 = require("./Utils");
var RESOURCEPATH = "/multi_search";
var MultiSearch = /** @class */ (function () {
    function MultiSearch(apiCall, configuration, useTextContentType) {
        if (useTextContentType === void 0) { useTextContentType = false; }
        this.apiCall = apiCall;
        this.configuration = configuration;
        this.useTextContentType = useTextContentType;
        this.requestWithCache = new RequestWithCache_1.default();
    }
    MultiSearch.prototype.clearCache = function () {
        this.requestWithCache.clearCache();
    };
    MultiSearch.prototype.perform = function (searchRequests, commonParams, _a) {
        if (commonParams === void 0) { commonParams = {}; }
        var _b = _a === void 0 ? {} : _a, _c = _b.cacheSearchResultsForSeconds, cacheSearchResultsForSeconds = _c === void 0 ? this.configuration
            .cacheSearchResultsForSeconds : _c;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var additionalHeaders, additionalQueryParams, queryParams, _d, extractedStreamConfig, searchesWithoutStreamConfig, normalizedSearchRequests, normalizedQueryParams;
            return tslib_1.__generator(this, function (_e) {
                additionalHeaders = {};
                if (this.useTextContentType) {
                    additionalHeaders["content-type"] = "text/plain";
                }
                additionalQueryParams = {};
                if (this.configuration.useServerSideSearchCache === true) {
                    additionalQueryParams["use_cache"] = true;
                }
                queryParams = tslib_1.__assign(tslib_1.__assign({}, commonParams), additionalQueryParams);
                _d = this.extractStreamConfig(searchRequests.searches), extractedStreamConfig = _d.extractedStreamConfig, searchesWithoutStreamConfig = _d.searchesWithoutStreamConfig;
                normalizedSearchRequests = tslib_1.__assign(tslib_1.__assign({}, searchRequests), { searches: searchesWithoutStreamConfig.map(Utils_1.normalizeArrayableParams) });
                normalizedQueryParams = (0, Utils_1.normalizeArrayableParams)(queryParams);
                return [2 /*return*/, this.requestWithCache.perform(this.apiCall, "post", {
                        path: RESOURCEPATH,
                        body: normalizedSearchRequests,
                        queryParams: normalizedQueryParams,
                        headers: additionalHeaders,
                        streamConfig: extractedStreamConfig,
                        isStreamingRequest: this.isStreamingRequest(searchRequests),
                    }, { cacheResponseForSeconds: cacheSearchResultsForSeconds })];
            });
        });
    };
    MultiSearch.prototype.isStreamingRequest = function (searchRequests) {
        return searchRequests.searches.some(function (search) { return search.streamConfig !== undefined; });
    };
    /**
     * Extracts streamConfig from search requests and returns both the config and clean requests
     */
    MultiSearch.prototype.extractStreamConfig = function (searches) {
        var searchWithStreamConfig = searches.find(function (search) { return search.streamConfig !== undefined; });
        var searchesWithoutStreamConfig = searches.map(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        function (_a) {
            var streamConfig = _a.streamConfig, rest = tslib_1.__rest(_a, ["streamConfig"]);
            return rest;
        });
        return {
            extractedStreamConfig: searchWithStreamConfig === null || searchWithStreamConfig === void 0 ? void 0 : searchWithStreamConfig.streamConfig,
            searchesWithoutStreamConfig: searchesWithoutStreamConfig,
        };
    };
    return MultiSearch;
}());
exports.default = MultiSearch;
//# sourceMappingURL=MultiSearch.js.map