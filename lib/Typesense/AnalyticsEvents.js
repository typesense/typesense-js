"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const RESOURCEPATH = "/analytics/events";
class AnalyticsEvents {
    constructor(apiCall) {
        this.apiCall = apiCall;
        this.apiCall = apiCall;
    }
    async create(params) {
        return this.apiCall.post(this.endpointPath(), params);
    }
    endpointPath(operation) {
        return `${AnalyticsEvents.RESOURCEPATH}${operation === undefined ? "" : "/" + encodeURIComponent(operation)}`;
    }
    static get RESOURCEPATH() {
        return RESOURCEPATH;
    }
}
exports.default = AnalyticsEvents;
//# sourceMappingURL=AnalyticsEvents.js.map