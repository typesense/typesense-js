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
        var _b = _a === void 0 ? {} : _a, _c = _b.cacheSearchResultsForSeconds, cacheSearchResultsForSeconds = _c === void 0 ? this.configuration
            .cacheSearchResultsForSeconds : _c;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var params, normalizedSearchRequests, streamConfig, paramsWithoutStream, normalizedQueryParams;
            return tslib_1.__generator(this, function (_d) {
                params = commonParams ? tslib_1.__assign({}, commonParams) : {};
                if (this.configuration.useServerSideSearchCache === true) {
                    params.use_cache = true;
                }
                normalizedSearchRequests = {
                    union: searchRequests.union,
                    searches: searchRequests.searches.map((Utils_1.normalizeArrayableParams)),
                };
                streamConfig = params.streamConfig, paramsWithoutStream = tslib_1.__rest(params, ["streamConfig"]);
                normalizedQueryParams = (0, Utils_1.normalizeArrayableParams)(paramsWithoutStream);
                return [2 /*return*/, this.requestWithCache.perform(this.apiCall, "post", {
                        path: RESOURCEPATH,
                        body: normalizedSearchRequests,
                        queryParams: normalizedQueryParams,
                        headers: this.useTextContentType
                            ? { "content-type": "text/plain" }
                            : {},
                        streamConfig: streamConfig,
                        isStreamingRequest: this.isStreamingRequest(params),
                    }, { cacheResponseForSeconds: cacheSearchResultsForSeconds })];
            });
        });
    };
    MultiSearch.prototype.isStreamingRequest = function (commonParams) {
        return commonParams.streamConfig !== undefined;
    };
    return MultiSearch;
}());
exports.default = MultiSearch;
//# sourceMappingURL=MultiSearch.js.map