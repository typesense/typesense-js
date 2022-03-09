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
        var shouldSendApiKeyAsQueryParam = (options['apiKey'] || '').length < 2000;
        if (shouldSendApiKeyAsQueryParam) {
            options['sendApiKeyAsQueryParam'] = true;
        }
        this.configuration = new Configuration_1.default(options);
        this.apiCall = new ApiCall_1.default(this.configuration);
        this.multiSearch = new MultiSearch_1.default(this.apiCall, this.configuration, true);
        this.individualCollections = {};
    }
    SearchClient.prototype.collections = function (collectionName) {
        if (!collectionName) {
            throw new Error('Typesense.SearchClient only supports search operations, so the collectionName that needs to ' +
                'be searched must be specified. Use Typesense.Client if you need to access the collection object.');
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