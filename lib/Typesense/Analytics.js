"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const AnalyticsRules_1 = tslib_1.__importDefault(require("./AnalyticsRules"));
const AnalyticsRule_1 = tslib_1.__importDefault(require("./AnalyticsRule"));
const AnalyticsEvents_1 = tslib_1.__importDefault(require("./AnalyticsEvents"));
const RESOURCEPATH = "/analytics";
class Analytics {
    constructor(apiCall) {
        this.apiCall = apiCall;
        this.individualAnalyticsRules = {};
        this.apiCall = apiCall;
        this._analyticsRules = new AnalyticsRules_1.default(this.apiCall);
        this._analyticsEvents = new AnalyticsEvents_1.default(this.apiCall);
    }
    rules(id) {
        if (id === undefined) {
            return this._analyticsRules;
        }
        else {
            if (this.individualAnalyticsRules[id] === undefined) {
                this.individualAnalyticsRules[id] = new AnalyticsRule_1.default(id, this.apiCall);
            }
            return this.individualAnalyticsRules[id];
        }
    }
    events() {
        return this._analyticsEvents;
    }
    static get RESOURCEPATH() {
        return RESOURCEPATH;
    }
}
exports.default = Analytics;
//# sourceMappingURL=Analytics.js.map