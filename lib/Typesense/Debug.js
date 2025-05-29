"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const RESOURCEPATH = "/debug";
class Debug {
    constructor(apiCall) {
        this.apiCall = apiCall;
    }
    async retrieve() {
        return this.apiCall.get(RESOURCEPATH);
    }
}
exports.default = Debug;
//# sourceMappingURL=Debug.js.map