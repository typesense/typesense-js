"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var axios_1 = tslib_1.__importDefault(require("axios"));
var http_1 = require("http");
var https_1 = require("https");
var Errors_1 = require("./Errors");
var TypesenseError_1 = tslib_1.__importDefault(require("./Errors/TypesenseError"));
var Utils_1 = require("./Utils");
var APIKEYHEADERNAME = "X-TYPESENSE-API-KEY";
var HEALTHY = true;
var UNHEALTHY = false;
var isNodeJSEnvironment = typeof process !== "undefined" &&
    process.versions != null &&
    process.versions.node != null &&
    typeof window === "undefined";
var ApiCall = /** @class */ (function () {
    function ApiCall(configuration) {
        this.configuration = configuration;
        this.apiKey = this.configuration.apiKey;
        this.nodes =
            this.configuration.nodes == null
                ? this.configuration.nodes
                : JSON.parse(JSON.stringify(this.configuration.nodes)); // Make a copy, since we'll be adding additional metadata to the nodes
        this.nearestNode =
            this.configuration.nearestNode == null
                ? this.configuration.nearestNode
                : JSON.parse(JSON.stringify(this.configuration.nearestNode));
        this.connectionTimeoutSeconds = this.configuration.connectionTimeoutSeconds;
        this.healthcheckIntervalSeconds =
            this.configuration.healthcheckIntervalSeconds;
        this.numRetriesPerRequest = this.configuration.numRetries;
        this.retryIntervalSeconds = this.configuration.retryIntervalSeconds;
        this.sendApiKeyAsQueryParam = this.configuration.sendApiKeyAsQueryParam;
        this.additionalUserHeaders = this.configuration.additionalHeaders;
        this.logger = this.configuration.logger;
        this.initializeMetadataForNodes();
        this.currentNodeIndex = -1;
    }
    ApiCall.prototype.get = function (endpoint, queryParameters, _a) {
        if (queryParameters === void 0) { queryParameters = {}; }
        var _b = _a === void 0 ? {} : _a, _c = _b.abortSignal, abortSignal = _c === void 0 ? null : _c, _d = _b.responseType, responseType = _d === void 0 ? undefined : _d, _e = _b.streamConfig, streamConfig = _e === void 0 ? undefined : _e, isStreamingRequest = _b.isStreamingRequest;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_f) {
                return [2 /*return*/, this.performRequest("get", endpoint, {
                        queryParameters: queryParameters,
                        abortSignal: abortSignal,
                        responseType: responseType,
                        streamConfig: streamConfig,
                        isStreamingRequest: isStreamingRequest,
                    })];
            });
        });
    };
    ApiCall.prototype.delete = function (endpoint, queryParameters) {
        if (queryParameters === void 0) { queryParameters = {}; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this.performRequest("delete", endpoint, {
                        queryParameters: queryParameters,
                        isStreamingRequest: false,
                    })];
            });
        });
    };
    ApiCall.prototype.post = function (endpoint, bodyParameters, queryParameters, additionalHeaders, _a) {
        if (bodyParameters === void 0) { bodyParameters = {}; }
        if (queryParameters === void 0) { queryParameters = {}; }
        if (additionalHeaders === void 0) { additionalHeaders = {}; }
        var _b = _a === void 0 ? {} : _a, _c = _b.abortSignal, abortSignal = _c === void 0 ? null : _c, _d = _b.responseType, responseType = _d === void 0 ? undefined : _d, _e = _b.streamConfig, streamConfig = _e === void 0 ? undefined : _e, isStreamingRequest = _b.isStreamingRequest;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_f) {
                return [2 /*return*/, this.performRequest("post", endpoint, {
                        queryParameters: queryParameters,
                        bodyParameters: bodyParameters,
                        additionalHeaders: additionalHeaders,
                        abortSignal: abortSignal,
                        responseType: responseType,
                        streamConfig: streamConfig,
                        isStreamingRequest: isStreamingRequest,
                    })];
            });
        });
    };
    ApiCall.prototype.put = function (endpoint, bodyParameters, queryParameters) {
        if (bodyParameters === void 0) { bodyParameters = {}; }
        if (queryParameters === void 0) { queryParameters = {}; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this.performRequest("put", endpoint, {
                        queryParameters: queryParameters,
                        bodyParameters: bodyParameters,
                        isStreamingRequest: false,
                    })];
            });
        });
    };
    ApiCall.prototype.patch = function (endpoint, bodyParameters, queryParameters) {
        if (bodyParameters === void 0) { bodyParameters = {}; }
        if (queryParameters === void 0) { queryParameters = {}; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this.performRequest("patch", endpoint, {
                        queryParameters: queryParameters,
                        bodyParameters: bodyParameters,
                        isStreamingRequest: false,
                    })];
            });
        });
    };
    ApiCall.prototype.getAdapter = function () {
        if (!this.configuration.axiosAdapter)
            return undefined;
        if (typeof this.configuration.axiosAdapter === "function")
            return this.configuration.axiosAdapter;
        var isCloudflareWorkers = typeof navigator !== "undefined" &&
            navigator.userAgent === "Cloudflare-Workers";
        return isCloudflareWorkers
            ? axios_1.default.getAdapter(this.configuration.axiosAdapter).bind(globalThis)
            : axios_1.default.getAdapter(this.configuration.axiosAdapter);
    };
    ApiCall.prototype.performRequest = function (requestType, endpoint, _a) {
        var _b, _c, _d, _e;
        var _f = _a.queryParameters, queryParameters = _f === void 0 ? null : _f, _g = _a.bodyParameters, bodyParameters = _g === void 0 ? null : _g, _h = _a.additionalHeaders, additionalHeaders = _h === void 0 ? {} : _h, _j = _a.abortSignal, abortSignal = _j === void 0 ? null : _j, _k = _a.responseType, responseType = _k === void 0 ? undefined : _k, _l = _a.skipConnectionTimeout, skipConnectionTimeout = _l === void 0 ? false : _l, _m = _a.enableKeepAlive, enableKeepAlive = _m === void 0 ? undefined : _m, _o = _a.streamConfig, streamConfig = _o === void 0 ? undefined : _o, isStreamingRequest = _a.isStreamingRequest;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var requestNumber, lastException, wasAborted, _loop_1, this_1, numTries, state_1;
            return tslib_1.__generator(this, function (_p) {
                switch (_p.label) {
                    case 0:
                        this.configuration.validate();
                        if (isStreamingRequest) {
                            this.logger.debug("Request: Performing streaming request to ".concat(endpoint));
                            // For browser streaming, always use responseType: "stream" and adapter: "fetch"
                            if (!isNodeJSEnvironment && typeof fetch !== "undefined") {
                                this.logger.debug("Using fetch adapter for browser streaming");
                                responseType = "stream";
                            }
                        }
                        requestNumber = Date.now();
                        wasAborted = false;
                        this.logger.debug("Request #".concat(requestNumber, ": Performing ").concat(requestType.toUpperCase(), " request: ").concat(endpoint));
                        _loop_1 = function (numTries) {
                            var node, abortListener, requestOptions, cancelToken, source_1, response, error_1;
                            return tslib_1.__generator(this, function (_q) {
                                switch (_q.label) {
                                    case 0:
                                        node = this_1.getNextNode(requestNumber);
                                        this_1.logger.debug("Request #".concat(requestNumber, ": Attempting ").concat(requestType.toUpperCase(), " request Try #").concat(numTries, " to Node ").concat(node.index));
                                        if (abortSignal && abortSignal.aborted) {
                                            return [2 /*return*/, { value: Promise.reject(new Error("Request aborted by caller.")) }];
                                        }
                                        abortListener = void 0;
                                        _q.label = 1;
                                    case 1:
                                        _q.trys.push([1, 3, 5, 6]);
                                        requestOptions = {
                                            method: requestType,
                                            url: this_1.uriFor(endpoint, node),
                                            headers: Object.assign({}, this_1.defaultHeaders(), additionalHeaders, this_1.additionalUserHeaders),
                                            maxContentLength: Infinity,
                                            maxBodyLength: Infinity,
                                            validateStatus: function (status) {
                                                /* Override default validateStatus, which only considers 2xx a success.
                                                    In our case, if the server returns any HTTP code, we will handle it below.
                                                    We do this to be able to raise custom errors based on response code.
                                                 */
                                                return status > 0;
                                            },
                                            transformResponse: [
                                                function (data, headers) {
                                                    var transformedData = data;
                                                    if (headers !== undefined &&
                                                        typeof data === "string" &&
                                                        headers["content-type"] &&
                                                        headers["content-type"].startsWith("application/json")) {
                                                        transformedData = JSON.parse(data);
                                                    }
                                                    return transformedData;
                                                },
                                            ],
                                        };
                                        // Use fetch adapter only for streaming requests in browser environments
                                        requestOptions.adapter =
                                            isStreamingRequest && !isNodeJSEnvironment
                                                ? "fetch"
                                                : this_1.getAdapter();
                                        if (skipConnectionTimeout !== true) {
                                            requestOptions.timeout = this_1.connectionTimeoutSeconds * 1000;
                                        }
                                        if (queryParameters && Object.keys(queryParameters).length !== 0) {
                                            requestOptions.params = queryParameters;
                                        }
                                        if (this_1.sendApiKeyAsQueryParam) {
                                            requestOptions.params = requestOptions.params || {};
                                            requestOptions.params["x-typesense-api-key"] = this_1.apiKey;
                                        }
                                        if (this_1.configuration.httpAgent) {
                                            this_1.logger.debug("Request #".concat(requestNumber, ": Using custom httpAgent"));
                                            requestOptions.httpAgent = this_1.configuration.httpAgent;
                                        }
                                        else if (enableKeepAlive === true) {
                                            if (!isNodeJSEnvironment) {
                                                this_1.logger.warn("Request #".concat(requestNumber, ": Cannot use custom httpAgent in a browser environment to enable keepAlive"));
                                            }
                                            else {
                                                this_1.logger.debug("Request #".concat(requestNumber, ": Enabling KeepAlive"));
                                                requestOptions.httpAgent = new http_1.Agent({ keepAlive: true });
                                            }
                                        }
                                        if (this_1.configuration.httpsAgent) {
                                            this_1.logger.debug("Request #".concat(requestNumber, ": Using custom httpsAgent"));
                                            requestOptions.httpsAgent = this_1.configuration.httpsAgent;
                                        }
                                        else if (enableKeepAlive === true) {
                                            if (!isNodeJSEnvironment) {
                                                this_1.logger.warn("Request #".concat(requestNumber, ": Cannot use custom httpAgent in a browser environment to enable keepAlive"));
                                            }
                                            else {
                                                this_1.logger.debug("Request #".concat(requestNumber, ": Enabling keepAlive"));
                                                requestOptions.httpsAgent = new https_1.Agent({ keepAlive: true });
                                            }
                                        }
                                        if (this_1.configuration.paramsSerializer) {
                                            this_1.logger.debug("Request #".concat(requestNumber, ": Using custom paramsSerializer"));
                                            requestOptions.paramsSerializer = this_1.configuration.paramsSerializer;
                                        }
                                        if (bodyParameters &&
                                            ((typeof bodyParameters === "string" &&
                                                bodyParameters.length !== 0) ||
                                                (typeof bodyParameters === "object" &&
                                                    Object.keys(bodyParameters).length !== 0))) {
                                            requestOptions.data = bodyParameters;
                                        }
                                        // Translate from user-provided AbortController to the Axios request cancel mechanism.
                                        if (abortSignal) {
                                            cancelToken = axios_1.default.CancelToken;
                                            source_1 = cancelToken.source();
                                            abortListener = function () {
                                                wasAborted = true;
                                                source_1.cancel();
                                            };
                                            abortSignal.addEventListener("abort", abortListener);
                                            requestOptions.cancelToken = source_1.token;
                                        }
                                        if (isStreamingRequest) {
                                            requestOptions.responseType = "stream";
                                            if (!isNodeJSEnvironment) {
                                                requestOptions.headers = tslib_1.__assign(tslib_1.__assign({}, requestOptions.headers), { Accept: "text/event-stream" });
                                            }
                                        }
                                        else if (responseType) {
                                            requestOptions.responseType = responseType;
                                        }
                                        return [4 /*yield*/, (0, axios_1.default)(requestOptions)];
                                    case 2:
                                        response = _q.sent();
                                        if (response.status >= 1 && response.status <= 499) {
                                            // Treat any status code > 0 and < 500 to be an indication that node is healthy
                                            // We exclude 0 since some clients return 0 when request fails
                                            this_1.setNodeHealthcheck(node, HEALTHY);
                                        }
                                        this_1.logger.debug("Request #".concat(requestNumber, ": Request to Node ").concat(node.index, " was made. Response Code was ").concat(response.status, "."));
                                        if (response.status >= 200 && response.status < 300) {
                                            if (isStreamingRequest) {
                                                return [2 /*return*/, { value: this_1.handleStreamingResponse(response, streamConfig) }];
                                            }
                                            return [2 /*return*/, { value: Promise.resolve(response.data) }];
                                        }
                                        else if (response.status < 500) {
                                            return [2 /*return*/, { value: Promise.reject(this_1.customErrorForResponse(response, (_b = response.data) === null || _b === void 0 ? void 0 : _b.message, requestOptions.data)) }];
                                        }
                                        else {
                                            // Retry all other HTTP errors (HTTPStatus > 500)
                                            // This will get caught by the catch block below
                                            throw this_1.customErrorForResponse(response, (_c = response.data) === null || _c === void 0 ? void 0 : _c.message, requestOptions.data);
                                        }
                                        return [3 /*break*/, 6];
                                    case 3:
                                        error_1 = _q.sent();
                                        // This block handles retries for HTTPStatus > 500 and network layer issues like connection timeouts
                                        if (!wasAborted) {
                                            this_1.setNodeHealthcheck(node, UNHEALTHY);
                                        }
                                        lastException = error_1;
                                        this_1.logger.warn("Request #".concat(requestNumber, ": Request to Node ").concat(node.index, " failed due to \"").concat((_d = error_1 === null || error_1 === void 0 ? void 0 : error_1.code) !== null && _d !== void 0 ? _d : "", " ").concat(error_1.message).concat(error_1.response == null
                                            ? ""
                                            : " - " + JSON.stringify((_e = error_1.response) === null || _e === void 0 ? void 0 : _e.data), "\""));
                                        if (wasAborted) {
                                            return [2 /*return*/, { value: Promise.reject(new Error("Request aborted by caller.")) }];
                                        }
                                        if (isStreamingRequest) {
                                            this_1.invokeOnErrorCallback(error_1, streamConfig);
                                        }
                                        if (numTries < this_1.numRetriesPerRequest + 1) {
                                            this_1.logger.warn("Request #".concat(requestNumber, ": Sleeping for ").concat(this_1.retryIntervalSeconds, "s and then retrying request..."));
                                        }
                                        else {
                                            this_1.logger.debug("Request #".concat(requestNumber, ": No retries left. Raising last error"));
                                            return [2 /*return*/, { value: Promise.reject(lastException) }];
                                        }
                                        return [4 /*yield*/, this_1.timer(this_1.retryIntervalSeconds)];
                                    case 4:
                                        _q.sent();
                                        return [3 /*break*/, 6];
                                    case 5:
                                        if (abortSignal && abortListener) {
                                            abortSignal.removeEventListener("abort", abortListener);
                                        }
                                        return [7 /*endfinally*/];
                                    case 6: return [2 /*return*/];
                                }
                            });
                        };
                        this_1 = this;
                        numTries = 1;
                        _p.label = 1;
                    case 1:
                        if (!(numTries <= this.numRetriesPerRequest + 1)) return [3 /*break*/, 4];
                        return [5 /*yield**/, _loop_1(numTries)];
                    case 2:
                        state_1 = _p.sent();
                        if (typeof state_1 === "object")
                            return [2 /*return*/, state_1.value];
                        _p.label = 3;
                    case 3:
                        numTries++;
                        return [3 /*break*/, 1];
                    case 4:
                        this.logger.debug("Request #".concat(requestNumber, ": No retries left. Raising last error"));
                        return [2 /*return*/, Promise.reject(lastException)];
                }
            });
        });
    };
    ApiCall.prototype.processStreamingLine = function (line) {
        if (!line.trim() || line === "data: [DONE]") {
            return null;
        }
        // Handle SSE format (data: {...})
        if (line.startsWith("data: ")) {
            return this.processDataLine(line.slice(6).trim());
        }
        // Try parsing as JSON if it starts with a brace
        if (line.trim().startsWith("{")) {
            try {
                var jsonData = JSON.parse(line.trim());
                if (jsonData && typeof jsonData === "object") {
                    if (!jsonData.conversation_id) {
                        jsonData.conversation_id = "unknown";
                    }
                    if (!jsonData.message && jsonData.message !== "") {
                        jsonData.message = "";
                    }
                    return jsonData;
                }
                return {
                    conversation_id: "unknown",
                    message: JSON.stringify(jsonData),
                };
            }
            catch (e) {
                return {
                    conversation_id: "unknown",
                    message: line.trim(),
                };
            }
        }
        return {
            conversation_id: "unknown",
            message: line.trim(),
        };
    };
    ApiCall.prototype.processDataLine = function (dataContent) {
        if (!dataContent) {
            return null;
        }
        if (dataContent.startsWith("{")) {
            try {
                var jsonData = JSON.parse(dataContent);
                // Ensure the required fields exist
                if (jsonData && typeof jsonData === "object") {
                    if (!jsonData.conversation_id) {
                        jsonData.conversation_id = "unknown";
                    }
                    if (!jsonData.message && jsonData.message !== "") {
                        jsonData.message = "";
                    }
                    return jsonData;
                }
                return {
                    conversation_id: "unknown",
                    message: JSON.stringify(jsonData),
                };
            }
            catch (e) {
                // Not valid JSON, use as plain text
                return {
                    conversation_id: "unknown",
                    message: dataContent,
                };
            }
        }
        // For plain text
        return {
            conversation_id: "unknown",
            message: dataContent,
        };
    };
    ApiCall.prototype.handleStreamingResponse = function (response, streamConfig) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.logger.debug("Handling streaming response. Environment: ".concat(isNodeJSEnvironment ? "Node.js" : "Browser"));
                if (isNodeJSEnvironment && response.data) {
                    return [2 /*return*/, this.handleNodeStreaming(response, streamConfig)];
                }
                if (!isNodeJSEnvironment) {
                    return [2 /*return*/, this.handleBrowserStreaming(response, streamConfig)];
                }
                this.logger.debug("Processing non-streaming response");
                this.invokeOnCompleteCallback(response.data, streamConfig);
                return [2 /*return*/, Promise.resolve(response.data)];
            });
        });
    };
    ApiCall.prototype.handleNodeStreaming = function (response, streamConfig) {
        var _this = this;
        this.logger.debug("Processing Node.js stream");
        return new Promise(function (resolve, reject) {
            var stream = response.data;
            var allChunks = [];
            var buffer = "";
            stream.on("data", function (chunk) {
                var _a;
                try {
                    var data = chunk.toString();
                    buffer += data;
                    var lines = buffer.split("\n");
                    buffer = (_a = lines.pop()) !== null && _a !== void 0 ? _a : "";
                    _this.processStreamLines(lines, allChunks, streamConfig);
                }
                catch (error) {
                    reject(error);
                }
            });
            stream.on("end", function () {
                if (buffer.trim().length > 0) {
                    var lines = buffer.split("\n");
                    _this.processStreamLines(lines, allChunks, streamConfig);
                }
                _this.finalizeStreamResult(allChunks, resolve, response, streamConfig);
            });
            stream.on("error", function (error) {
                _this.logger.error("Stream error: ".concat(error));
                _this.invokeOnErrorCallback(error, streamConfig);
                reject(error);
            });
        });
    };
    ApiCall.prototype.handleBrowserStreaming = function (response, streamConfig) {
        var _this = this;
        this.logger.debug("Processing browser stream");
        return new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                try {
                    if (response.data && typeof response.data.getReader === "function") {
                        return [2 /*return*/, this.handleBrowserReadableStream(response.data, resolve, reject, response, streamConfig)];
                    }
                    if (typeof response.data === "string") {
                        return [2 /*return*/, this.handleBrowserStringResponse(response.data, resolve, response, streamConfig)];
                    }
                    if (typeof response.data === "object" && response.data !== null) {
                        this.logger.debug("No stream found, but data object is available");
                        this.invokeOnCompleteCallback(response.data, streamConfig);
                        return [2 /*return*/, resolve(response.data)];
                    }
                    this.logger.error("No usable data found in response");
                    return [2 /*return*/, reject(new Error("No usable data found in response"))];
                }
                catch (error) {
                    this.logger.error("Error processing streaming response: ".concat(error));
                    this.invokeOnErrorCallback(error, streamConfig);
                    reject(error);
                }
                return [2 /*return*/];
            });
        }); });
    };
    ApiCall.prototype.handleBrowserReadableStream = function (stream, resolve, reject, response, streamConfig) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var reader, allChunks, buffer, _a, done, value, lines_1, chunk, lines, error_2;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.logger.debug("Found ReadableStream in response.data");
                        reader = stream.getReader();
                        allChunks = [];
                        buffer = "";
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 5, , 6]);
                        _b.label = 2;
                    case 2:
                        if (!true) return [3 /*break*/, 4];
                        return [4 /*yield*/, reader.read()];
                    case 3:
                        _a = _b.sent(), done = _a.done, value = _a.value;
                        if (done) {
                            this.logger.debug("Stream reading complete");
                            if (buffer.trim()) {
                                lines_1 = buffer.split("\n");
                                this.processStreamLines(lines_1, allChunks, streamConfig);
                            }
                            return [3 /*break*/, 4];
                        }
                        chunk = new TextDecoder().decode(value);
                        this.logger.debug("Received chunk: ".concat(chunk.length, " bytes"));
                        buffer += chunk;
                        lines = buffer.split("\n");
                        buffer = lines.pop() || "";
                        this.processStreamLines(lines, allChunks, streamConfig);
                        return [3 /*break*/, 2];
                    case 4:
                        this.finalizeStreamResult(allChunks, resolve, response, streamConfig);
                        return [3 /*break*/, 6];
                    case 5:
                        error_2 = _b.sent();
                        this.logger.error("Stream error: ".concat(error_2));
                        this.invokeOnErrorCallback(error_2, streamConfig);
                        reject(error_2);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    ApiCall.prototype.handleBrowserStringResponse = function (data, resolve, response, streamConfig) {
        this.logger.debug("Processing text response as stream data");
        var allChunks = [];
        var lines = data.split("\n");
        this.processStreamLines(lines, allChunks, streamConfig);
        if (allChunks.length > 0) {
            var finalResult = this.combineStreamingChunks(allChunks);
            this.invokeOnCompleteCallback(finalResult, streamConfig);
            resolve(finalResult);
        }
        else {
            // If no chunks were processed, use the original response
            this.logger.debug("No chunks processed, returning original API response");
            this.invokeOnCompleteCallback(response.data, streamConfig);
            resolve(response.data);
        }
    };
    ApiCall.prototype.processStreamLines = function (lines, allChunks, streamConfig) {
        for (var _i = 0, lines_2 = lines; _i < lines_2.length; _i++) {
            var line = lines_2[_i];
            if (line.trim() && line !== "data: [DONE]") {
                var processed = this.processStreamingLine(line);
                if (processed !== null) {
                    this.invokeOnChunkCallback(processed, streamConfig);
                    allChunks.push(processed);
                }
            }
        }
    };
    ApiCall.prototype.finalizeStreamResult = function (allChunks, resolve, response, streamConfig) {
        if (allChunks.length > 0) {
            var finalResult = this.combineStreamingChunks(allChunks);
            this.logger.debug("Stream processing complete");
            this.invokeOnCompleteCallback(finalResult, streamConfig);
            resolve(finalResult);
        }
        else {
            this.logger.debug("No chunks processed, returning original API response");
            this.invokeOnCompleteCallback(response.data, streamConfig);
            resolve(response.data);
        }
    };
    /**
     * Combines multiple streaming chunks into a single coherent result
     * This is critical for ensuring we return the complete data rather than just the last chunk
     */
    ApiCall.prototype.combineStreamingChunks = function (chunks) {
        if (chunks.length === 0)
            return {};
        if (chunks.length === 1)
            return chunks[0];
        // For conversation streams with message chunks
        var messagesChunks = this.getMessageChunks(chunks);
        if (messagesChunks.length > 0) {
            return this.combineMessageChunks(chunks, messagesChunks);
        }
        // For regular search responses
        var lastChunk = chunks[chunks.length - 1];
        if (!this.isCompleteSearchResponse(lastChunk)) {
            throw new Error("Last chunk is not a complete search response");
        }
        return lastChunk;
    };
    ApiCall.prototype.getMessageChunks = function (chunks) {
        return chunks.filter(this.isChunkMessage);
    };
    ApiCall.prototype.isChunkMessage = function (chunk) {
        return (typeof chunk === "object" &&
            chunk !== null &&
            "message" in chunk &&
            "conversation_id" in chunk);
    };
    ApiCall.prototype.combineMessageChunks = function (chunks, messagesChunks) {
        this.logger.debug("Found ".concat(messagesChunks.length, " message chunks to combine"));
        var lastChunk = chunks[chunks.length - 1];
        if (this.isCompleteSearchResponse(lastChunk)) {
            return lastChunk;
        }
        var metadataChunk = chunks.find(this.isCompleteSearchResponse);
        if (!metadataChunk) {
            throw new Error("No metadata chunk found");
        }
        return metadataChunk;
    };
    ApiCall.prototype.isCompleteSearchResponse = function (chunk) {
        if (typeof chunk === "object" &&
            chunk !== null &&
            Object.keys(chunk).length > 0) {
            return ("results" in chunk ||
                "found" in chunk ||
                "hits" in chunk ||
                "page" in chunk ||
                "search_time_ms" in chunk);
        }
        return false;
    };
    // Attempts to find the next healthy node, looping through the list of nodes once.
    //   But if no healthy nodes are found, it will just return the next node, even if it's unhealthy
    //     so we can try the request for good measure, in case that node has become healthy since
    ApiCall.prototype.getNextNode = function (requestNumber) {
        if (requestNumber === void 0) { requestNumber = 0; }
        // Check if nearestNode is set and is healthy, if so return it
        if (this.nearestNode != null) {
            this.logger.debug("Request #".concat(requestNumber, ": Nodes Health: Node ").concat(this.nearestNode.index, " is ").concat(this.nearestNode.isHealthy === true ? "Healthy" : "Unhealthy"));
            if (this.nearestNode.isHealthy === true ||
                this.nodeDueForHealthcheck(this.nearestNode, requestNumber)) {
                this.logger.debug("Request #".concat(requestNumber, ": Updated current node to Node ").concat(this.nearestNode.index));
                return this.nearestNode;
            }
            this.logger.debug("Request #".concat(requestNumber, ": Falling back to individual nodes"));
        }
        // Fallback to nodes as usual
        this.logger.debug("Request #".concat(requestNumber, ": Nodes Health: ").concat(this.nodes
            .map(function (node) {
            return "Node ".concat(node.index, " is ").concat(node.isHealthy === true ? "Healthy" : "Unhealthy");
        })
            .join(" || ")));
        var candidateNode = this.nodes[0];
        for (var i = 0; i <= this.nodes.length; i++) {
            this.currentNodeIndex = (this.currentNodeIndex + 1) % this.nodes.length;
            candidateNode = this.nodes[this.currentNodeIndex];
            if (candidateNode.isHealthy === true ||
                this.nodeDueForHealthcheck(candidateNode, requestNumber)) {
                this.logger.debug("Request #".concat(requestNumber, ": Updated current node to Node ").concat(candidateNode.index));
                return candidateNode;
            }
        }
        // None of the nodes are marked healthy, but some of them could have become healthy since last health check.
        //  So we will just return the next node.
        this.logger.debug("Request #".concat(requestNumber, ": No healthy nodes were found. Returning the next node, Node ").concat(candidateNode.index));
        return candidateNode;
    };
    ApiCall.prototype.nodeDueForHealthcheck = function (node, requestNumber) {
        if (requestNumber === void 0) { requestNumber = 0; }
        var isDueForHealthcheck = Date.now() - node.lastAccessTimestamp >
            this.healthcheckIntervalSeconds * 1000;
        if (isDueForHealthcheck) {
            this.logger.debug("Request #".concat(requestNumber, ": Node ").concat(node.index, " has exceeded healtcheckIntervalSeconds of ").concat(this.healthcheckIntervalSeconds, ". Adding it back into rotation."));
        }
        return isDueForHealthcheck;
    };
    ApiCall.prototype.initializeMetadataForNodes = function () {
        var _this = this;
        if (this.nearestNode != null) {
            this.nearestNode.index = "nearestNode";
            this.setNodeHealthcheck(this.nearestNode, HEALTHY);
        }
        this.nodes.forEach(function (node, i) {
            node.index = i;
            _this.setNodeHealthcheck(node, HEALTHY);
        });
    };
    ApiCall.prototype.setNodeHealthcheck = function (node, isHealthy) {
        node.isHealthy = isHealthy;
        node.lastAccessTimestamp = Date.now();
    };
    ApiCall.prototype.uriFor = function (endpoint, node) {
        if (node.url != null) {
            return "".concat(node.url).concat(endpoint);
        }
        return "".concat(node.protocol, "://").concat(node.host, ":").concat(node.port).concat(node.path).concat(endpoint);
    };
    ApiCall.prototype.defaultHeaders = function () {
        var defaultHeaders = {};
        if (!this.sendApiKeyAsQueryParam) {
            defaultHeaders[APIKEYHEADERNAME] = this.apiKey;
        }
        defaultHeaders["Content-Type"] = "application/json";
        return defaultHeaders;
    };
    ApiCall.prototype.timer = function (seconds) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve) { return setTimeout(resolve, seconds * 1000); })];
            });
        });
    };
    ApiCall.prototype.customErrorForResponse = function (response, messageFromServer, httpBody) {
        var errorMessage = "Request failed with HTTP code ".concat(response.status);
        if (typeof messageFromServer === "string" &&
            messageFromServer.trim() !== "") {
            errorMessage += " | Server said: ".concat(messageFromServer);
        }
        var error = new TypesenseError_1.default(errorMessage, httpBody, response.status);
        if (response.status === 400) {
            error = new Errors_1.RequestMalformed(errorMessage, httpBody, response.status);
        }
        else if (response.status === 401) {
            error = new Errors_1.RequestUnauthorized(errorMessage, httpBody, response.status);
        }
        else if (response.status === 404) {
            error = new Errors_1.ObjectNotFound(errorMessage, httpBody, response.status);
        }
        else if (response.status === 409) {
            error = new Errors_1.ObjectAlreadyExists(errorMessage, httpBody, response.status);
        }
        else if (response.status === 422) {
            error = new Errors_1.ObjectUnprocessable(errorMessage, httpBody, response.status);
        }
        else if (response.status >= 500 && response.status <= 599) {
            error = new Errors_1.ServerError(errorMessage, httpBody, response.status);
        }
        else {
            error = new Errors_1.HTTPError(errorMessage, httpBody, response.status);
        }
        return error;
    };
    ApiCall.prototype.invokeOnChunkCallback = function (data, streamConfig) {
        if (streamConfig === null || streamConfig === void 0 ? void 0 : streamConfig.onChunk) {
            try {
                streamConfig.onChunk(data);
            }
            catch (error) {
                this.logger.warn("Error in onChunk callback: ".concat(error));
            }
        }
    };
    ApiCall.prototype.invokeOnCompleteCallback = function (data, streamConfig) {
        if (streamConfig === null || streamConfig === void 0 ? void 0 : streamConfig.onComplete) {
            try {
                streamConfig.onComplete(data);
            }
            catch (error) {
                this.logger.warn("Error in onComplete callback: ".concat(error));
            }
        }
    };
    ApiCall.prototype.invokeOnErrorCallback = function (error, streamConfig) {
        if (streamConfig === null || streamConfig === void 0 ? void 0 : streamConfig.onError) {
            var errorObj = (0, Utils_1.toErrorWithMessage)(error);
            try {
                streamConfig.onError(errorObj);
            }
            catch (callbackError) {
                this.logger.warn("Error in onError callback: ".concat(callbackError));
            }
        }
    };
    return ApiCall;
}());
exports.default = ApiCall;
//# sourceMappingURL=ApiCall.js.map