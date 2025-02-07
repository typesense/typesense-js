"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const StemmingDictionaries_1 = tslib_1.__importDefault(require("./StemmingDictionaries"));
const StemmingDictionary_1 = tslib_1.__importDefault(require("./StemmingDictionary"));
const RESOURCEPATH = "/stemming";
class Stemming {
    constructor(apiCall) {
        this.apiCall = apiCall;
        this.individualStemmingDictionaries = {};
        this.apiCall = apiCall;
        this._stemmingDictionaries = new StemmingDictionaries_1.default(this.apiCall);
    }
    dictionaries(id) {
        if (id === undefined) {
            return this._stemmingDictionaries;
        }
        else {
            if (this.individualStemmingDictionaries[id] === undefined) {
                this.individualStemmingDictionaries[id] = new StemmingDictionary_1.default(id, this.apiCall);
            }
            return this.individualStemmingDictionaries[id];
        }
    }
    static get RESOURCEPATH() {
        return RESOURCEPATH;
    }
}
exports.default = Stemming;
//# sourceMappingURL=Stemming.js.map