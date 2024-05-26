"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var ConversationModels_1 = tslib_1.__importDefault(require("./ConversationModels"));
var ConversationModel_1 = tslib_1.__importDefault(require("./ConversationModel"));
var RESOURCEPATH = "/conversations";
var Conversations = /** @class */ (function () {
    function Conversations(apiCall) {
        this.apiCall = apiCall;
        this.individualConversationModels = {};
        this.apiCall = apiCall;
        this._conversationsModels = new ConversationModels_1.default(this.apiCall);
    }
    Conversations.prototype.retrieve = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this.apiCall.get(RESOURCEPATH)];
            });
        });
    };
    Conversations.prototype.models = function (id) {
        if (id === undefined) {
            return this._conversationsModels;
        }
        else {
            if (this.individualConversationModels[id] === undefined) {
                this.individualConversationModels[id] = new ConversationModel_1.default(id, this.apiCall);
            }
            return this.individualConversationModels[id];
        }
    };
    Object.defineProperty(Conversations, "RESOURCEPATH", {
        get: function () {
            return RESOURCEPATH;
        },
        enumerable: false,
        configurable: true
    });
    return Conversations;
}());
exports.default = Conversations;
//# sourceMappingURL=Conversations.js.map