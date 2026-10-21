"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var Errors_1 = require("./Errors");
var TypesenseError_1 = tslib_1.__importDefault(require("./Errors/TypesenseError"));
var FetchTransportError_1 = tslib_1.__importDefault(require("./Errors/FetchTransportError"));
var Utils_1 = require("./Utils");
var Transport_1 = tslib_1.__importStar(require("./Transport"));
var APIKEYHEADERNAME = "X-TYPESENSE-API-KEY";
var HEALTHY = true;
var UNHEALTHY = false;
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
        this.transport = new Transport_1.default({
            fetch: this.configuration.fetch,
            paramsSerializer: this.configuration.paramsSerializer,
            dispatcher: this.configuration.dispatcher,
            requestHooks: this.configuration.requestHooks,
            responseHooks: this.configuration.responseHooks,
            errorHooks: this.configuration.errorHooks,
            connectionTimeoutSeconds: this.connectionTimeoutSeconds,
            logger: this.logger,
        });
        this.initializeMetadataForNodes();
        this.currentNodeIndex = -1;
    }
    ApiCall.prototype.get = function (endpoint_1) {
        return tslib_1.__awaiter(this, arguments, void 0, function (endpoint, queryParameters, _a) {
            if (queryParameters === void 0) { queryParameters = {}; }
            var _b = _a === void 0 ? {} : _a, _c = _b.abortSignal, abortSignal = _c === void 0 ? null : _c, _d = _b.responseType, responseType = _d === void 0 ? undefined : _d, _e = _b.streamConfig, streamConfig = _e === void 0 ? undefined : _e, isStreamingRequest = _b.isStreamingRequest;
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
    ApiCall.prototype.delete = function (endpoint_1) {
        return tslib_1.__awaiter(this, arguments, void 0, function (endpoint, queryParameters) {
            if (queryParameters === void 0) { queryParameters = {}; }
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this.performRequest("delete", endpoint, {
                        queryParameters: queryParameters,
                        isStreamingRequest: false,
                    })];
            });
        });
    };
    ApiCall.prototype.post = function (endpoint_1) {
        return tslib_1.__awaiter(this, arguments, void 0, function (endpoint, bodyParameters, queryParameters, additionalHeaders, _a) {
            if (bodyParameters === void 0) { bodyParameters = {}; }
            if (queryParameters === void 0) { queryParameters = {}; }
            if (additionalHeaders === void 0) { additionalHeaders = {}; }
            var _b = _a === void 0 ? {} : _a, _c = _b.abortSignal, abortSignal = _c === void 0 ? null : _c, _d = _b.responseType, responseType = _d === void 0 ? undefined : _d, _e = _b.streamConfig, streamConfig = _e === void 0 ? undefined : _e, isStreamingRequest = _b.isStreamingRequest;
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
    ApiCall.prototype.put = function (endpoint_1) {
        return tslib_1.__awaiter(this, arguments, void 0, function (endpoint, bodyParameters, queryParameters) {
            if (bodyParameters === void 0) { bodyParameters = {}; }
            if (queryParameters === void 0) { queryParameters = {}; }
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this.performRequest("put", endpoint, {
                        queryParameters: queryParameters,
                        bodyParameters: bodyParameters,
                        isStreamingRequest: false,
                    })];
            });
        });
    };
    ApiCall.prototype.patch = function (endpoint_1) {
        return tslib_1.__awaiter(this, arguments, void 0, function (endpoint, bodyParameters, queryParameters) {
            if (bodyParameters === void 0) { bodyParameters = {}; }
            if (queryParameters === void 0) { queryParameters = {}; }
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this.performRequest("patch", endpoint, {
                        queryParameters: queryParameters,
                        bodyParameters: bodyParameters,
                        isStreamingRequest: false,
                    })];
            });
        });
    };
    ApiCall.prototype.performRequest = function (requestType_1, endpoint_1, _a) {
        return tslib_1.__awaiter(this, arguments, void 0, function (requestType, endpoint, _b) {
            var requestNumber, lastException, numTries, node, sentBody, requestHeaders, requestQueryParameters, request, transportOptions, response, error, error_1, wasAborted;
            var _c, _d, _e;
            var _f = _b.queryParameters, queryParameters = _f === void 0 ? null : _f, _g = _b.bodyParameters, bodyParameters = _g === void 0 ? null : _g, _h = _b.additionalHeaders, additionalHeaders = _h === void 0 ? {} : _h, _j = _b.abortSignal, abortSignal = _j === void 0 ? null : _j, _k = _b.responseType, responseType = _k === void 0 ? undefined : _k, _l = _b.skipConnectionTimeout, skipConnectionTimeout = _l === void 0 ? false : _l, _m = _b.streamConfig, streamConfig = _m === void 0 ? undefined : _m, isStreamingRequest = _b.isStreamingRequest;
            return tslib_1.__generator(this, function (_o) {
                switch (_o.label) {
                    case 0:
                        this.configuration.validate();
                        if (isStreamingRequest) {
                            this.logger.debug("Request: Performing streaming request to ".concat(endpoint));
                            responseType = "stream";
                        }
                        requestNumber = Date.now();
                        this.logger.debug("Request #".concat(requestNumber, ": Performing ").concat(requestType.toUpperCase(), " request: ").concat(endpoint));
                        numTries = 1;
                        _o.label = 1;
                    case 1:
                        if (!(numTries <= this.numRetriesPerRequest + 1)) return [3 /*break*/, 8];
                        node = this.getNextNode(requestNumber);
                        this.logger.debug("Request #".concat(requestNumber, ": Attempting ").concat(requestType.toUpperCase(), " request Try #").concat(numTries, " to Node ").concat(node.index));
                        if (abortSignal && abortSignal.aborted) {
                            return [2 /*return*/, Promise.reject(new Error("Request aborted by caller."))];
                        }
                        sentBody = void 0;
                        _o.label = 2;
                    case 2:
                        _o.trys.push([2, 5, , 7]);
                        if (this.configuration.dispatcher) {
                            this.logger.debug("Request #".concat(requestNumber, ": Using custom fetch dispatcher"));
                        }
                        requestHeaders = this.mergeHeaders(this.defaultHeaders(), isStreamingRequest ? { Accept: "text/event-stream" } : {}, additionalHeaders, this.additionalUserHeaders);
                        requestQueryParameters = queryParameters && Object.keys(queryParameters).length !== 0
                            ? tslib_1.__assign({}, queryParameters) : {};
                        if (this.sendApiKeyAsQueryParam) {
                            requestQueryParameters["x-typesense-api-key"] = this.apiKey;
                        }
                        if (this.configuration.paramsSerializer) {
                            this.logger.debug("Request #".concat(requestNumber, ": Using custom paramsSerializer"));
                        }
                        request = {
                            method: requestType,
                            url: this.uriFor(endpoint, node),
                            headers: requestHeaders,
                            queryParameters: requestQueryParameters,
                            bodyParameters: bodyParameters,
                            responseType: responseType,
                            isStreamingRequest: isStreamingRequest,
                        };
                        transportOptions = {
                            abortSignal: abortSignal,
                            skipConnectionTimeout: skipConnectionTimeout,
                            requestNumber: requestNumber,
                            attemptNumber: numTries,
                            nodeIndex: node.index,
                        };
                        return [4 /*yield*/, this.transport.perform(request, transportOptions)];
                    case 3:
                        response = _o.sent();
                        sentBody = response.request.body;
                        if (response.status >= 1 && response.status <= 499) {
                            // Treat any status code > 0 and < 500 to be an indication that node is healthy
                            // We exclude 0 since some clients return 0 when request fails
                            this.setNodeHealthcheck(node, HEALTHY);
                        }
                        this.logger.debug("Request #".concat(requestNumber, ": Request to Node ").concat(node.index, " was made. Response Code was ").concat(response.status, "."));
                        if (response.status >= 200 && response.status < 300) {
                            if (isStreamingRequest) {
                                return [2 /*return*/, this.handleStreamingResponse(response, streamConfig)];
                            }
                            return [2 /*return*/, Promise.resolve(response.data)];
                        }
                        error = this.customErrorForResponse(response, this.messageFromResponseData(response.data), 
                        // The body as the caller passed it, like v3's Axios config.data
                        response.request.body === undefined ? undefined : bodyParameters);
                        return [4 /*yield*/, this.transport.notifyError(error, "http", transportOptions, response)];
                    case 4:
                        _o.sent();
                        if (response.status < 500) {
                            // Next, if response is anything but 5xx, don't retry, return a custom error
                            return [2 /*return*/, Promise.reject(error)];
                        }
                        // Retry all other HTTP errors (HTTPStatus > 500)
                        // This will get caught by the catch block below
                        throw error;
                    case 5:
                        error_1 = _o.sent();
                        if (error_1 instanceof FetchTransportError_1.default && error_1.type === "hook") {
                            // A hook failed, not the node, so there is nothing to retry
                            return [2 /*return*/, Promise.reject(error_1)];
                        }
                        if (error_1 instanceof FetchTransportError_1.default) {
                            sentBody = (_c = error_1.request) === null || _c === void 0 ? void 0 : _c.body;
                        }
                        wasAborted = this.isCallerAbortError(error_1);
                        if (!wasAborted) {
                            this.setNodeHealthcheck(node, UNHEALTHY);
                        }
                        lastException = error_1;
                        this.logger.warn("Request #".concat(requestNumber, ": Request to Node ").concat(node.index, " failed due to \"").concat((_d = error_1 === null || error_1 === void 0 ? void 0 : error_1.code) !== null && _d !== void 0 ? _d : "", " ").concat(error_1.message).concat(error_1.response == null
                            ? ""
                            : " - " + JSON.stringify((_e = error_1.response) === null || _e === void 0 ? void 0 : _e.data), "\""));
                        if (wasAborted) {
                            return [2 /*return*/, Promise.reject(new Error("Request aborted by caller."))];
                        }
                        if (isStreamingRequest) {
                            this.invokeOnErrorCallback(error_1, streamConfig);
                        }
                        if ((0, Transport_1.isStreamBody)(bodyParameters) || (0, Transport_1.isStreamBody)(sentBody)) {
                            this.logger.debug("Request #".concat(requestNumber, ": Not retrying, since a stream body can only be sent once"));
                            return [2 /*return*/, Promise.reject(lastException)];
                        }
                        else if (numTries < this.numRetriesPerRequest + 1) {
                            this.logger.warn("Request #".concat(requestNumber, ": Sleeping for ").concat(this.retryIntervalSeconds, "s and then retrying request..."));
                        }
                        else {
                            this.logger.debug("Request #".concat(requestNumber, ": No retries left. Raising last error"));
                            return [2 /*return*/, Promise.reject(lastException)];
                        }
                        return [4 /*yield*/, this.timer(this.retryIntervalSeconds)];
                    case 6:
                        _o.sent();
                        return [3 /*break*/, 7];
                    case 7:
                        numTries++;
                        return [3 /*break*/, 1];
                    case 8:
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
            catch (_a) {
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
            catch (_a) {
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
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                this.logger.debug("Handling streaming response");
                return [2 /*return*/, new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                        return tslib_1.__generator(this, function (_a) {
                            try {
                                if (this.isReadableStream(response.data)) {
                                    return [2 /*return*/, this.handleReadableStream(response.data, resolve, reject, response, streamConfig)];
                                }
                                if (typeof response.data === "string") {
                                    return [2 /*return*/, this.handleStringStreamResponse(response.data, resolve, response, streamConfig)];
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
                    }); })];
            });
        });
    };
    ApiCall.prototype.handleReadableStream = function (stream, resolve, reject, response, streamConfig) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var reader, decoder, allChunks, buffer, _a, done, value, lines_1, chunk, lines, error_2;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.logger.debug("Found ReadableStream in response.data");
                        reader = stream.getReader();
                        decoder = new TextDecoder();
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
                            buffer += decoder.decode();
                            if (buffer.trim()) {
                                lines_1 = buffer.split("\n");
                                this.processStreamLines(lines_1, allChunks, streamConfig);
                            }
                            return [3 /*break*/, 4];
                        }
                        chunk = decoder.decode(value, { stream: true });
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
    ApiCall.prototype.handleStringStreamResponse = function (data, resolve, response, streamConfig) {
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
    ApiCall.prototype.isReadableStream = function (data) {
        return (typeof data === "object" &&
            data !== null &&
            "getReader" in data &&
            typeof data.getReader === "function");
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
        defaultHeaders["Accept"] = "application/json, text/plain, */*";
        if (!this.sendApiKeyAsQueryParam) {
            defaultHeaders[APIKEYHEADERNAME] = this.apiKey;
        }
        defaultHeaders["Content-Type"] = "application/json";
        return defaultHeaders;
    };
    ApiCall.prototype.mergeHeaders = function () {
        var headerSources = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            headerSources[_i] = arguments[_i];
        }
        var result = {};
        var headerNamesByLowercaseName = {};
        headerSources.forEach(function (headers) {
            Object.entries(headers || {}).forEach(function (_a) {
                var headerName = _a[0], headerValue = _a[1];
                var lowercaseHeaderName = headerName.toLowerCase();
                var existingHeaderName = headerNamesByLowercaseName[lowercaseHeaderName];
                if (existingHeaderName !== undefined) {
                    delete result[existingHeaderName];
                }
                result[headerName] = headerValue;
                headerNamesByLowercaseName[lowercaseHeaderName] = headerName;
            });
        });
        return result;
    };
    ApiCall.prototype.isCallerAbortError = function (error) {
        return error instanceof FetchTransportError_1.default && error.type === "abort";
    };
    ApiCall.prototype.messageFromResponseData = function (data) {
        return typeof data === "object" &&
            data !== null &&
            "message" in data &&
            typeof data.message === "string"
            ? data.message
            : "";
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