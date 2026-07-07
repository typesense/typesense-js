"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var SynonymSets_1 = tslib_1.__importDefault(require("./SynonymSets"));
var SynonymSetItem = /** @class */ (function () {
    function SynonymSetItem(synonymSetName, itemId, apiCall) {
        this.synonymSetName = synonymSetName;
        this.itemId = itemId;
        this.apiCall = apiCall;
    }
    /**
     * Retrieve a specific synonym item by its id
     *
     * @example
     * await client.synonymSets("my-set").items("syn-1").retrieve()
     *
     * @see https://typesense.org/docs/latest/api/synonyms.html
     */
    SynonymSetItem.prototype.retrieve = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this.apiCall.get(this.endpointPath())];
            });
        });
    };
    /**
     * Delete a specific synonym item by its id
     *
     * @example
     * await client.synonymSets("my-set").items("syn-1").delete()
     *
     * @see https://typesense.org/docs/latest/api/synonyms.html
     */
    SynonymSetItem.prototype.delete = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this.apiCall.delete(this.endpointPath())];
            });
        });
    };
    SynonymSetItem.prototype.endpointPath = function () {
        return "".concat(SynonymSets_1.default.RESOURCEPATH, "/").concat(encodeURIComponent(this.synonymSetName), "/items/").concat(encodeURIComponent(this.itemId));
    };
    return SynonymSetItem;
}());
exports.default = SynonymSetItem;
//# sourceMappingURL=SynonymSetItem.js.map