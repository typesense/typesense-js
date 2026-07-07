"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var RESOURCEPATH = "/collections";
var Collections = /** @class */ (function () {
    function Collections(apiCall) {
        this.apiCall = apiCall;
    }
    /**
     * When a collection is created, we give it a name and describe the fields that will be indexed from the documents added to the collection.
     *
     * @example
     * await client.collections().create({ name: "products", fields: [{ name: "title", type: "string" }] })
     *
     * @see https://typesense.org/docs/latest/api/collections.html#create-a-collection
     */
    Collections.prototype.create = function (schema, options) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this.apiCall.post(RESOURCEPATH, schema, options)];
            });
        });
    };
    /**
     * Returns a summary of all your collections. The collections are returned sorted by creation date, with the most recent collections appearing first.
     *
     * @example
     * await client.collections().retrieve()
     *
     * @see https://typesense.org/docs/latest/api/collections.html#list-all-collections
     */
    Collections.prototype.retrieve = function () {
        return tslib_1.__awaiter(this, arguments, void 0, function (options) {
            if (options === void 0) { options = {}; }
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