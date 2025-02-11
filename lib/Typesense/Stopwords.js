"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const RESOURCEPATH = "/stopwords";
class Stopwords {
    constructor(apiCall) {
        this.apiCall = apiCall;
    }
    async upsert(stopwordId, params) {
        return this.apiCall.put(this.endpointPath(stopwordId), params);
    }
    async retrieve() {
        return this.apiCall.get(this.endpointPath());
    }
    endpointPath(operation) {
        return `${Stopwords.RESOURCEPATH}${operation === undefined ? "" : "/" + encodeURIComponent(operation)}`;
    }
    static get RESOURCEPATH() {
        return RESOURCEPATH;
    }
}
exports.default = Stopwords;
//# sourceMappingURL=Stopwords.js.map