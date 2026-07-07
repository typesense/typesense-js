"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var RESOURCEPATH = "/operations";
var Operations = /** @class */ (function () {
    function Operations(apiCall) {
        this.apiCall = apiCall;
    }
    /**
     * Perform a cluster operation: snapshot, vote, cache/clear, db/compact, or a custom path.
     *
     * @example
     * await client.operations.perform("snapshot", { snapshot_path: "/tmp/snap" })
     *
     * @see https://typesense.org/docs/latest/api/cluster-operations.html
     */
    Operations.prototype.perform = function (operationName_1) {
        return tslib_1.__awaiter(this, arguments, void 0, function (operationName, queryParameters) {
            if (queryParameters === void 0) { queryParameters = {}; }
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this.apiCall.post("".concat(RESOURCEPATH, "/").concat(operationName), {}, queryParameters)];
            });
        });
    };
    /**
     * Get the status of in-progress schema change operations
     *
     * @example
     * await client.operations.getSchemaChanges()
     *
     * @see https://typesense.org/docs/latest/api/cluster-operations.html
     */
    Operations.prototype.getSchemaChanges = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this.apiCall.get("".concat(RESOURCEPATH, "/schema_changes"))];
            });
        });
    };
    return Operations;
}());
exports.default = Operations;
//# sourceMappingURL=Operations.js.map