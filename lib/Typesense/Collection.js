"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Collections_1 = tslib_1.__importDefault(require("./Collections"));
const Documents_1 = tslib_1.__importDefault(require("./Documents"));
const Errors_1 = require("./Errors");
const Overrides_1 = tslib_1.__importDefault(require("./Overrides"));
const Override_1 = tslib_1.__importDefault(require("./Override"));
const Synonyms_1 = tslib_1.__importDefault(require("./Synonyms"));
const Synonym_1 = tslib_1.__importDefault(require("./Synonym"));
const Document_1 = require("./Document");
class Collection {
    constructor(name, apiCall, configuration) {
        this.name = name;
        this.apiCall = apiCall;
        this.configuration = configuration;
        this.individualDocuments = {};
        this.individualOverrides = {};
        this.individualSynonyms = {};
        this.name = name;
        this.apiCall = apiCall;
        this.configuration = configuration;
        this._documents = new Documents_1.default(this.name, this.apiCall, this.configuration);
        this._overrides = new Overrides_1.default(this.name, this.apiCall);
        this._synonyms = new Synonyms_1.default(this.name, this.apiCall);
    }
    async retrieve() {
        return this.apiCall.get(this.endpointPath());
    }
    async update(schema) {
        return this.apiCall.patch(this.endpointPath(), schema);
    }
    async delete(options = {}) {
        return this.apiCall.delete(this.endpointPath(), options);
    }
    async exists() {
        try {
            await this.retrieve();
            return true;
        }
        catch (e) {
            if (e instanceof Errors_1.ObjectNotFound)
                return false;
            throw e;
        }
    }
    documents(documentId) {
        if (!documentId) {
            return this._documents;
        }
        else {
            if (this.individualDocuments[documentId] === undefined) {
                this.individualDocuments[documentId] = new Document_1.Document(this.name, documentId, this.apiCall);
            }
            return this.individualDocuments[documentId];
        }
    }
    overrides(overrideId) {
        if (overrideId === undefined) {
            return this._overrides;
        }
        else {
            if (this.individualOverrides[overrideId] === undefined) {
                this.individualOverrides[overrideId] = new Override_1.default(this.name, overrideId, this.apiCall);
            }
            return this.individualOverrides[overrideId];
        }
    }
    synonyms(synonymId) {
        if (synonymId === undefined) {
            return this._synonyms;
        }
        else {
            if (this.individualSynonyms[synonymId] === undefined) {
                this.individualSynonyms[synonymId] = new Synonym_1.default(this.name, synonymId, this.apiCall);
            }
            return this.individualSynonyms[synonymId];
        }
    }
    endpointPath() {
        return `${Collections_1.default.RESOURCEPATH}/${encodeURIComponent(this.name)}`;
    }
}
exports.default = Collection;
//# sourceMappingURL=Collection.js.map