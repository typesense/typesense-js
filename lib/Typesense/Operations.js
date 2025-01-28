"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var RESOURCEPATH = "/operations";
var Operations = /** @class */ (function () {
    function Operations(apiCall) {
        this.apiCall = apiCall;
    }
    Operations.prototype.perform = function (operationName_1) {
        return tslib_1.__awaiter(this, arguments, void 0, function (
        // eslint-disable-next-line @typescript-eslint/ban-types -- Can't use `object` here, it needs to intersect with `{}`
        operationName, queryParameters) {
            if (queryParameters === void 0) { queryParameters = {}; }
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this.apiCall.post("".concat(RESOURCEPATH, "/").concat(operationName), {}, queryParameters)];
            });
        });
    };
    return Operations;
}());
exports.default = Operations;
//# sourceMappingURL=Operations.js.map