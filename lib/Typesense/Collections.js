"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const RESOURCEPATH = "/collections";
class Collections {
    constructor(apiCall) {
        this.apiCall = apiCall;
    }
    async create(schema, options) {
        return this.apiCall.post(RESOURCEPATH, schema, options);
    }
    async retrieve(options = {}) {
        return this.apiCall.get(RESOURCEPATH, options);
    }
    static get RESOURCEPATH() {
        return RESOURCEPATH;
    }
}
exports.default = Collections;
//# sourceMappingURL=Collections.js.map