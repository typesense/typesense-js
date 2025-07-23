"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var Errors_1 = require("./Errors");
var SearchOnlyDocuments_1 = require("./SearchOnlyDocuments");
var isNodeJSEnvironment = typeof process !== "undefined" &&
    process.versions != null &&
    process.versions.node != null;
var Documents = /** @class */ (function (_super) {
    tslib_1.__extends(Documents, _super);
    function Documents(collectionName, apiCall, configuration) {
        return _super.call(this, collectionName, apiCall, configuration) || this;
    }
    Documents.prototype.create = function (document, options) {
        if (options === void 0) { options = {}; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                if (!document)
                    throw new Error("No document provided");
                return [2 /*return*/, this.apiCall.post(this.endpointPath(), document, options)];
            });
        });
    };
    Documents.prototype.upsert = function (document, options) {
        if (options === void 0) { options = {}; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                if (!document)
                    throw new Error("No document provided");
                return [2 /*return*/, this.apiCall.post(this.endpointPath(), document, Object.assign({}, options, { action: "upsert" }))];
            });
        });
    };
    Documents.prototype.update = function (document, options) {
        if (options === void 0) { options = {}; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                if (!document)
                    throw new Error("No document provided");
                if (options["filter_by"] != null) {
                    return [2 /*return*/, this.apiCall.patch(this.endpointPath(), document, Object.assign({}, options))];
                }
                else {
                    return [2 /*return*/, this.apiCall.post(this.endpointPath(), document, Object.assign({}, options, { action: "update" }))];
                }
                return [2 /*return*/];
            });
        });
    };
    Documents.prototype.delete = function (query) {
        if (query === void 0) { query = {}; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this.apiCall.delete(this.endpointPath(), query)];
            });
        });
    };
    Documents.prototype.createMany = function (documents, options) {
        if (options === void 0) { options = {}; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.configuration.logger.warn("createMany is deprecated and will be removed in a future version. Use import instead, which now takes both an array of documents or a JSONL string of documents");
                return [2 /*return*/, this.import(documents, options)];
            });
        });
    };
    Documents.prototype.import = function (documents, options) {
        if (options === void 0) { options = {}; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var finalOptions, documentsInJSONLFormat, resultsInJSONLFormat, resultsInJSONFormat, failedItems;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        finalOptions = tslib_1.__assign({ throwOnFail: true }, options);
                        if (Array.isArray(documents)) {
                            if (documents.length === 0) {
                                throw new Errors_1.RequestMalformed("No documents provided");
                            }
                            try {
                                documentsInJSONLFormat = documents
                                    .map(function (document) { return JSON.stringify(document); })
                                    .join("\n");
                            }
                            catch (error) {
                                // if rangeerror, throw custom error message
                                if (error instanceof RangeError &&
                                    error.message.includes("Too many properties to enumerate")) {
                                    throw new Error("".concat(error, "\n          It looks like you have reached a Node.js limit that restricts the number of keys in an Object: https://stackoverflow.com/questions/9282869/are-there-limits-to-the-number-of-properties-in-a-javascript-object\n\n         Please try reducing the number of keys in your document, or using CURL to import your data.\n          "));
                                }
                                // else, throw the non-range error anyways
                                throw new Error(error);
                            }
                        }
                        else {
                            documentsInJSONLFormat = documents;
                            if (isEmptyString(documentsInJSONLFormat)) {
                                throw new Errors_1.RequestMalformed("No documents provided");
                            }
                        }
                        return [4 /*yield*/, this.apiCall.performRequest("post", this.endpointPath("import"), {
                                queryParameters: finalOptions,
                                bodyParameters: documentsInJSONLFormat,
                                additionalHeaders: { "Content-Type": "text/plain" },
                                skipConnectionTimeout: true, // We never want to client-side-timeout on an import and retry, since imports are syncronous and we want to let them take as long as it takes to complete fully
                                enableKeepAlive: isNodeJSEnvironment ? true : false, // This is to prevent ECONNRESET socket hang up errors. Reference: https://github.com/axios/axios/issues/2936#issuecomment-779439991
                            })];
                    case 1:
                        resultsInJSONLFormat = _a.sent();
                        if (Array.isArray(documents)) {
                            resultsInJSONFormat = resultsInJSONLFormat
                                .split("\n")
                                .map(function (r) { return JSON.parse(r); });
                            failedItems = resultsInJSONFormat.filter(function (r) { return r.success === false; });
                            if (failedItems.length > 0 && finalOptions.throwOnFail) {
                                throw new Errors_1.ImportError("".concat(resultsInJSONFormat.length - failedItems.length, " documents imported successfully, ").concat(failedItems.length, " documents failed during import. Use `error.importResults` from the raised exception to get a detailed error reason for each document."), resultsInJSONFormat, {
                                    documentsInJSONLFormat: documentsInJSONLFormat,
                                    options: finalOptions,
                                    failedItems: failedItems,
                                    successCount: resultsInJSONFormat.length - failedItems.length,
                                });
                            }
                            else {
                                return [2 /*return*/, resultsInJSONFormat];
                            }
                        }
                        else {
                            return [2 /*return*/, resultsInJSONLFormat];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Imports documents from a NodeJS readable stream of JSONL.
     */
    Documents.prototype.importStream = function (readableStream, options) {
        if (options === void 0) { options = {}; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var finalOptions, resultsInJSONLFormat, resultsInJSONFormat, failedItems;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        finalOptions = tslib_1.__assign({ throwOnFail: true }, options);
                        return [4 /*yield*/, this.apiCall.performRequest("post", this.endpointPath("import"), {
                                queryParameters: finalOptions,
                                bodyParameters: readableStream,
                                additionalHeaders: { "Content-Type": "text/plain" },
                                skipConnectionTimeout: true, // We never want to client-side-timeout on an import and retry, since imports are syncronous and we want to let them take as long as it takes to complete fully
                                enableKeepAlive: isNodeJSEnvironment ? true : false, // This is to prevent ECONNRESET socket hang up errors. Reference: https://github.com/axios/axios/issues/2936#issuecomment-779439991
                            })];
                    case 1:
                        resultsInJSONLFormat = _a.sent();
                        resultsInJSONFormat = resultsInJSONLFormat
                            .split("\n")
                            .map(function (r) { return JSON.parse(r); });
                        failedItems = resultsInJSONFormat.filter(function (r) { return r.success === false; });
                        if (failedItems.length > 0 && finalOptions.throwOnFail) {
                            throw new Errors_1.ImportError("".concat(resultsInJSONFormat.length - failedItems.length, " documents imported successfully, ").concat(failedItems.length, " documents failed during import. Use `error.importResults` from the raised exception to get a detailed error reason for each document."), resultsInJSONFormat, {
                                documentsInJSONLFormat: readableStream,
                                options: finalOptions,
                                failedItems: failedItems,
                                successCount: resultsInJSONFormat.length - failedItems.length,
                            });
                        }
                        else {
                            return [2 /*return*/, resultsInJSONFormat];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Returns a JSONL string for all the documents in this collection
     */
    Documents.prototype.export = function (options) {
        if (options === void 0) { options = {}; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this.apiCall.get(this.endpointPath("export"), options)];
            });
        });
    };
    /**
     * Returns a NodeJS readable stream of JSONL for all the documents in this collection.
     */
    Documents.prototype.exportStream = function (options) {
        if (options === void 0) { options = {}; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this.apiCall.get(this.endpointPath("export"), options, {
                        responseType: "stream",
                    })];
            });
        });
    };
    return Documents;
}(SearchOnlyDocuments_1.SearchOnlyDocuments));
exports.default = Documents;
function isEmptyString(str) {
    return str == null || str === "" || str.length === 0;
}
//# sourceMappingURL=Documents.js.map