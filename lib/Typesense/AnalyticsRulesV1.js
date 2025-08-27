"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var RESOURCEPATH = "/analytics/rules";
var AnalyticsRulesV1 = /** @class */ (function () {
    function AnalyticsRulesV1(apiCall) {
        this.apiCall = apiCall;
        this.apiCall = apiCall;
    }
    AnalyticsRulesV1.prototype.upsert = function (name, params) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this.apiCall.put(this.endpointPath(name), params)];
            });
        });
    };
    AnalyticsRulesV1.prototype.retrieve = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this.apiCall.get(this.endpointPath())];
            });
        });
    };
    AnalyticsRulesV1.prototype.endpointPath = function (operation) {
        return "".concat(AnalyticsRulesV1.RESOURCEPATH).concat(operation === undefined ? "" : "/" + encodeURIComponent(operation));
    };
    Object.defineProperty(AnalyticsRulesV1, "RESOURCEPATH", {
        get: function () {
            return RESOURCEPATH;
        },
        enumerable: false,
        configurable: true
    });
    return AnalyticsRulesV1;
}());
exports.default = AnalyticsRulesV1;
//# sourceMappingURL=AnalyticsRulesV1.js.map