"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var Collections_1 = tslib_1.__importDefault(require("./Collections"));
var Synonyms_1 = tslib_1.__importDefault(require("./Synonyms"));
/**
 * @deprecated Deprecated starting with Typesense Server v30. Please migrate to `client.synonymSets` (new Synonym Sets APIs).
 */
var Synonym = /** @class */ (function () {
    function Synonym(collectionName, synonymId, apiCall) {
        this.collectionName = collectionName;
        this.synonymId = synonymId;
        this.apiCall = apiCall;
    }
    Synonym.prototype.retrieve = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this.apiCall.get(this.endpointPath())];
            });
        });
    };
    Synonym.prototype.delete = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this.apiCall.delete(this.endpointPath())];
            });
        });
    };
    Synonym.prototype.endpointPath = function () {
        if (!Synonym.hasWarnedDeprecation) {
            // eslint-disable-next-line no-console
            console.warn("[typesense] 'synonym' APIs are deprecated starting with Typesense Server v30. Please migrate to synonym sets 'synonym_sets'.");
            Synonym.hasWarnedDeprecation = true;
        }
        return "".concat(Collections_1.default.RESOURCEPATH, "/").concat(encodeURIComponent(this.collectionName)).concat(Synonyms_1.default.RESOURCEPATH, "/").concat(encodeURIComponent(this.synonymId));
    };
    Synonym.hasWarnedDeprecation = false;
    return Synonym;
}());
exports.default = Synonym;
//# sourceMappingURL=Synonym.js.map