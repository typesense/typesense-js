"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Document = void 0;
const tslib_1 = require("tslib");
const Collections_1 = tslib_1.__importDefault(require("./Collections"));
const Documents_1 = tslib_1.__importDefault(require("./Documents"));
class Document {
    constructor(collectionName, documentId, apiCall) {
        this.collectionName = collectionName;
        this.documentId = documentId;
        this.apiCall = apiCall;
    }
    async retrieve() {
        return this.apiCall.get(this.endpointPath());
    }
    async delete(options) {
        return this.apiCall.delete(this.endpointPath(), options);
    }
    async update(partialDocument, options = {}) {
        return this.apiCall.patch(this.endpointPath(), partialDocument, options);
    }
    endpointPath() {
        return `${Collections_1.default.RESOURCEPATH}/${encodeURIComponent(this.collectionName)}${Documents_1.default.RESOURCEPATH}/${encodeURIComponent(this.documentId)}`;
    }
}
exports.Document = Document;
//# sourceMappingURL=Document.js.map