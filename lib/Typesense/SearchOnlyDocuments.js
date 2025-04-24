"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchOnlyDocuments = void 0;
var tslib_1 = require("tslib");
var RequestWithCache_1 = tslib_1.__importDefault(require("./RequestWithCache"));
var Collections_1 = tslib_1.__importDefault(require("./Collections"));
var Utils_1 = require("./Utils");
var RESOURCEPATH = "/documents";
var SearchOnlyDocuments = /** @class */ (function () {
    function SearchOnlyDocuments(collectionName, apiCall, configuration) {
        this.collectionName = collectionName;
        this.apiCall = apiCall;
        this.configuration = configuration;
        this.requestWithCache = new RequestWithCache_1.default();
    }
    SearchOnlyDocuments.prototype.clearCache = function () {
        this.requestWithCache.clearCache();
    };
    SearchOnlyDocuments.prototype.search = function (searchParameters, _a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.cacheSearchResultsForSeconds, cacheSearchResultsForSeconds = _c === void 0 ? this.configuration
            .cacheSearchResultsForSeconds : _c, _d = _b.abortSignal, abortSignal = _d === void 0 ? null : _d;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var additionalQueryParams, _e, streamConfig, rest, queryParams, isStreamingRequest;
            return tslib_1.__generator(this, function (_f) {
                additionalQueryParams = {};
                if (this.configuration.useServerSideSearchCache === true) {
                    additionalQueryParams["use_cache"] = true;
                }
                _e = (0, Utils_1.normalizeArrayableParams)(searchParameters), streamConfig = _e.streamConfig, rest = tslib_1.__rest(_e, ["streamConfig"]);
                queryParams = tslib_1.__assign(tslib_1.__assign({}, additionalQueryParams), rest);
                isStreamingRequest = queryParams.conversation_stream === true;
                return [2 /*return*/, this.requestWithCache.perform(this.apiCall, "get", {
                        path: this.endpointPath("search"),
                        queryParams: queryParams,
                        streamConfig: streamConfig,
                        abortSignal: abortSignal,
                        isStreamingRequest: isStreamingRequest,
                    }, {
                        cacheResponseForSeconds: cacheSearchResultsForSeconds,
                    })];
            });
        });
    };
    SearchOnlyDocuments.prototype.endpointPath = function (operation) {
        return "".concat(Collections_1.default.RESOURCEPATH, "/").concat(encodeURIComponent(this.collectionName)).concat(RESOURCEPATH).concat(operation === undefined ? "" : "/" + operation);
    };
    Object.defineProperty(SearchOnlyDocuments, "RESOURCEPATH", {
        get: function () {
            return RESOURCEPATH;
        },
        enumerable: false,
        configurable: true
    });
    return SearchOnlyDocuments;
}());
exports.SearchOnlyDocuments = SearchOnlyDocuments;
//# sourceMappingURL=SearchOnlyDocuments.js.map