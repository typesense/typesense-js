"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var AnalyticsRules_1 = __importDefault(require("./AnalyticsRules"));
var AnalyticsRule_1 = __importDefault(require("./AnalyticsRule"));
var RESOURCEPATH = "/analytics";
var Analytics = /** @class */ (function () {
    function Analytics(apiCall) {
        this.apiCall = apiCall;
        this.individualAnalyticsRules = {};
        this.apiCall = apiCall;
        this._analyticsRules = new AnalyticsRules_1.default(this.apiCall);
    }
    Analytics.prototype.rules = function (id) {
        if (id === undefined) {
            return this._analyticsRules;
        }
        else {
            if (this.individualAnalyticsRules[id] === undefined) {
                this.individualAnalyticsRules[id] = new AnalyticsRule_1.default(id, this.apiCall);
            }
            return this.individualAnalyticsRules[id];
        }
    };
    Object.defineProperty(Analytics, "RESOURCEPATH", {
        get: function () {
            return RESOURCEPATH;
        },
        enumerable: false,
        configurable: true
    });
    return Analytics;
}());
exports.default = Analytics;
//# sourceMappingURL=Analytics.js.map