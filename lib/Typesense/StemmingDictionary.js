"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var StemmingDictionaries_1 = tslib_1.__importDefault(require("./StemmingDictionaries"));
var StemmingDictionary = /** @class */ (function () {
    function StemmingDictionary(id, apiCall) {
        this.id = id;
        this.apiCall = apiCall;
    }
    StemmingDictionary.prototype.retrieve = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this.apiCall.get(this.endpointPath())];
            });
        });
    };
    StemmingDictionary.prototype.endpointPath = function () {
        return "".concat(StemmingDictionaries_1.default.RESOURCEPATH, "/").concat(encodeURIComponent(this.id));
    };
    return StemmingDictionary;
}());
exports.default = StemmingDictionary;
//# sourceMappingURL=StemmingDictionary.js.map