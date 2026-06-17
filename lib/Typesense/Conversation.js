"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var Conversations_1 = tslib_1.__importDefault(require("./Conversations"));
var Conversation = /** @class */ (function () {
    function Conversation(id, apiCall) {
        this.id = id;
        this.apiCall = apiCall;
    }
    /**
     * Retrieve a conversation by ID.
     *
     * @example
     * await client.conversations("conv-1").retrieve()
     *
     * @see https://typesense.org/docs/latest/api/conversational-search-rag.html
     */
    Conversation.prototype.retrieve = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this.apiCall.get(this.endpointPath())];
            });
        });
    };
    /**
     * Update a conversation's TTL.
     *
     * @example
     * await client.conversations("conv-1").update({ ttl: 3600 })
     *
     * @see https://typesense.org/docs/latest/api/conversational-search-rag.html
     */
    Conversation.prototype.update = function (params) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this.apiCall.put(this.endpointPath(), params)];
            });
        });
    };
    /**
     * Delete a conversation by ID.
     *
     * @example
     * await client.conversations("conv-1").delete()
     *
     * @see https://typesense.org/docs/latest/api/conversational-search-rag.html
     */
    Conversation.prototype.delete = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this.apiCall.delete(this.endpointPath())];
            });
        });
    };
    Conversation.prototype.endpointPath = function () {
        return "".concat(Conversations_1.default.RESOURCEPATH, "/").concat(encodeURIComponent(this.id));
    };
    return Conversation;
}());
exports.default = Conversation;
//# sourceMappingURL=Conversation.js.map