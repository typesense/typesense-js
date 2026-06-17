"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var RESOURCEPATH = "/nl_search_models";
var NLSearchModels = /** @class */ (function () {
    function NLSearchModels(apiCall) {
        this.apiCall = apiCall;
    }
    /**
     * Create a new NL search model.
     *
     * @example
     * await client.nlSearchModels().create({ model_name: "openai/gpt-4", api_key: "..." })
     *
     * @see https://typesense.org/docs/latest/api/natural-language-search.html
     */
    NLSearchModels.prototype.create = function (schema) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this.apiCall.post(this.endpointPath(), schema)];
            });
        });
    };
    /**
     * Retrieve all NL search models.
     *
     * @example
     * await client.nlSearchModels().retrieve()
     *
     * @see https://typesense.org/docs/latest/api/natural-language-search.html
     */
    NLSearchModels.prototype.retrieve = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this.apiCall.get(this.endpointPath())];
            });
        });
    };
    NLSearchModels.prototype.endpointPath = function () {
        return NLSearchModels.RESOURCEPATH;
    };
    Object.defineProperty(NLSearchModels, "RESOURCEPATH", {
        get: function () {
            return RESOURCEPATH;
        },
        enumerable: false,
        configurable: true
    });
    return NLSearchModels;
}());
exports.default = NLSearchModels;
//# sourceMappingURL=NLSearchModels.js.map