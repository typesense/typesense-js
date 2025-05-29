"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const ConversationModels_1 = tslib_1.__importDefault(require("./ConversationModels"));
const ConversationModel_1 = tslib_1.__importDefault(require("./ConversationModel"));
const RESOURCEPATH = "/conversations";
class Conversations {
    constructor(apiCall) {
        this.apiCall = apiCall;
        this.individualConversationModels = {};
        this.apiCall = apiCall;
        this._conversationsModels = new ConversationModels_1.default(this.apiCall);
    }
    async retrieve() {
        return this.apiCall.get(RESOURCEPATH);
    }
    models(id) {
        if (id === undefined) {
            return this._conversationsModels;
        }
        else {
            if (this.individualConversationModels[id] === undefined) {
                this.individualConversationModels[id] = new ConversationModel_1.default(id, this.apiCall);
            }
            return this.individualConversationModels[id];
        }
    }
    static get RESOURCEPATH() {
        return RESOURCEPATH;
    }
}
exports.default = Conversations;
//# sourceMappingURL=Conversations.js.map