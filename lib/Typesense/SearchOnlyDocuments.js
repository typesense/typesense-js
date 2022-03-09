var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./RequestWithCache", "./Collections"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SearchOnlyDocuments = void 0;
    const RequestWithCache_1 = __importDefault(require("./RequestWithCache"));
    const Collections_1 = __importDefault(require("./Collections"));
    const RESOURCEPATH = '/documents';
    class SearchOnlyDocuments {
        constructor(collectionName, apiCall, configuration) {
            this.collectionName = collectionName;
            this.apiCall = apiCall;
            this.configuration = configuration;
            this.requestWithCache = new RequestWithCache_1.default();
        }
        search(searchParameters, { cacheSearchResultsForSeconds = this.configuration.cacheSearchResultsForSeconds, abortSignal = null } = {}) {
            return __awaiter(this, void 0, void 0, function* () {
                let additionalQueryParams = {};
                if (this.configuration.useServerSideSearchCache === true) {
                    additionalQueryParams['use_cache'] = true;
                }
                const queryParams = Object.assign({}, searchParameters, additionalQueryParams);
                return this.requestWithCache.perform(this.apiCall, this.apiCall.get, [this.endpointPath('search'), queryParams, { abortSignal }], {
                    cacheResponseForSeconds: cacheSearchResultsForSeconds
                });
            });
        }
        endpointPath(operation) {
            return `${Collections_1.default.RESOURCEPATH}/${this.collectionName}${RESOURCEPATH}${operation === undefined ? '' : '/' + operation}`;
        }
        static get RESOURCEPATH() {
            return RESOURCEPATH;
        }
    }
    exports.SearchOnlyDocuments = SearchOnlyDocuments;
});
//# sourceMappingURL=SearchOnlyDocuments.js.map