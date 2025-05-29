"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var crypto_1 = require("crypto");
var Utils_1 = require("./Utils");
var RESOURCEPATH = "/keys";
var Keys = /** @class */ (function () {
    function Keys(apiCall) {
        this.apiCall = apiCall;
        this.apiCall = apiCall;
    }
    Keys.prototype.create = function (params) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this.apiCall.post(Keys.RESOURCEPATH, params)];
            });
        });
    };
    Keys.prototype.retrieve = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this.apiCall.get(RESOURCEPATH)];
            });
        });
    };
    Keys.prototype.generateScopedSearchKey = function (searchKey, parameters) {
        // Note: only a key generated with the `documents:search` action will be
        // accepted by the server, when used with the search endpoint.
        var normalizedParams = (0, Utils_1.normalizeArrayableParams)(parameters);
        var paramsJSON = JSON.stringify(normalizedParams);
        var digest = Buffer.from((0, crypto_1.createHmac)("sha256", searchKey).update(paramsJSON).digest("base64"));
        var keyPrefix = searchKey.substr(0, 4);
        var rawScopedKey = "".concat(digest).concat(keyPrefix).concat(paramsJSON);
        return Buffer.from(rawScopedKey).toString("base64");
    };
    Object.defineProperty(Keys, "RESOURCEPATH", {
        get: function () {
            return RESOURCEPATH;
        },
        enumerable: false,
        configurable: true
    });
    return Keys;
}());
exports.default = Keys;
//# sourceMappingURL=Keys.js.map