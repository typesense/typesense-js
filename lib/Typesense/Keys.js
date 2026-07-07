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
    /**
     * Create an API Key with fine-grain access control. You can restrict access on both a per-collection and per-action level. The generated key is returned only during creation. You want to store this key carefully in a secure place.
     *
     * @example
     * await client.keys().create({ description: "Search-only key", actions: ["documents:search"], collections: ["*"] })
     *
     * @see https://typesense.org/docs/latest/api/api-keys.html#create-an-api-key
     */
    Keys.prototype.create = function (params) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this.apiCall.post(Keys.RESOURCEPATH, params)];
            });
        });
    };
    /**
     * Retrieve (metadata about) all keys.
     *
     * @example
     * await client.keys().retrieve()
     *
     * @see https://typesense.org/docs/latest/api/api-keys.html#list-all-keys
     */
    Keys.prototype.retrieve = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this.apiCall.get(RESOURCEPATH)];
            });
        });
    };
    /**
     * Generate a scoped search-only API key with embedded parameters such as `filter_by` or `expires_at`.
     *
     * @example
     * client.keys().generateScopedSearchKey("search-only-key", { filter_by: "company_id:124", expires_at: 1700000000 })
     *
     * @see https://typesense.org/docs/latest/api/api-keys.html#generate-scoped-search-key
     */
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