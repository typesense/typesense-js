"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var RESOURCEPATH = "/collections";
var Collections = /** @class */ (function () {
    function Collections(apiCall) {
        this.apiCall = apiCall;
    }
    Collections.prototype.create = function (schema, options) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this.apiCall.post(RESOURCEPATH, schema, options)];
            });
        });
    };
    Collections.prototype.retrieve = function (options) {
        if (options === void 0) { options = {}; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this.apiCall.get(RESOURCEPATH, options)];
            });
        });
    };
    Object.defineProperty(Collections, "RESOURCEPATH", {
        get: function () {
            return RESOURCEPATH;
        },
        enumerable: false,
        configurable: true
    });
    return Collections;
}());
exports.default = Collections;
//# sourceMappingURL=Collections.js.map