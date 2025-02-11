"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const RESOURCEPATH = "/analytics/rules";
class AnalyticsRules {
    constructor(apiCall) {
        this.apiCall = apiCall;
        this.apiCall = apiCall;
    }
    async upsert(name, params) {
        return this.apiCall.put(this.endpointPath(name), params);
    }
    async retrieve() {
        return this.apiCall.get(this.endpointPath());
    }
    endpointPath(operation) {
        return `${AnalyticsRules.RESOURCEPATH}${operation === undefined ? "" : "/" + encodeURIComponent(operation)}`;
    }
    static get RESOURCEPATH() {
        return RESOURCEPATH;
    }
}
exports.default = AnalyticsRules;
//# sourceMappingURL=AnalyticsRules.js.map