"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
const Aliases_1 = __importDefault(require("./Aliases"));
class Alias {
    constructor(name, apiCall) {
        this.name = name;
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
        return `${Aliases_1.default.RESOURCEPATH}/${this.name}`;
    }
}
exports.default = Alias;
//# sourceMappingURL=Alias.js.map