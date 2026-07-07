"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var RESOURCEPATH = "/analytics/events";
var AnalyticsEvents = /** @class */ (function () {
    function AnalyticsEvents(apiCall) {
        this.apiCall = apiCall;
        this.apiCall = apiCall;
    }
    /**
     * Submit a single analytics event. The event must correspond to an existing analytics rule by name.
     *
     * @example
     * await client.analytics.events().create({ type: "click", name: "products_click", data: {} })
     *
     * @see https://typesense.org/docs/latest/api/analytics-query-suggestions.html
     */
    AnalyticsEvents.prototype.create = function (params) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this.apiCall.post(this.endpointPath(), params)];
            });
        });
    };
    /**
     * Retrieve the most recent events for a user and rule.
     *
     * @example
     * await client.analytics.events().retrieve({ user_id: "u1", name: "products_click", n: 10 })
     *
     * @see https://typesense.org/docs/latest/api/analytics-query-suggestions.html
     */
    AnalyticsEvents.prototype.retrieve = function (params) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this.apiCall.get(this.endpointPath(), params)];
            });
        });
    };
    AnalyticsEvents.prototype.endpointPath = function (operation) {
        return "".concat(AnalyticsEvents.RESOURCEPATH).concat(operation === undefined ? "" : "/" + encodeURIComponent(operation));
    };
    Object.defineProperty(AnalyticsEvents, "RESOURCEPATH", {
        get: function () {
            return RESOURCEPATH;
        },
        enumerable: false,
        configurable: true
    });
    return AnalyticsEvents;
}());
exports.default = AnalyticsEvents;
//# sourceMappingURL=AnalyticsEvents.js.map