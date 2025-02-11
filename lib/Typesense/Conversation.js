"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Conversations_1 = tslib_1.__importDefault(require("./Conversations"));
class Conversation {
    constructor(id, apiCall) {
        this.id = id;
        this.apiCall = apiCall;
    }
    async retrieve() {
        return this.apiCall.get(this.endpointPath());
    }
    async update(params) {
        return this.apiCall.put(this.endpointPath(), params);
    }
    async delete() {
        return this.apiCall.delete(this.endpointPath());
    }
    endpointPath() {
        return `${Conversations_1.default.RESOURCEPATH}/${encodeURIComponent(this.id)}`;
    }
}
exports.default = Conversation;
//# sourceMappingURL=Conversation.js.map