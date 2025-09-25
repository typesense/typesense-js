"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var CurationSets = /** @class */ (function () {
    function CurationSets(apiCall) {
        this.apiCall = apiCall;
    }
    CurationSets.prototype.retrieve = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this.apiCall.get(CurationSets.RESOURCEPATH)];
            });
        });
    };
    CurationSets.RESOURCEPATH = "/curation_sets";
    return CurationSets;
}());
exports.default = CurationSets;
//# sourceMappingURL=CurationSets.js.map