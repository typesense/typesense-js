"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var CurationSets_1 = tslib_1.__importDefault(require("./CurationSets"));
var CurationSetItem = /** @class */ (function () {
    function CurationSetItem(name, itemId, apiCall) {
        this.name = name;
        this.itemId = itemId;
        this.apiCall = apiCall;
    }
    CurationSetItem.prototype.retrieve = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this.apiCall.get(this.endpointPath())];
            });
        });
    };
    CurationSetItem.prototype.upsert = function (params) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this.apiCall.put(this.endpointPath(), params)];
            });
        });
    };
    CurationSetItem.prototype.delete = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this.apiCall.delete(this.endpointPath())];
            });
        });
    };
    CurationSetItem.prototype.endpointPath = function () {
        return "".concat(CurationSets_1.default.RESOURCEPATH, "/").concat(encodeURIComponent(this.name), "/items/").concat(encodeURIComponent(this.itemId));
    };
    return CurationSetItem;
}());
exports.default = CurationSetItem;
//# sourceMappingURL=CurationSetItem.js.map