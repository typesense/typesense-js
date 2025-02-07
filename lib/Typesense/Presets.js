"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Utils_1 = require("./Utils");
const RESOURCEPATH = "/presets";
class Presets {
    constructor(apiCall) {
        this.apiCall = apiCall;
    }
    async upsert(presetId, params) {
        if (typeof params.value === "object" && "searches" in params.value) {
            const normalizedParams = params.value.searches.map((search) => (0, Utils_1.normalizeArrayableParams)(search));
            return this.apiCall.put(this.endpointPath(presetId), {
                value: { searches: normalizedParams },
            });
        }
        const normalizedParams = (0, Utils_1.normalizeArrayableParams)(params.value);
        return this.apiCall.put(this.endpointPath(presetId), {
            value: normalizedParams,
        });
    }
    async retrieve() {
        return this.apiCall.get(this.endpointPath());
    }
    endpointPath(operation) {
        return `${Presets.RESOURCEPATH}${operation === undefined ? "" : "/" + encodeURIComponent(operation)}`;
    }
    static get RESOURCEPATH() {
        return RESOURCEPATH;
    }
}
exports.default = Presets;
//# sourceMappingURL=Presets.js.map