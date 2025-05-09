"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Collections_1 = tslib_1.__importDefault(require("./Collections"));
const RESOURCEPATH = "/synonyms";
class Synonyms {
    constructor(collectionName, apiCall) {
        this.collectionName = collectionName;
        this.apiCall = apiCall;
    }
    async upsert(synonymId, params) {
        return this.apiCall.put(this.endpointPath(synonymId), params);
    }
    async retrieve() {
        return this.apiCall.get(this.endpointPath());
    }
    endpointPath(operation) {
        return `${Collections_1.default.RESOURCEPATH}/${encodeURIComponent(this.collectionName)}${Synonyms.RESOURCEPATH}${operation === undefined ? "" : "/" + encodeURIComponent(operation)}`;
    }
    static get RESOURCEPATH() {
        return RESOURCEPATH;
    }
}
exports.default = Synonyms;
//# sourceMappingURL=Synonyms.js.map