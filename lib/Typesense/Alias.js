"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Aliases_1 = tslib_1.__importDefault(require("./Aliases"));
class Alias {
    constructor(name, apiCall) {
        this.name = name;
        this.apiCall = apiCall;
    }
    async retrieve() {
        return this.apiCall.get(this.endpointPath());
    }
    async delete() {
        return this.apiCall.delete(this.endpointPath());
    }
    endpointPath() {
        return `${Aliases_1.default.RESOURCEPATH}/${encodeURIComponent(this.name)}`;
    }
}
exports.default = Alias;
//# sourceMappingURL=Alias.js.map