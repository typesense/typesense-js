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
const crypto_1 = require("crypto");
const RESOURCEPATH = '/keys';
class Keys {
    constructor(apiCall) {
        this.apiCall = apiCall;
        this.apiCall = apiCall;
    }
    create(params) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.apiCall.post(Keys.RESOURCEPATH, params);
        });
    }
    retrieve() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.apiCall.get(RESOURCEPATH);
        });
    }
    generateScopedSearchKey(searchKey, parameters) {
        // Note: only a key generated with the `documents:search` action will be
        // accepted by the server, when usined with the search endpoint.
        const paramsJSON = JSON.stringify(parameters);
        const digest = Buffer.from(crypto_1.createHmac('sha256', searchKey).update(paramsJSON).digest('base64'));
        const keyPrefix = searchKey.substr(0, 4);
        const rawScopedKey = `${digest}${keyPrefix}${paramsJSON}`;
        return Buffer.from(rawScopedKey).toString('base64');
    }
    static get RESOURCEPATH() {
        return RESOURCEPATH;
    }
}
exports.default = Keys;
//# sourceMappingURL=Keys.js.map