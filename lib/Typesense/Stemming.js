"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var StemmingDictionaries_1 = tslib_1.__importDefault(require("./StemmingDictionaries"));
var StemmingDictionary_1 = tslib_1.__importDefault(require("./StemmingDictionary"));
var RESOURCEPATH = "/stemming";
var Stemming = /** @class */ (function () {
    function Stemming(apiCall) {
        this.apiCall = apiCall;
        this.individualStemmingDictionaries = {};
        this.apiCall = apiCall;
        this._stemmingDictionaries = new StemmingDictionaries_1.default(this.apiCall);
    }
    Stemming.prototype.dictionaries = function (id) {
        if (id === undefined) {
            return this._stemmingDictionaries;
        }
        else {
            if (this.individualStemmingDictionaries[id] === undefined) {
                this.individualStemmingDictionaries[id] = new StemmingDictionary_1.default(id, this.apiCall);
            }
            return this.individualStemmingDictionaries[id];
        }
    };
    Object.defineProperty(Stemming, "RESOURCEPATH", {
        get: function () {
            return RESOURCEPATH;
        },
        enumerable: false,
        configurable: true
    });
    return Stemming;
}());
exports.default = Stemming;
//# sourceMappingURL=Stemming.js.map