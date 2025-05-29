"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Keys_1 = tslib_1.__importDefault(require("./Keys"));
class Key {
    constructor(id, apiCall) {
        this.id = id;
        this.apiCall = apiCall;
    }
    async retrieve() {
        return this.apiCall.get(this.endpointPath());
    }
    async delete() {
        return this.apiCall.delete(this.endpointPath());
    }
    endpointPath() {
        return `${Keys_1.default.RESOURCEPATH}/${encodeURIComponent(this.id)}`;
    }
}
exports.default = Key;
//# sourceMappingURL=Key.js.map