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
        define(["require", "exports", "./RequestWithCache"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const RequestWithCache_1 = __importDefault(require("./RequestWithCache"));
    const RESOURCEPATH = '/multi_search';
    class MultiSearch {
        constructor(apiCall, configuration, useTextContentType = false) {
            this.apiCall = apiCall;
            this.configuration = configuration;
            this.useTextContentType = useTextContentType;
            this.requestWithCache = new RequestWithCache_1.default();
        }
        perform(searchRequests, commonParams = {}, { cacheSearchResultsForSeconds = this.configuration.cacheSearchResultsForSeconds } = {}) {
            return __awaiter(this, void 0, void 0, function* () {
                let additionalHeaders = {};
                if (this.useTextContentType) {
                    additionalHeaders['content-type'] = 'text/plain';
                }
                let additionalQueryParams = {};
                if (this.configuration.useServerSideSearchCache === true) {
                    additionalQueryParams['use_cache'] = true;
                }
                const queryParams = Object.assign({}, commonParams, additionalQueryParams);
                return this.requestWithCache.perform(this.apiCall, this.apiCall.post, [RESOURCEPATH, searchRequests, queryParams, additionalHeaders], { cacheResponseForSeconds: cacheSearchResultsForSeconds });
            });
        }
    }
    exports.default = MultiSearch;
});
//# sourceMappingURL=MultiSearch.js.map