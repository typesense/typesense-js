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
Object.defineProperty(exports, "__esModule", { value: true });
const RESOURCEPATH = '/aliases';
class Aliases {
    constructor(apiCall) {
        this.apiCall = apiCall;
    }
    upsert(name, mapping) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.apiCall.put(this.endpointPath(name), mapping);
        });
    }
    retrieve() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.apiCall.get(RESOURCEPATH);
        });
    }
    endpointPath(aliasName) {
        return `${Aliases.RESOURCEPATH}/${aliasName}`;
    }
    static get RESOURCEPATH() {
        return RESOURCEPATH;
    }
}
exports.default = Aliases;
//# sourceMappingURL=Aliases.js.map