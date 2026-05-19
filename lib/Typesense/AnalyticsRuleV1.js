"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var AnalyticsRulesV1_1 = tslib_1.__importDefault(require("./AnalyticsRulesV1"));
var AnalyticsRuleV1 = /** @class */ (function () {
    function AnalyticsRuleV1(name, apiCall) {
        this.name = name;
        this.apiCall = apiCall;
    }
    /**
     * Retrieve a legacy v1 analytics rule by name.
     *
     * @example
     * await client.analyticsV1.rules("rule-1").retrieve()
     *
     * @see https://typesense.org/docs/29.0/api/analytics-query-suggestions.html
     */
    AnalyticsRuleV1.prototype.retrieve = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this.apiCall.get(this.endpointPath())];
            });
        });
    };
    /**
     * Delete a legacy v1 analytics rule by name.
     *
     * @example
     * await client.analyticsV1.rules("rule-1").delete()
     *
     * @see https://typesense.org/docs/29.0/api/analytics-query-suggestions.html
     */
    AnalyticsRuleV1.prototype.delete = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this.apiCall.delete(this.endpointPath())];
            });
        });
    };
    AnalyticsRuleV1.prototype.endpointPath = function () {
        return "".concat(AnalyticsRulesV1_1.default.RESOURCEPATH, "/").concat(encodeURIComponent(this.name));
    };
    return AnalyticsRuleV1;
}());
exports.default = AnalyticsRuleV1;
//# sourceMappingURL=AnalyticsRuleV1.js.map