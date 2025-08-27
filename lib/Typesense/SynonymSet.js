"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var SynonymSets_1 = tslib_1.__importDefault(require("./SynonymSets"));
var SynonymSetItems_1 = tslib_1.__importDefault(require("./SynonymSetItems"));
var SynonymSetItem_1 = tslib_1.__importDefault(require("./SynonymSetItem"));
var SynonymSet = /** @class */ (function () {
    function SynonymSet(synonymSetName, apiCall) {
        this.synonymSetName = synonymSetName;
        this.apiCall = apiCall;
        this.individualItems = {};
        this._items = new SynonymSetItems_1.default(this.synonymSetName, apiCall);
    }
    SynonymSet.prototype.upsert = function (params) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this.apiCall.put(this.endpointPath(), params)];
            });
        });
    };
    SynonymSet.prototype.retrieve = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this.apiCall.get(this.endpointPath())];
            });
        });
    };
    SynonymSet.prototype.delete = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this.apiCall.delete(this.endpointPath())];
            });
        });
    };
    SynonymSet.prototype.items = function (itemId) {
        if (itemId === undefined) {
            return this._items;
        }
        else {
            if (this.individualItems[itemId] === undefined) {
                this.individualItems[itemId] = new SynonymSetItem_1.default(this.synonymSetName, itemId, this.apiCall);
            }
            return this.individualItems[itemId];
        }
    };
    SynonymSet.prototype.endpointPath = function () {
        return "".concat(SynonymSets_1.default.RESOURCEPATH, "/").concat(encodeURIComponent(this.synonymSetName));
    };
    return SynonymSet;
}());
exports.default = SynonymSet;
//# sourceMappingURL=SynonymSet.js.map