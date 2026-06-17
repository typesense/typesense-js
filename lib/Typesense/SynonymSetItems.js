"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var SynonymSets_1 = tslib_1.__importDefault(require("./SynonymSets"));
var SynonymSetItems = /** @class */ (function () {
    function SynonymSetItems(synonymSetName, apiCall) {
        this.synonymSetName = synonymSetName;
        this.apiCall = apiCall;
    }
    /**
     * Create or update a synonym set item with the given id
     *
     * @example
     * await client.synonymSets("my-set").items().upsert("syn-1", { synonyms: ["nyc", "new york"] })
     *
     * @see https://typesense.org/docs/latest/api/synonyms.html
     */
    SynonymSetItems.prototype.upsert = function (itemId, params) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this.apiCall.put(this.endpointPath(itemId), params)];
            });
        });
    };
    /**
     * Retrieve all synonym items in a set
     *
     * @example
     * await client.synonymSets("my-set").items().retrieve()
     *
     * @see https://typesense.org/docs/latest/api/synonyms.html
     */
    SynonymSetItems.prototype.retrieve = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this.apiCall.get(this.endpointPath())];
            });
        });
    };
    SynonymSetItems.prototype.endpointPath = function (operation) {
        return "".concat(SynonymSets_1.default.RESOURCEPATH, "/").concat(encodeURIComponent(this.synonymSetName), "/items").concat(operation === undefined ? "" : "/" + encodeURIComponent(operation));
    };
    return SynonymSetItems;
}());
exports.default = SynonymSetItems;
//# sourceMappingURL=SynonymSetItems.js.map