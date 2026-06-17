"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var Presets_1 = tslib_1.__importDefault(require("./Presets"));
var Preset = /** @class */ (function () {
    function Preset(presetId, apiCall) {
        this.presetId = presetId;
        this.apiCall = apiCall;
    }
    /**
     * Retrieve the details of a preset, given it's name.
     *
     * @example
     * await client.presets("listing_view").retrieve()
     *
     * @see https://typesense.org/docs/latest/api/search.html#presets
     */
    Preset.prototype.retrieve = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this.apiCall.get(this.endpointPath())];
            });
        });
    };
    /**
     * Permanently deletes a preset, given it's name.
     *
     * @example
     * await client.presets("listing_view").delete()
     *
     * @see https://typesense.org/docs/latest/api/search.html#presets
     */
    Preset.prototype.delete = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this.apiCall.delete(this.endpointPath())];
            });
        });
    };
    Preset.prototype.endpointPath = function () {
        return "".concat(Presets_1.default.RESOURCEPATH, "/").concat(encodeURIComponent(this.presetId));
    };
    return Preset;
}());
exports.default = Preset;
//# sourceMappingURL=Preset.js.map