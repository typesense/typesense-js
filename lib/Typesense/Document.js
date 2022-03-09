var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./Collections", "./Documents"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Document = void 0;
    const Collections_1 = __importDefault(require("./Collections"));
    const Documents_1 = __importDefault(require("./Documents"));
    class Document {
        constructor(collectionName, documentId, apiCall) {
            this.collectionName = collectionName;
            this.documentId = documentId;
            this.apiCall = apiCall;
        }
        retrieve() {
            return __awaiter(this, void 0, void 0, function* () {
                return this.apiCall.get(this.endpointPath());
            });
        }
        delete() {
            return __awaiter(this, void 0, void 0, function* () {
                return this.apiCall.delete(this.endpointPath());
            });
        }
        update(partialDocument, options = {}) {
            return __awaiter(this, void 0, void 0, function* () {
                return this.apiCall.patch(this.endpointPath(), partialDocument, options);
            });
        }
        endpointPath() {
            return `${Collections_1.default.RESOURCEPATH}/${this.collectionName}${Documents_1.default.RESOURCEPATH}/${this.documentId}`;
        }
    }
    exports.Document = Document;
});
//# sourceMappingURL=Document.js.map