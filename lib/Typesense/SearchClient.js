"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Configuration_1 = tslib_1.__importDefault(require("./Configuration"));
const ApiCall_1 = tslib_1.__importDefault(require("./ApiCall"));
const MultiSearch_1 = tslib_1.__importDefault(require("./MultiSearch"));
const SearchOnlyCollection_1 = require("./SearchOnlyCollection");
class SearchClient {
    constructor(options) {
        var _a;
        options.sendApiKeyAsQueryParam = (_a = options.sendApiKeyAsQueryParam) !== null && _a !== void 0 ? _a : true;
        if (options.sendApiKeyAsQueryParam === true &&
            (options.apiKey || "").length > 2000) {
            console.warn("[typesense] API Key is longer than 2000 characters which is over the allowed limit, so disabling sending it as a query parameter.");
            options.sendApiKeyAsQueryParam = false;
        }
        this.configuration = new Configuration_1.default(options);
        this.apiCall = new ApiCall_1.default(this.configuration);
        this.multiSearch = new MultiSearch_1.default(this.apiCall, this.configuration, true);
        this.individualCollections = {};
    }
    clearCache() {
        this.multiSearch.clearCache();
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        Object.entries(this.individualCollections).forEach(([_, collection]) => {
            collection.documents().clearCache();
        });
    }
    collections(collectionName) {
        if (!collectionName) {
            throw new Error("Typesense.SearchClient only supports search operations, so the collectionName that needs to " +
                "be searched must be specified. Use Typesense.Client if you need to access the collection object.");
        }
        else {
            if (this.individualCollections[collectionName] === undefined) {
                this.individualCollections[collectionName] = new SearchOnlyCollection_1.SearchOnlyCollection(collectionName, this.apiCall, this.configuration);
            }
            return this.individualCollections[collectionName];
        }
    }
}
exports.default = SearchClient;
//# sourceMappingURL=SearchClient.js.map