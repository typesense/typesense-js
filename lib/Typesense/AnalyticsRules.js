"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var RESOURCEPATH = "/analytics/rules";
var AnalyticsRules = /** @class */ (function () {
    function AnalyticsRules(apiCall) {
        this.apiCall = apiCall;
        this.apiCall = apiCall;
    }
    AnalyticsRules.prototype.create = function (params) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this.apiCall.post(this.endpointPath(), params, {}, {})];
            });
        });
    };
    AnalyticsRules.prototype.upsert = function (name, params) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this.apiCall.put(this.endpointPath(name), params)];
            });
        });
    };
    AnalyticsRules.prototype.retrieve = function (ruleTag) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var query;
            return tslib_1.__generator(this, function (_a) {
                query = {};
                if (ruleTag) {
                    query["rule_tag"] = ruleTag;
                }
                return [2 /*return*/, this.apiCall.get(this.endpointPath(), query)];
            });
        });
    };
    AnalyticsRules.prototype.endpointPath = function (operation) {
        return "".concat(AnalyticsRules.RESOURCEPATH).concat(operation === undefined ? "" : "/" + encodeURIComponent(operation));
    };
    Object.defineProperty(AnalyticsRules, "RESOURCEPATH", {
        get: function () {
            return RESOURCEPATH;
        },
        enumerable: false,
        configurable: true
    });
    return AnalyticsRules;
}());
exports.default = AnalyticsRules;
//# sourceMappingURL=AnalyticsRules.js.map