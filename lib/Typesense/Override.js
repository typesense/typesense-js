"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Collections_1 = tslib_1.__importDefault(require("./Collections"));
const Overrides_1 = tslib_1.__importDefault(require("./Overrides"));
class Override {
    constructor(collectionName, overrideId, apiCall) {
        this.collectionName = collectionName;
        this.overrideId = overrideId;
        this.apiCall = apiCall;
    }
    async retrieve() {
        return this.apiCall.get(this.endpointPath());
    }
    async delete() {
        return this.apiCall.delete(this.endpointPath());
    }
    endpointPath() {
        return `${Collections_1.default.RESOURCEPATH}/${encodeURIComponent(this.collectionName)}${Overrides_1.default.RESOURCEPATH}/${encodeURIComponent(this.overrideId)}`;
    }
}
exports.default = Override;
//# sourceMappingURL=Override.js.map