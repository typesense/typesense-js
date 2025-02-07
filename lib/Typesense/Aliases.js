"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const RESOURCEPATH = "/aliases";
class Aliases {
    constructor(apiCall) {
        this.apiCall = apiCall;
    }
    async upsert(name, mapping) {
        return this.apiCall.put(this.endpointPath(name), mapping);
    }
    async retrieve() {
        return this.apiCall.get(RESOURCEPATH);
    }
    endpointPath(aliasName) {
        return `${Aliases.RESOURCEPATH}/${encodeURIComponent(aliasName)}`;
    }
    static get RESOURCEPATH() {
        return RESOURCEPATH;
    }
}
exports.default = Aliases;
//# sourceMappingURL=Aliases.js.map