"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var RESOURCEPATH = '/health';
var Health = /** @class */ (function () {
    function Health(apiCall) {
        this.apiCall = apiCall;
    }
    Health.prototype.retrieve = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this.apiCall.get(RESOURCEPATH)];
            });
        });
    };
    return Health;
}());
exports.default = Health;
//# sourceMappingURL=Health.js.map