"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var Collections_1 = tslib_1.__importDefault(require("./Collections"));
var Overrides_1 = tslib_1.__importDefault(require("./Overrides"));
var Override = /** @class */ (function () {
    function Override(collectionName, overrideId, apiCall) {
        this.collectionName = collectionName;
        this.overrideId = overrideId;
        this.apiCall = apiCall;
    }
    /**
     * Retrieve an override (curation rule) by ID on this collection.
     *
     * @example
     * await client.collections("products").overrides("promote-hat").retrieve()
     *
     * @see https://typesense.org/docs/latest/api/curation.html
     */
    Override.prototype.retrieve = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this.apiCall.get(this.endpointPath())];
            });
        });
    };
    /**
     * Delete an override (curation rule) by ID on this collection.
     *
     * @example
     * await client.collections("products").overrides("promote-hat").delete()
     *
     * @see https://typesense.org/docs/latest/api/curation.html
     */
    Override.prototype.delete = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this.apiCall.delete(this.endpointPath())];
            });
        });
    };
    Override.prototype.endpointPath = function () {
        return "".concat(Collections_1.default.RESOURCEPATH, "/").concat(encodeURIComponent(this.collectionName)).concat(Overrides_1.default.RESOURCEPATH, "/").concat(encodeURIComponent(this.overrideId));
    };
    return Override;
}());
exports.default = Override;
//# sourceMappingURL=Override.js.map