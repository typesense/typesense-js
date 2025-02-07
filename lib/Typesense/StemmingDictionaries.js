"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const RESOURCEPATH = "/stemming/dictionaries";
class StemmingDictionaries {
    constructor(apiCall) {
        this.apiCall = apiCall;
        this.apiCall = apiCall;
    }
    async upsert(id, wordRootCombinations) {
        const wordRootCombinationsInJSONLFormat = Array.isArray(wordRootCombinations)
            ? wordRootCombinations.map((combo) => JSON.stringify(combo)).join("\n")
            : wordRootCombinations;
        const resultsInJSONLFormat = await this.apiCall.performRequest("post", this.endpointPath("import"), {
            queryParameters: { id },
            bodyParameters: wordRootCombinationsInJSONLFormat,
            additionalHeaders: { "Content-Type": "text/plain" },
            skipConnectionTimeout: true,
        });
        return Array.isArray(wordRootCombinations)
            ? resultsInJSONLFormat
                .split("\n")
                .map((line) => JSON.parse(line))
            : resultsInJSONLFormat;
    }
    async retrieve() {
        return this.apiCall.get(this.endpointPath());
    }
    endpointPath(operation) {
        return operation === undefined
            ? `${StemmingDictionaries.RESOURCEPATH}`
            : `${StemmingDictionaries.RESOURCEPATH}/${encodeURIComponent(operation)}`;
    }
    static get RESOURCEPATH() {
        return RESOURCEPATH;
    }
}
exports.default = StemmingDictionaries;
//# sourceMappingURL=StemmingDictionaries.js.map