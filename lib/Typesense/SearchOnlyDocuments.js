"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchOnlyDocuments = void 0;
const tslib_1 = require("tslib");
const RequestWithCache_1 = tslib_1.__importDefault(require("./RequestWithCache"));
const Collections_1 = tslib_1.__importDefault(require("./Collections"));
const Utils_1 = require("./Utils");
const RESOURCEPATH = "/documents";
class SearchOnlyDocuments {
    constructor(collectionName, apiCall, configuration) {
        this.collectionName = collectionName;
        this.apiCall = apiCall;
        this.configuration = configuration;
        this.requestWithCache = new RequestWithCache_1.default();
    }
    clearCache() {
        this.requestWithCache.clearCache();
    }
    async search(searchParameters, { cacheSearchResultsForSeconds = this.configuration
        .cacheSearchResultsForSeconds, abortSignal = null, } = {}) {
        const additionalQueryParams = {};
        if (this.configuration.useServerSideSearchCache === true) {
            additionalQueryParams["use_cache"] = true;
        }
        const { streamConfig, ...rest } = (0, Utils_1.normalizeArrayableParams)(searchParameters);
        const queryParams = {
            ...additionalQueryParams,
            ...rest,
        };
        const isStreamingRequest = queryParams.conversation_stream === true;
        return this.requestWithCache.perform(this.apiCall, "get", {
            path: this.endpointPath("search"),
            queryParams,
            streamConfig,
            abortSignal,
            isStreamingRequest,
        }, {
            cacheResponseForSeconds: cacheSearchResultsForSeconds,
        });
    }
    endpointPath(operation) {
        return `${Collections_1.default.RESOURCEPATH}/${encodeURIComponent(this.collectionName)}${RESOURCEPATH}${operation === undefined ? "" : "/" + operation}`;
    }
    static get RESOURCEPATH() {
        return RESOURCEPATH;
    }
}
exports.SearchOnlyDocuments = SearchOnlyDocuments;
//# sourceMappingURL=SearchOnlyDocuments.js.map