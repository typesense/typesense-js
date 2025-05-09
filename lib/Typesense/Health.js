"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const RESOURCEPATH = "/health";
class Health {
    constructor(apiCall) {
        this.apiCall = apiCall;
    }
    async retrieve() {
        return this.apiCall.get(RESOURCEPATH);
    }
}
exports.default = Health;
//# sourceMappingURL=Health.js.map