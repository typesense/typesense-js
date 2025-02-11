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
        const normalizedParams = (0, Utils_1.normalizeArrayableParams)(searchParameters);
        const queryParams = Object.assign({}, additionalQueryParams, normalizedParams);
        return this.requestWithCache.perform(this.apiCall, this.apiCall.get, [this.endpointPath("search"), queryParams, { abortSignal }], {
            cacheResponseForSeconds: cacheSearchResultsForSeconds,
        });
    }
    endpointPath(operation) {
        return `${Collections_1.default.RESOURCEPATH}/${this.collectionName}${RESOURCEPATH}${operation === undefined ? "" : "/" + operation}`;
    }
    static get RESOURCEPATH() {
        return RESOURCEPATH;
    }
}
exports.SearchOnlyDocuments = SearchOnlyDocuments;
//# sourceMappingURL=SearchOnlyDocuments.js.map