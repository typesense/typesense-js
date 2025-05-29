"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const RESOURCEPATH = "/conversations/models";
class ConversationModels {
    constructor(apiCall) {
        this.apiCall = apiCall;
        this.apiCall = apiCall;
    }
    async create(params) {
        return this.apiCall.post(this.endpointPath(), params);
    }
    async retrieve() {
        return this.apiCall.get(this.endpointPath());
    }
    endpointPath(operation) {
        return `${ConversationModels.RESOURCEPATH}${operation === undefined ? "" : "/" + encodeURIComponent(operation)}`;
    }
    static get RESOURCEPATH() {
        return RESOURCEPATH;
    }
}
exports.default = ConversationModels;
//# sourceMappingURL=ConversationModels.js.map