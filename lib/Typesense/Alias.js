"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var Aliases_1 = tslib_1.__importDefault(require("./Aliases"));
var Alias = /** @class */ (function () {
    function Alias(name, apiCall) {
        this.name = name;
        this.apiCall = apiCall;
    }
    /**
     * Find out which collection an alias points to by fetching it
     *
     * @example
     * await client.aliases("my-alias").retrieve()
     *
     * @see https://typesense.org/docs/latest/api/collection-alias.html#retrieve-an-alias
     */
    Alias.prototype.retrieve = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this.apiCall.get(this.endpointPath())];
            });
        });
    };
    /**
     * Delete an alias
     *
     * @example
     * await client.aliases("my-alias").delete()
     *
     * @see https://typesense.org/docs/latest/api/collection-alias.html#delete-an-alias
     */
    Alias.prototype.delete = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this.apiCall.delete(this.endpointPath())];
            });
        });
    };
    Alias.prototype.endpointPath = function () {
        return "".concat(Aliases_1.default.RESOURCEPATH, "/").concat(encodeURIComponent(this.name));
    };
    return Alias;
}());
exports.default = Alias;
//# sourceMappingURL=Alias.js.map