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
const Collections_1 = __importDefault(require("./Collections"));
const RESOURCEPATH = '/overrides';
class Overrides {
    constructor(collectionName, apiCall) {
        this.collectionName = collectionName;
        this.apiCall = apiCall;
    }
    upsert(overrideId, params) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.apiCall.put(this.endpointPath(overrideId), params);
        });
    }
    retrieve() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.apiCall.get(this.endpointPath());
        });
    }
    endpointPath(operation) {
        return `${Collections_1.default.RESOURCEPATH}/${this.collectionName}${Overrides.RESOURCEPATH}${operation === undefined ? '' : '/' + operation}`;
    }
    static get RESOURCEPATH() {
        return RESOURCEPATH;
    }
}
exports.default = Overrides;
//# sourceMappingURL=Overrides.js.map