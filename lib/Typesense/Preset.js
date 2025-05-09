"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Presets_1 = tslib_1.__importDefault(require("./Presets"));
class Preset {
    constructor(presetId, apiCall) {
        this.presetId = presetId;
        this.apiCall = apiCall;
    }
    async retrieve() {
        return this.apiCall.get(this.endpointPath());
    }
    async delete() {
        return this.apiCall.delete(this.endpointPath());
    }
    endpointPath() {
        return `${Presets_1.default.RESOURCEPATH}/${encodeURIComponent(this.presetId)}`;
    }
}
exports.default = Preset;
//# sourceMappingURL=Preset.js.map