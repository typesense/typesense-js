"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var Keys_1 = tslib_1.__importDefault(require("./Keys"));
var Key = /** @class */ (function () {
    function Key(id, apiCall) {
        this.id = id;
        this.apiCall = apiCall;
    }
    /**
     * Retrieve (metadata about) a key. Only the key prefix is returned when you retrieve a key. Due to security reasons, only the create endpoint returns the full API key.
     *
     * @example
     * await client.keys(1).retrieve()
     *
     * @see https://typesense.org/docs/latest/api/api-keys.html#retrieve-an-api-key
     */
    Key.prototype.retrieve = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this.apiCall.get(this.endpointPath())];
            });
        });
    };
    /**
     * Delete an API key given its ID.
     *
     * @example
     * await client.keys(1).delete()
     *
     * @see https://typesense.org/docs/latest/api/api-keys.html#delete-api-key
     */
    Key.prototype.delete = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this.apiCall.delete(this.endpointPath())];
            });
        });
    };
    Key.prototype.endpointPath = function () {
        return "".concat(Keys_1.default.RESOURCEPATH, "/").concat(encodeURIComponent(this.id));
    };
    return Key;
}());
exports.default = Key;
//# sourceMappingURL=Key.js.map