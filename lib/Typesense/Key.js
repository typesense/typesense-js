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
        define(["require", "exports", "./Keys"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const Keys_1 = __importDefault(require("./Keys"));
    class Key {
        constructor(id, apiCall) {
            this.id = id;
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
        endpointPath() {
            return `${Keys_1.default.RESOURCEPATH}/${this.id}`;
        }
    }
    exports.default = Key;
});
//# sourceMappingURL=Key.js.map