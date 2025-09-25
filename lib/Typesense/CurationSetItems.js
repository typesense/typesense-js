"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var CurationSets_1 = tslib_1.__importDefault(require("./CurationSets"));
var CurationSetItems = /** @class */ (function () {
    function CurationSetItems(name, apiCall) {
        this.name = name;
        this.apiCall = apiCall;
    }
    CurationSetItems.prototype.retrieve = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this.apiCall.get(this.endpointPath())];
            });
        });
    };
    CurationSetItems.prototype.endpointPath = function (operation) {
        return "".concat(CurationSets_1.default.RESOURCEPATH, "/").concat(encodeURIComponent(this.name), "/items").concat(operation === undefined ? "" : "/" + encodeURIComponent(operation));
    };
    return CurationSetItems;
}());
exports.default = CurationSetItems;
//# sourceMappingURL=CurationSetItems.js.map