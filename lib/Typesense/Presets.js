"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var Utils_1 = require("./Utils");
var RESOURCEPATH = "/presets";
var Presets = /** @class */ (function () {
    function Presets(apiCall) {
        this.apiCall = apiCall;
    }
    Presets.prototype.upsert = function (presetId, params) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var normalizedParams_1, normalizedParams;
            return tslib_1.__generator(this, function (_a) {
                if (typeof params.value === "object" && "searches" in params.value) {
                    normalizedParams_1 = params.value.searches.map(function (search) {
                        return (0, Utils_1.normalizeArrayableParams)(search);
                    });
                    return [2 /*return*/, this.apiCall.put(this.endpointPath(presetId), {
                            value: { searches: normalizedParams_1 },
                        })];
                }
                normalizedParams = (0, Utils_1.normalizeArrayableParams)(params.value);
                return [2 /*return*/, this.apiCall.put(this.endpointPath(presetId), {
                        value: normalizedParams,
                    })];
            });
        });
    };
    Presets.prototype.retrieve = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this.apiCall.get(this.endpointPath())];
            });
        });
    };
    Presets.prototype.endpointPath = function (operation) {
        return "".concat(Presets.RESOURCEPATH).concat(operation === undefined ? "" : "/" + encodeURIComponent(operation));
    };
    Object.defineProperty(Presets, "RESOURCEPATH", {
        get: function () {
            return RESOURCEPATH;
        },
        enumerable: false,
        configurable: true
    });
    return Presets;
}());
exports.default = Presets;
//# sourceMappingURL=Presets.js.map