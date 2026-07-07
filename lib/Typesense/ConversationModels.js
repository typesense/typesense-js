"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var RESOURCEPATH = "/conversations/models";
var ConversationModels = /** @class */ (function () {
    function ConversationModels(apiCall) {
        this.apiCall = apiCall;
        this.apiCall = apiCall;
    }
    /**
     * Create a Conversation Model
     *
     * @example
     * await client.conversations().models().create({ model_name: "openai/gpt-4", api_key: "..." })
     *
     * @see https://typesense.org/docs/latest/api/conversational-search-rag.html
     */
    ConversationModels.prototype.create = function (params) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this.apiCall.post(this.endpointPath(), params)];
            });
        });
    };
    /**
     * Retrieve all conversation models
     *
     * @example
     * await client.conversations().models().retrieve()
     *
     * @see https://typesense.org/docs/latest/api/conversational-search-rag.html
     */
    ConversationModels.prototype.retrieve = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this.apiCall.get(this.endpointPath())];
            });
        });
    };
    ConversationModels.prototype.endpointPath = function (operation) {
        return "".concat(ConversationModels.RESOURCEPATH).concat(operation === undefined ? "" : "/" + encodeURIComponent(operation));
    };
    Object.defineProperty(ConversationModels, "RESOURCEPATH", {
        get: function () {
            return RESOURCEPATH;
        },
        enumerable: false,
        configurable: true
    });
    return ConversationModels;
}());
exports.default = ConversationModels;
//# sourceMappingURL=ConversationModels.js.map