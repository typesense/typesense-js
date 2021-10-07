"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Collections_1 = __importDefault(require("./Collections"));
const RequestWithCache_1 = __importDefault(require("./RequestWithCache"));
const Errors_1 = require("./Errors");
const RESOURCEPATH = '/documents';
class Documents {
    constructor(collectionName, apiCall, configuration) {
        this.collectionName = collectionName;
        this.apiCall = apiCall;
        this.configuration = configuration;
        this.requestWithCache = new RequestWithCache_1.default();
    }
    async create(document, options = {}) {
        if (!document)
            throw new Error('No document provided');
        return await this.apiCall.post(this.endpointPath(), document, options);
    }
    upsert(document, options = {}) {
        if (!document)
            throw new Error('No document provided');
        return this.apiCall.post(this.endpointPath(), document, Object.assign({}, options, { action: 'upsert' }));
    }
    update(document, options = {}) {
        if (!document)
            throw new Error('No document provided');
        return this.apiCall.post(this.endpointPath(), document, Object.assign({}, options, { action: 'update' }));
    }
    delete(idOrQuery = {}) {
        if (typeof idOrQuery === 'string') {
            return this.apiCall.delete(this.endpointPath(idOrQuery), idOrQuery);
        }
        else {
            return this.apiCall.delete(this.endpointPath(), idOrQuery);
        }
    }
    async createMany(documents, options = {}) {
        this.configuration.logger.warn('createMany is deprecated and will be removed in a future version. Use import instead, which now takes both an array of documents or a JSONL string of documents');
        return this.import(documents, options);
    }
    async import(documents, options = {}) {
        let documentsInJSONLFormat;
        if (Array.isArray(documents)) {
            documentsInJSONLFormat = documents.map((document) => JSON.stringify(document)).join('\n');
        }
        else {
            documentsInJSONLFormat = documents;
        }
        const resultsInJSONLFormat = await this.apiCall.performRequest('post', this.endpointPath('import'), {
            queryParameters: options,
            bodyParameters: documentsInJSONLFormat,
            additionalHeaders: { 'Content-Type': 'text/plain' }
        });
        if (Array.isArray(documents)) {
            const resultsInJSONFormat = resultsInJSONLFormat.split('\n').map((r) => JSON.parse(r));
            const failedItems = resultsInJSONFormat.filter((r) => r.success === false);
            if (failedItems.length > 0) {
                throw new Errors_1.ImportError(`${resultsInJSONFormat.length - failedItems.length} documents imported successfully, ${failedItems.length} documents failed during import. Use \`error.importResults\` from the raised exception to get a detailed error reason for each document.`, resultsInJSONFormat);
            }
            else {
                return resultsInJSONFormat;
            }
        }
        else {
            return resultsInJSONLFormat;
        }
    }
    /**
     * Returns a JSONL string for all the documents in this collection
     */
    async export(options = {}) {
        return await this.apiCall.get(this.endpointPath('export'), options);
    }
    async search(searchParameters, { cacheSearchResultsForSeconds = this.configuration.cacheSearchResultsForSeconds, abortSignal = null } = {}) {
        let additionalQueryParams = {};
        if (this.configuration.useServerSideSearchCache === true) {
            additionalQueryParams['usecache'] = true;
        }
        const queryParams = Object.assign({}, searchParameters, additionalQueryParams);
        return await this.requestWithCache.perform(this.apiCall, this.apiCall.get, [this.endpointPath('search'), queryParams, { abortSignal }], {
            cacheResponseForSeconds: cacheSearchResultsForSeconds
        });
    }
    endpointPath(operation) {
        return `${Collections_1.default.RESOURCEPATH}/${this.collectionName}${Documents.RESOURCEPATH}${operation === undefined ? '' : '/' + operation}`;
    }
    static get RESOURCEPATH() {
        return RESOURCEPATH;
    }
}
exports.default = Documents;
//# sourceMappingURL=Documents.js.map