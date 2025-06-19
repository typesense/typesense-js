"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var RESOURCEPATH = "/nl_search_models";
var NLSearchModels = /** @class */ (function () {
    function NLSearchModels(apiCall) {
        this.apiCall = apiCall;
    }
    NLSearchModels.prototype.create = function (schema) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this.apiCall.post(this.endpointPath(), schema)];
            });
        });
    };
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