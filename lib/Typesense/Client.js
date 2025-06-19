"use strict";
/* eslint-disable no-dupe-class-members */
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var Configuration_1 = tslib_1.__importDefault(require("./Configuration"));
var ApiCall_1 = tslib_1.__importDefault(require("./ApiCall"));
var Collections_1 = tslib_1.__importDefault(require("./Collections"));
var Collection_1 = tslib_1.__importDefault(require("./Collection"));
var Aliases_1 = tslib_1.__importDefault(require("./Aliases"));
var Alias_1 = tslib_1.__importDefault(require("./Alias"));
var Keys_1 = tslib_1.__importDefault(require("./Keys"));
var Key_1 = tslib_1.__importDefault(require("./Key"));
var Debug_1 = tslib_1.__importDefault(require("./Debug"));
var Metrics_1 = tslib_1.__importDefault(require("./Metrics"));
var Stats_1 = tslib_1.__importDefault(require("./Stats"));
var Health_1 = tslib_1.__importDefault(require("./Health"));
var Operations_1 = tslib_1.__importDefault(require("./Operations"));
var MultiSearch_1 = tslib_1.__importDefault(require("./MultiSearch"));
var Presets_1 = tslib_1.__importDefault(require("./Presets"));
var Preset_1 = tslib_1.__importDefault(require("./Preset"));
var Analytics_1 = tslib_1.__importDefault(require("./Analytics"));
var Stopwords_1 = tslib_1.__importDefault(require("./Stopwords"));
var Stopword_1 = tslib_1.__importDefault(require("./Stopword"));
var Conversations_1 = tslib_1.__importDefault(require("./Conversations"));
var Conversation_1 = tslib_1.__importDefault(require("./Conversation"));
var Stemming_1 = tslib_1.__importDefault(require("./Stemming"));
var NLSearchModels_1 = tslib_1.__importDefault(require("./NLSearchModels"));
var NLSearchModel_1 = tslib_1.__importDefault(require("./NLSearchModel"));
var Client = /** @class */ (function () {
    function Client(options) {
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
        this._nlSearchModels = new NLSearchModels_1.default(this.apiCall);
        this.individualNLSearchModels = {};
    }
    Client.prototype.collections = function (collectionName) {
        if (collectionName === undefined) {
            return this._collections;
        }
        else {
            if (this.individualCollections[collectionName] === undefined) {
                this.individualCollections[collectionName] = new Collection_1.default(collectionName, this.apiCall, this.configuration);
            }
            return this.individualCollections[collectionName];
        }
    };
    Client.prototype.aliases = function (aliasName) {
        if (aliasName === undefined) {
            return this._aliases;
        }
        else {
            if (this.individualAliases[aliasName] === undefined) {
                this.individualAliases[aliasName] = new Alias_1.default(aliasName, this.apiCall);
            }
            return this.individualAliases[aliasName];
        }
    };
    Client.prototype.keys = function (id) {
        if (id === undefined) {
            return this._keys;
        }
        else {
            if (this.individualKeys[id] === undefined) {
                this.individualKeys[id] = new Key_1.default(id, this.apiCall);
            }
            return this.individualKeys[id];
        }
    };
    Client.prototype.presets = function (id) {
        if (id === undefined) {
            return this._presets;
        }
        else {
            if (this.individualPresets[id] === undefined) {
                this.individualPresets[id] = new Preset_1.default(id, this.apiCall);
            }
            return this.individualPresets[id];
        }
    };
    Client.prototype.stopwords = function (id) {
        if (id === undefined) {
            return this._stopwords;
        }
        else {
            if (this.individualStopwords[id] === undefined) {
                this.individualStopwords[id] = new Stopword_1.default(id, this.apiCall);
            }
            return this.individualStopwords[id];
        }
    };
    Client.prototype.conversations = function (id) {
        if (id === undefined) {
            return this._conversations;
        }
        else {
            if (this.individualConversations[id] === undefined) {
                this.individualConversations[id] = new Conversation_1.default(id, this.apiCall);
            }
            return this.individualConversations[id];
        }
    };
    Client.prototype.nlSearchModels = function (id) {
        if (id === undefined) {
            return this._nlSearchModels;
        }
        else {
            if (this.individualNLSearchModels[id] === undefined) {
                this.individualNLSearchModels[id] = new NLSearchModel_1.default(id, this.apiCall);
            }
            return this.individualNLSearchModels[id];
        }
    };
    return Client;
}());
exports.default = Client;
//# sourceMappingURL=Client.js.map