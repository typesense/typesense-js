"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Collections_1 = tslib_1.__importDefault(require("./Collections"));
const Synonyms_1 = tslib_1.__importDefault(require("./Synonyms"));
class Synonym {
    constructor(collectionName, synonymId, apiCall) {
        this.collectionName = collectionName;
        this.synonymId = synonymId;
        this.apiCall = apiCall;
    }
    async retrieve() {
        return this.apiCall.get(this.endpointPath());
    }
    async delete() {
        return this.apiCall.delete(this.endpointPath());
    }
    endpointPath() {
        return `${Collections_1.default.RESOURCEPATH}/${encodeURIComponent(this.collectionName)}${Synonyms_1.default.RESOURCEPATH}/${encodeURIComponent(this.synonymId)}`;
    }
}
exports.default = Synonym;
//# sourceMappingURL=Synonym.js.map