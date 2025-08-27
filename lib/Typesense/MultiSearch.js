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
        this.logger = this.apiCall.logger;
    }
    MultiSearch.prototype.clearCache = function () {
        this.requestWithCache.clearCache();
    };
    MultiSearch.prototype.perform = function (searchRequests, commonParams, options) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var params, normalizedSearchRequests, streamConfig, paramsWithoutStream, normalizedQueryParams;
            return tslib_1.__generator(this, function (_a) {
                params = commonParams ? tslib_1.__assign({}, commonParams) : {};
                if (this.configuration.useServerSideSearchCache === true) {
                    params.use_cache = true;
                }
                if (searchRequests.union === true && this.hasAnySearchObjectPagination(searchRequests)) {
                    this.logger.warn("Individual `searches` pagination parameters are ignored when `union: true` is set. Use a top-level pagination parameter instead. See https://typesense.org/docs/29.0/api/federated-multi-search.html#union-search");
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
                        abortSignal: options === null || options === void 0 ? void 0 : options.abortSignal,
                        isStreamingRequest: this.isStreamingRequest(params),
                    }, (options === null || options === void 0 ? void 0 : options.cacheSearchResultsForSeconds) !== undefined
                        ? { cacheResponseForSeconds: options.cacheSearchResultsForSeconds }
                        : undefined)];
            });
        });
    };
    MultiSearch.prototype.isStreamingRequest = function (commonParams) {
        return commonParams.streamConfig !== undefined;
    };
    MultiSearch.prototype.hasAnySearchObjectPagination = function (searchRequests) {
        return searchRequests.searches.some(function (search) { return search.page !== undefined || search.per_page !== undefined || search.offset !== undefined || search.limit !== undefined || search.limit_hits !== undefined; });
    };
    return MultiSearch;
}());
exports.default = MultiSearch;
//# sourceMappingURL=MultiSearch.js.map