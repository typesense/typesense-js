"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Configuration_1 = __importDefault(require("./Configuration"));
var ApiCall_1 = __importDefault(require("./ApiCall"));
var MultiSearch_1 = __importDefault(require("./MultiSearch"));
var SearchOnlyCollection_1 = require("./SearchOnlyCollection");
var SearchClient = /** @class */ (function () {
    function SearchClient(options) {
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
    SearchClient.prototype.clearCache = function () {
        this.multiSearch.clearCache();
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        Object.entries(this.individualCollections).forEach(function (_a) {
            var _ = _a[0], collection = _a[1];
            collection.documents().clearCache();
        });
    };
    SearchClient.prototype.collections = function (collectionName) {
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
    };
    return SearchClient;
}());
exports.default = SearchClient;
//# sourceMappingURL=SearchClient.js.map