"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var RESOURCEPATH = "/metrics.json";
var Metrics = /** @class */ (function () {
    function Metrics(apiCall) {
        this.apiCall = apiCall;
    }
    /**
     * Get current RAM, CPU, Disk & Network usage metrics.
     *
     * @example
     * await client.metrics.retrieve()
     *
     * @see https://typesense.org/docs/latest/api/cluster-operations.html
     */
    Metrics.prototype.retrieve = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this.apiCall.get(RESOURCEPATH)];
            });
        });
    };
    return Metrics;
}());
exports.default = Metrics;
//# sourceMappingURL=Metrics.js.map