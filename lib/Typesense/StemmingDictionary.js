"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const StemmingDictionaries_1 = tslib_1.__importDefault(require("./StemmingDictionaries"));
class StemmingDictionary {
    constructor(id, apiCall) {
        this.id = id;
        this.apiCall = apiCall;
    }
    async retrieve() {
        return this.apiCall.get(this.endpointPath());
    }
    endpointPath() {
        return `${StemmingDictionaries_1.default.RESOURCEPATH}/${encodeURIComponent(this.id)}`;
    }
}
exports.default = StemmingDictionary;
//# sourceMappingURL=StemmingDictionary.js.map