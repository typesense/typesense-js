"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var RESOURCEPATH = "/debug";
var Debug = /** @class */ (function () {
    function Debug(apiCall) {
        this.apiCall = apiCall;
    }
    /**
     * Retrieve server version and state information.
     *
     * @example
     * await client.debug.retrieve()
     *
     * @see https://typesense.org/docs/latest/api/cluster-operations.html#debug
     */
    Debug.prototype.retrieve = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this.apiCall.get(RESOURCEPATH)];
            });
        });
    };
    return Debug;
}());
exports.default = Debug;
//# sourceMappingURL=Debug.js.map