"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const AnalyticsRules_1 = tslib_1.__importDefault(require("./AnalyticsRules"));
class AnalyticsRule {
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
        return `${AnalyticsRules_1.default.RESOURCEPATH}/${encodeURIComponent(this.name)}`;
    }
}
exports.default = AnalyticsRule;
//# sourceMappingURL=AnalyticsRule.js.map