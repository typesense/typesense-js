"use strict";
/* eslint-disable no-dupe-class-members */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Configuration_1 = tslib_1.__importDefault(require("./Configuration"));
const ApiCall_1 = tslib_1.__importDefault(require("./ApiCall"));
const Collections_1 = tslib_1.__importDefault(require("./Collections"));
const Collection_1 = tslib_1.__importDefault(require("./Collection"));
const Aliases_1 = tslib_1.__importDefault(require("./Aliases"));
const Alias_1 = tslib_1.__importDefault(require("./Alias"));
const Keys_1 = tslib_1.__importDefault(require("./Keys"));
const Key_1 = tslib_1.__importDefault(require("./Key"));
const Debug_1 = tslib_1.__importDefault(require("./Debug"));
const Metrics_1 = tslib_1.__importDefault(require("./Metrics"));
const Stats_1 = tslib_1.__importDefault(require("./Stats"));
const Health_1 = tslib_1.__importDefault(require("./Health"));
const Operations_1 = tslib_1.__importDefault(require("./Operations"));
const MultiSearch_1 = tslib_1.__importDefault(require("./MultiSearch"));
const Presets_1 = tslib_1.__importDefault(require("./Presets"));
const Preset_1 = tslib_1.__importDefault(require("./Preset"));
const Analytics_1 = tslib_1.__importDefault(require("./Analytics"));
const Stopwords_1 = tslib_1.__importDefault(require("./Stopwords"));
const Stopword_1 = tslib_1.__importDefault(require("./Stopword"));
const Conversations_1 = tslib_1.__importDefault(require("./Conversations"));
const Conversation_1 = tslib_1.__importDefault(require("./Conversation"));
const Stemming_1 = tslib_1.__importDefault(require("./Stemming"));
class Client {
    constructor(options) {
        var _a;
        options.sendApiKeyAsQueryParam = (_a = options.sendApiKeyAsQueryParam) !== null && _a !== void 0 ? _a : false;
        this.configuration = new Configuration_1.default(options);
        this.apiCall = new ApiCall_1.default(this.configuration);
        this.debug = new Debug_1.default(this.apiCall);
        this.metrics = new Metrics_1.default(this.apiCall);
        this.stats = new Stats_1.default(this.apiCall);
        this.health = new Health_1.default(this.apiCall);
        this.operations = new Operations_1.default(this.apiCall);
        this.multiSearch = new MultiSearch_1.default(this.apiCall, this.configuration);
        this._collections = new Collections_1.default(this.apiCall);
        this.individualCollections = {};
        this._aliases = new Aliases_1.default(this.apiCall);
        this.individualAliases = {};
        this._keys = new Keys_1.default(this.apiCall);
        this.individualKeys = {};
        this._presets = new Presets_1.default(this.apiCall);
        this.individualPresets = {};
        this._stopwords = new Stopwords_1.default(this.apiCall);
        this.individualStopwords = {};
        this.analytics = new Analytics_1.default(this.apiCall);
        this.stemming = new Stemming_1.default(this.apiCall);
        this._conversations = new Conversations_1.default(this.apiCall);
        this.individualConversations = {};
    }
    collections(collectionName) {
        if (collectionName === undefined) {
            return this._collections;
        }
        else {
            if (this.individualCollections[collectionName] === undefined) {
                this.individualCollections[collectionName] = new Collection_1.default(collectionName, this.apiCall, this.configuration);
            }
            return this.individualCollections[collectionName];
        }
    }
    aliases(aliasName) {
        if (aliasName === undefined) {
            return this._aliases;
        }
        else {
            if (this.individualAliases[aliasName] === undefined) {
                this.individualAliases[aliasName] = new Alias_1.default(aliasName, this.apiCall);
            }
            return this.individualAliases[aliasName];
        }
    }
    keys(id) {
        if (id === undefined) {
            return this._keys;
        }
        else {
            if (this.individualKeys[id] === undefined) {
                this.individualKeys[id] = new Key_1.default(id, this.apiCall);
            }
            return this.individualKeys[id];
        }
    }
    presets(id) {
        if (id === undefined) {
            return this._presets;
        }
        else {
            if (this.individualPresets[id] === undefined) {
                this.individualPresets[id] = new Preset_1.default(id, this.apiCall);
            }
            return this.individualPresets[id];
        }
    }
    stopwords(id) {
        if (id === undefined) {
            return this._stopwords;
        }
        else {
            if (this.individualStopwords[id] === undefined) {
                this.individualStopwords[id] = new Stopword_1.default(id, this.apiCall);
            }
            return this.individualStopwords[id];
        }
    }
    conversations(id) {
        if (id === undefined) {
            return this._conversations;
        }
        else {
            if (this.individualConversations[id] === undefined) {
                this.individualConversations[id] = new Conversation_1.default(id, this.apiCall);
            }
            return this.individualConversations[id];
        }
    }
}
exports.default = Client;
//# sourceMappingURL=Client.js.map