"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var RESOURCEPATH = "/aliases";
var Aliases = /** @class */ (function () {
    function Aliases(apiCall) {
        this.apiCall = apiCall;
    }
    /**
     * Create or update a collection alias.
     *
     * @example
     * await client.aliases().upsert("my-alias", { collection_name: "products" })
     *
     * @see https://typesense.org/docs/latest/api/collection-alias.html#create-or-update-an-alias
     */
    Aliases.prototype.upsert = function (name, mapping) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this.apiCall.put(this.endpointPath(name), mapping)];
            });
        });
    };
    /**
     * List all aliases and the corresponding collections that they map to.
     *
     * @example
     * await client.aliases().retrieve()
     *
     * @see https://typesense.org/docs/latest/api/collection-alias.html#list-all-aliases
     */
    Aliases.prototype.retrieve = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this.apiCall.get(RESOURCEPATH)];
            });
        });
    };
    Aliases.prototype.endpointPath = function (aliasName) {
        return "".concat(Aliases.RESOURCEPATH, "/").concat(encodeURIComponent(aliasName));
    };
    Object.defineProperty(Aliases, "RESOURCEPATH", {
        get: function () {
            return RESOURCEPATH;
        },
        enumerable: false,
        configurable: true
    });
    return Aliases;
}());
exports.default = Aliases;
//# sourceMappingURL=Aliases.js.map