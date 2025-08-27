"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var AnalyticsRulesV1_1 = tslib_1.__importDefault(require("./AnalyticsRulesV1"));
var AnalyticsRuleV1_1 = tslib_1.__importDefault(require("./AnalyticsRuleV1"));
var AnalyticsEvents_1 = tslib_1.__importDefault(require("./AnalyticsEvents"));
var RESOURCEPATH = "/analytics";
/**
 * @deprecated Deprecated starting with Typesense Server v30. Please migrate to `client.analytics` (new Analytics APIs).
 */
var AnalyticsV1 = /** @class */ (function () {
    function AnalyticsV1(apiCall) {
        this.apiCall = apiCall;
        this.individualAnalyticsRules = {};
        this.apiCall = apiCall;
        this._analyticsRules = new AnalyticsRulesV1_1.default(this.apiCall);
        this._analyticsEvents = new AnalyticsEvents_1.default(this.apiCall);
    }
    AnalyticsV1.prototype.rules = function (id) {
        if (!AnalyticsV1.hasWarnedDeprecation) {
            // eslint-disable-next-line no-console
            console.warn("[typesense] 'analyticsV1' is deprecated starting with Typesense Server v30 and will be removed in a future release. Please use 'analytics' instead.");
            AnalyticsV1.hasWarnedDeprecation = true;
        }
        if (id === undefined) {
            return this._analyticsRules;
        }
        else {
            if (this.individualAnalyticsRules[id] === undefined) {
                this.individualAnalyticsRules[id] = new AnalyticsRuleV1_1.default(id, this.apiCall);
            }
            return this.individualAnalyticsRules[id];
        }
    };
    AnalyticsV1.prototype.events = function () {
        return this._analyticsEvents;
    };
    Object.defineProperty(AnalyticsV1, "RESOURCEPATH", {
        get: function () {
            return RESOURCEPATH;
        },
        enumerable: false,
        configurable: true
    });
    AnalyticsV1.hasWarnedDeprecation = false;
    return AnalyticsV1;
}());
exports.default = AnalyticsV1;
//# sourceMappingURL=AnalyticsV1.js.map