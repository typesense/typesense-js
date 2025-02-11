"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Stopwords_1 = tslib_1.__importDefault(require("./Stopwords"));
class Stopword {
    constructor(stopwordId, apiCall) {
        this.stopwordId = stopwordId;
        this.apiCall = apiCall;
    }
    async retrieve() {
        return this.apiCall.get(this.endpointPath());
    }
    async delete() {
        return this.apiCall.delete(this.endpointPath());
    }
    endpointPath() {
        return `${Stopwords_1.default.RESOURCEPATH}/${encodeURIComponent(this.stopwordId)}`;
    }
}
exports.default = Stopword;
//# sourceMappingURL=Stopword.js.map