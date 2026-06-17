"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var ConversationModels_1 = tslib_1.__importDefault(require("./ConversationModels"));
var ConversationModel = /** @class */ (function () {
    function ConversationModel(id, apiCall) {
        this.id = id;
        this.apiCall = apiCall;
    }
    /**
     * Update a conversation model
     *
     * @example
     * await client.conversations().models("model-1").update({ model_name: "openai/gpt-4", max_bytes: 16384 })
     *
     * @see https://typesense.org/docs/latest/api/conversational-search-rag.html
     */
    ConversationModel.prototype.update = function (params) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this.apiCall.put(this.endpointPath(), params)];
            });
        });
    };
    /**
     * Retrieve a conversation model
     *
     * @example
     * await client.conversations().models("model-1").retrieve()
     *
     * @see https://typesense.org/docs/latest/api/conversational-search-rag.html
     */
    ConversationModel.prototype.retrieve = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this.apiCall.get(this.endpointPath())];
            });
        });
    };
    /**
     * Delete a conversation model
     *
     * @example
     * await client.conversations().models("model-1").delete()
     *
     * @see https://typesense.org/docs/latest/api/conversational-search-rag.html
     */
    ConversationModel.prototype.delete = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this.apiCall.delete(this.endpointPath())];
            });
        });
    };
    ConversationModel.prototype.endpointPath = function () {
        return "".concat(ConversationModels_1.default.RESOURCEPATH, "/").concat(encodeURIComponent(this.id));
    };
    return ConversationModel;
}());
exports.default = ConversationModel;
//# sourceMappingURL=ConversationModel.js.map