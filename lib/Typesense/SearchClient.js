"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Configuration_1 = __importDefault(require("./Configuration"));
const ApiCall_1 = __importDefault(require("./ApiCall"));
const Collection_1 = __importDefault(require("./Collection"));
const MultiSearch_1 = __importDefault(require("./MultiSearch"));
class SearchClient {
    constructor(options) {
        // In v0.20.0 we restrict query params to 2000 in length
        // But sometimes scoped API keys can be over this limit, so we send long keys as headers instead.
        // The tradeoff is that using a header to send the API key will trigger the browser to send an OPTIONS request though.
        if ((options['apiKey'] || '').length < 2000) {
            options['sendApiKeyAsQueryParam'] = true;
        }
        this.configuration = new Configuration_1.default(options);
        this.apiCall = new ApiCall_1.default(this.configuration);
        this.multiSearch = new MultiSearch_1.default(this.apiCall, this.configuration, true);
        this.individualCollections = {};
    }
    collections(collectionName) {
        // Nick: changed to less strict check, as null or an empty string would fail this statement
        if (!collectionName) {
            throw new Error('Typesense.SearchClient only supports search operations, so the collectionName that needs to ' +
                'be searched must be specified. Use Typesense.Client if you need to access the collection object.');
        }
        else {
            if (this.individualCollections[collectionName] === undefined) {
                this.individualCollections[collectionName] = new Collection_1.default(collectionName, this.apiCall, this.configuration);
            }
            return this.individualCollections[collectionName];
        }
    }
}
exports.default = SearchClient;
//# sourceMappingURL=SearchClient.js.map