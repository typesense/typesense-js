"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = require("crypto");
const Utils_1 = require("./Utils");
const RESOURCEPATH = "/keys";
class Keys {
    constructor(apiCall) {
        this.apiCall = apiCall;
        this.apiCall = apiCall;
    }
    async create(params) {
        return this.apiCall.post(Keys.RESOURCEPATH, params);
    }
    async retrieve() {
        return this.apiCall.get(RESOURCEPATH);
    }
    generateScopedSearchKey(searchKey, parameters) {
        // Note: only a key generated with the `documents:search` action will be
        // accepted by the server, when usined with the search endpoint.
        const normalizedParams = (0, Utils_1.normalizeArrayableParams)(parameters);
        const paramsJSON = JSON.stringify(normalizedParams);
        const digest = Buffer.from((0, crypto_1.createHmac)("sha256", searchKey).update(paramsJSON).digest("base64"));
        const keyPrefix = searchKey.substr(0, 4);
        const rawScopedKey = `${digest}${keyPrefix}${paramsJSON}`;
        return Buffer.from(rawScopedKey).toString("base64");
    }
    static get RESOURCEPATH() {
        return RESOURCEPATH;
    }
}
exports.default = Keys;
//# sourceMappingURL=Keys.js.map