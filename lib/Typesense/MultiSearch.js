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
            var additionalHeaders, additionalQueryParams, queryParams, normalizedSearchRequests, normalizedQueryParams;
            return tslib_1.__generator(this, function (_d) {
                additionalHeaders = {};
                if (this.useTextContentType) {
                    additionalHeaders["content-type"] = "text/plain";
                }
                additionalQueryParams = {};
                if (this.configuration.useServerSideSearchCache === true) {
                    additionalQueryParams["use_cache"] = true;
                }
                queryParams = tslib_1.__assign(tslib_1.__assign({}, commonParams), additionalQueryParams);
                normalizedSearchRequests = {
                    searches: searchRequests.searches.map(Utils_1.normalizeArrayableParams),
                };
                normalizedQueryParams = (0, Utils_1.normalizeArrayableParams)(queryParams);
                return [2 /*return*/, this.requestWithCache.perform(this.apiCall, this.apiCall.post, [
                        RESOURCEPATH,
                        normalizedSearchRequests,
                        normalizedQueryParams,
                        additionalHeaders,
                    ], { cacheResponseForSeconds: cacheSearchResultsForSeconds })];
            });
        });
    };
    return MultiSearch;
}());
exports.default = MultiSearch;
//# sourceMappingURL=MultiSearch.js.map