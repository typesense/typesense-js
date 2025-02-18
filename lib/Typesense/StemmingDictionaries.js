"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var RESOURCEPATH = "/stemming/dictionaries";
var StemmingDictionaries = /** @class */ (function () {
    function StemmingDictionaries(apiCall) {
        this.apiCall = apiCall;
        this.apiCall = apiCall;
    }
    StemmingDictionaries.prototype.upsert = function (id, wordRootCombinations) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var wordRootCombinationsInJSONLFormat, resultsInJSONLFormat;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        wordRootCombinationsInJSONLFormat = Array.isArray(wordRootCombinations)
                            ? wordRootCombinations.map(function (combo) { return JSON.stringify(combo); }).join("\n")
                            : wordRootCombinations;
                        return [4 /*yield*/, this.apiCall.performRequest("post", this.endpointPath("import"), {
                                queryParameters: { id: id },
                                bodyParameters: wordRootCombinationsInJSONLFormat,
                                additionalHeaders: { "Content-Type": "text/plain" },
                                skipConnectionTimeout: true,
                            })];
                    case 1:
                        resultsInJSONLFormat = _a.sent();
                        return [2 /*return*/, Array.isArray(wordRootCombinations)
                                ? resultsInJSONLFormat
                                    .split("\n")
                                    .map(function (line) { return JSON.parse(line); })
                                : resultsInJSONLFormat];
                }
            });
        });
    };
    StemmingDictionaries.prototype.retrieve = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this.apiCall.get(this.endpointPath())];
            });
        });
    };
    StemmingDictionaries.prototype.endpointPath = function (operation) {
        return operation === undefined
            ? "".concat(StemmingDictionaries.RESOURCEPATH)
            : "".concat(StemmingDictionaries.RESOURCEPATH, "/").concat(encodeURIComponent(operation));
    };
    Object.defineProperty(StemmingDictionaries, "RESOURCEPATH", {
        get: function () {
            return RESOURCEPATH;
        },
        enumerable: false,
        configurable: true
    });
    return StemmingDictionaries;
}());
exports.default = StemmingDictionaries;
//# sourceMappingURL=StemmingDictionaries.js.map