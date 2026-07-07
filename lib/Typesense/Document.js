"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Document = void 0;
var tslib_1 = require("tslib");
var Collections_1 = tslib_1.__importDefault(require("./Collections"));
var Documents_1 = tslib_1.__importDefault(require("./Documents"));
var Utils_1 = require("./Utils");
var Document = /** @class */ (function () {
    function Document(collectionName, documentId, apiCall) {
        this.collectionName = collectionName;
        this.documentId = documentId;
        this.apiCall = apiCall;
    }
    /**
     * Fetch an individual document from a collection by using its ID.
     *
     * @example
     * await client.collections("products").documents("1").retrieve()
     *
     * @see https://typesense.org/docs/latest/api/documents.html#retrieve-a-document
     */
    Document.prototype.retrieve = function (options) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var queryParams;
            return tslib_1.__generator(this, function (_a) {
                queryParams = (0, Utils_1.normalizeArrayableParams)(options !== null && options !== void 0 ? options : {});
                return [2 /*return*/, this.apiCall.get(this.endpointPath(), queryParams)];
            });
        });
    };
    /**
     * Delete an individual document from a collection by using its ID.
     *
     * @example
     * await client.collections("products").documents("1").delete()
     *
     * @see https://typesense.org/docs/latest/api/documents.html#delete-a-document
     */
    Document.prototype.delete = function (options) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this.apiCall.delete(this.endpointPath(), options)];
            });
        });
    };
    /**
     * Update an individual document by ID by merging the provided fields.
     *
     * @example
     * await client.collections("products").documents("1").update({ in_stock: true })
     *
     * @see https://typesense.org/docs/latest/api/documents.html#update-a-document
     */
    Document.prototype.update = function (partialDocument_1) {
        return tslib_1.__awaiter(this, arguments, void 0, function (partialDocument, options) {
            if (options === void 0) { options = {}; }
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this.apiCall.patch(this.endpointPath(), partialDocument, options)];
            });
        });
    };
    Document.prototype.endpointPath = function () {
        return "".concat(Collections_1.default.RESOURCEPATH, "/").concat(encodeURIComponent(this.collectionName)).concat(Documents_1.default.RESOURCEPATH, "/").concat(encodeURIComponent(this.documentId));
    };
    return Document;
}());
exports.Document = Document;
//# sourceMappingURL=Document.js.map