"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.arrayableParams = void 0;
const Errors_1 = require("./Errors");
const SearchOnlyDocuments_1 = require("./SearchOnlyDocuments");
exports.arrayableParams = {
    query_by: "query_by",
    query_by_weights: "query_by_weights",
    facet_by: "facet_by",
    group_by: "group_by",
    include_fields: "include_fields",
    exclude_fields: "exclude_fields",
    highlight_fields: "highlight_fields",
    highlight_full_fields: "highlight_full_fields",
    pinned_hits: "pinned_hits",
    hidden_hits: "hidden_hits",
    infix: "infix",
    override_tags: "override_tags",
    num_typos: "num_typos",
    prefix: "prefix",
    sort_by: "sort_by",
};
const isNodeJSEnvironment = typeof process !== "undefined" &&
    process.versions != null &&
    process.versions.node != null;
class Documents extends SearchOnlyDocuments_1.SearchOnlyDocuments {
    constructor(collectionName, apiCall, configuration) {
        super(collectionName, apiCall, configuration);
    }
    async create(document, options = {}) {
        if (!document)
            throw new Error("No document provided");
        return this.apiCall.post(this.endpointPath(), document, options);
    }
    async upsert(document, options = {}) {
        if (!document)
            throw new Error("No document provided");
        return this.apiCall.post(this.endpointPath(), document, Object.assign({}, options, { action: "upsert" }));
    }
    async update(document, options = {}) {
        if (!document)
            throw new Error("No document provided");
        if (options["filter_by"] != null) {
            return this.apiCall.patch(this.endpointPath(), document, Object.assign({}, options));
        }
        else {
            return this.apiCall.post(this.endpointPath(), document, Object.assign({}, options, { action: "update" }));
        }
    }
    async delete(query = {}) {
        return this.apiCall.delete(this.endpointPath(), query);
    }
    async createMany(documents, options = {}) {
        this.configuration.logger.warn("createMany is deprecated and will be removed in a future version. Use import instead, which now takes both an array of documents or a JSONL string of documents");
        return this.import(documents, options);
    }
    async import(documents, options = {}) {
        let documentsInJSONLFormat;
        if (Array.isArray(documents)) {
            try {
                documentsInJSONLFormat = documents
                    .map((document) => JSON.stringify(document))
                    .join("\n");
            }
            catch (error) {
                // if rangeerror, throw custom error message
                if (error instanceof RangeError &&
                    error.message.includes("Too many properties to enumerate")) {
                    throw new Error(`${error}
          It looks like you have reached a Node.js limit that restricts the number of keys in an Object: https://stackoverflow.com/questions/9282869/are-there-limits-to-the-number-of-properties-in-a-javascript-object

         Please try reducing the number of keys in your document, or using CURL to import your data.
          `);
                }
                // else, throw the non-range error anyways
                throw new Error(error);
            }
        }
        else {
            documentsInJSONLFormat = documents;
        }
        const resultsInJSONLFormat = await this.apiCall.performRequest("post", this.endpointPath("import"), {
            queryParameters: options,
            bodyParameters: documentsInJSONLFormat,
            additionalHeaders: { "Content-Type": "text/plain" },
            skipConnectionTimeout: true, // We never want to client-side-timeout on an import and retry, since imports are syncronous and we want to let them take as long as it takes to complete fully
            enableKeepAlive: isNodeJSEnvironment ? true : false, // This is to prevent ECONNRESET socket hang up errors. Reference: https://github.com/axios/axios/issues/2936#issuecomment-779439991
        });
        if (Array.isArray(documents)) {
            const resultsInJSONFormat = resultsInJSONLFormat
                .split("\n")
                .map((r) => JSON.parse(r));
            const failedItems = resultsInJSONFormat.filter((r) => r.success === false);
            if (failedItems.length > 0) {
                throw new Errors_1.ImportError(`${resultsInJSONFormat.length - failedItems.length} documents imported successfully, ${failedItems.length} documents failed during import. Use \`error.importResults\` from the raised exception to get a detailed error reason for each document.`, resultsInJSONFormat, {
                    documentsInJSONLFormat,
                    options,
                    failedItems,
                    successCount: resultsInJSONFormat.length - failedItems.length,
                });
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
     * Imports documents from a NodeJS readable stream of JSONL.
     */
    async importStream(readableStream, options = {}) {
        const resultsInJSONLFormat = await this.apiCall.performRequest("post", this.endpointPath("import"), {
            queryParameters: options,
            bodyParameters: readableStream,
            additionalHeaders: { "Content-Type": "text/plain" },
            skipConnectionTimeout: true, // We never want to client-side-timeout on an import and retry, since imports are syncronous and we want to let them take as long as it takes to complete fully
            enableKeepAlive: isNodeJSEnvironment ? true : false, // This is to prevent ECONNRESET socket hang up errors. Reference: https://github.com/axios/axios/issues/2936#issuecomment-779439991
        });
        const resultsInJSONFormat = resultsInJSONLFormat
            .split("\n")
            .map((r) => JSON.parse(r));
        const failedItems = resultsInJSONFormat.filter((r) => r.success === false);
        if (failedItems.length > 0) {
            throw new Errors_1.ImportError(`${resultsInJSONFormat.length - failedItems.length} documents imported successfully, ${failedItems.length} documents failed during import. Use \`error.importResults\` from the raised exception to get a detailed error reason for each document.`, resultsInJSONFormat, {
                documentsInJSONLFormat: readableStream,
                options,
                failedItems,
                successCount: resultsInJSONFormat.length - failedItems.length,
            });
        }
        else {
            return resultsInJSONFormat;
        }
    }
    /**
     * Returns a JSONL string for all the documents in this collection
     */
    async export(options = {}) {
        return this.apiCall.get(this.endpointPath("export"), options);
    }
    /**
     * Returns a NodeJS readable stream of JSONL for all the documents in this collection.
     */
    async exportStream(options = {}) {
        return this.apiCall.get(this.endpointPath("export"), options, {
            responseType: "stream",
        });
    }
}
exports.default = Documents;
//# sourceMappingURL=Documents.js.map