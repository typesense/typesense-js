"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const ConversationModels_1 = tslib_1.__importDefault(require("./ConversationModels"));
class ConversationModel {
    constructor(id, apiCall) {
        this.id = id;
        this.apiCall = apiCall;
    }
    async update(params) {
        return this.apiCall.put(this.endpointPath(), params);
    }
    async retrieve() {
        return this.apiCall.get(this.endpointPath());
    }
    async delete() {
        return this.apiCall.delete(this.endpointPath());
    }
    endpointPath() {
        return `${ConversationModels_1.default.RESOURCEPATH}/${encodeURIComponent(this.id)}`;
    }
}
exports.default = ConversationModel;
//# sourceMappingURL=ConversationModel.js.map