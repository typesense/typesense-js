"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var NLSearchModels_1 = tslib_1.__importDefault(require("./NLSearchModels"));
var NLSearchModel = /** @class */ (function () {
    function NLSearchModel(id, apiCall) {
        this.id = id;
        this.apiCall = apiCall;
    }
    NLSearchModel.prototype.retrieve = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this.apiCall.get(this.endpointPath())];
            });
        });
    };
    NLSearchModel.prototype.update = function (schema) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this.apiCall.put(this.endpointPath(), schema)];
            });
        });
    };
    NLSearchModel.prototype.delete = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this.apiCall.delete(this.endpointPath())];
            });
        });
    };
    NLSearchModel.prototype.endpointPath = function () {
        return "".concat(NLSearchModels_1.default.RESOURCEPATH, "/").concat(encodeURIComponent(this.id));
    };
    return NLSearchModel;
}());
exports.default = NLSearchModel;
//# sourceMappingURL=NLSearchModel.js.map