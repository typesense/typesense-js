"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var CurationSets_1 = tslib_1.__importDefault(require("./CurationSets"));
var CurationSetItems_1 = tslib_1.__importDefault(require("./CurationSetItems"));
var CurationSetItem_1 = tslib_1.__importDefault(require("./CurationSetItem"));
var CurationSet = /** @class */ (function () {
    function CurationSet(name, apiCall) {
        this.name = name;
        this.apiCall = apiCall;
        this.individualItems = {};
        this._items = new CurationSetItems_1.default(this.name, apiCall);
    }
    CurationSet.prototype.upsert = function (params) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this.apiCall.put(this.endpointPath(), params)];
            });
        });
    };
    CurationSet.prototype.retrieve = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this.apiCall.get(this.endpointPath())];
            });
        });
    };
    CurationSet.prototype.delete = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this.apiCall.delete(this.endpointPath())];
            });
        });
    };
    CurationSet.prototype.items = function (itemId) {
        if (itemId === undefined) {
            return this._items;
        }
        else {
            if (this.individualItems[itemId] === undefined) {
                this.individualItems[itemId] = new CurationSetItem_1.default(this.name, itemId, this.apiCall);
            }
            return this.individualItems[itemId];
        }
    };
    CurationSet.prototype.endpointPath = function () {
        return "".concat(CurationSets_1.default.RESOURCEPATH, "/").concat(encodeURIComponent(this.name));
    };
    return CurationSet;
}());
exports.default = CurationSet;
//# sourceMappingURL=CurationSet.js.map