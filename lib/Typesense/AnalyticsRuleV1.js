"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var AnalyticsRulesV1_1 = tslib_1.__importDefault(require("./AnalyticsRulesV1"));
var AnalyticsRuleV1 = /** @class */ (function () {
    function AnalyticsRuleV1(name, apiCall) {
        this.name = name;
        this.apiCall = apiCall;
    }
    AnalyticsRuleV1.prototype.retrieve = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this.apiCall.get(this.endpointPath())];
            });
        });
    };
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