"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var SynonymSets = /** @class */ (function () {
    function SynonymSets(apiCall) {
        this.apiCall = apiCall;
    }
    SynonymSets.prototype.retrieve = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this.apiCall.get(SynonymSets.RESOURCEPATH)];
            });
        });
    };
    SynonymSets.RESOURCEPATH = "/synonym_sets";
    return SynonymSets;
}());
exports.default = SynonymSets;
//# sourceMappingURL=SynonymSets.js.map