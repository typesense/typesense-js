"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var axios_1 = tslib_1.__importDefault(require("axios"));
var Errors_1 = require("./Errors");
var TypesenseError_1 = tslib_1.__importDefault(require("./Errors/TypesenseError"));
var http_1 = require("http");
var https_1 = require("https");
var APIKEYHEADERNAME = "X-TYPESENSE-API-KEY";
var HEALTHY = true;
var UNHEALTHY = false;
var isNodeJSEnvironment = typeof process !== "undefined" &&
    process.versions != null &&
    process.versions.node != null;
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
        var _b = _a === void 0 ? {} : _a, _c = _b.abortSignal, abortSignal = _c === void 0 ? null : _c, _d = _b.responseType, responseType = _d === void 0 ? undefined : _d;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_e) {
                return [2 /*return*/, this.performRequest("get", endpoint, {
                        queryParameters: queryParameters,
                        abortSignal: abortSignal,
                        responseType: responseType,
                    })];
            });
        });
    };
    ApiCall.prototype.delete = function (endpoint, queryParameters) {
        if (queryParameters === void 0) { queryParameters = {}; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this.performRequest("delete", endpoint, { queryParameters: queryParameters })];
            });
        });
    };
    ApiCall.prototype.post = function (endpoint, bodyParameters, queryParameters, additionalHeaders) {
        if (bodyParameters === void 0) { bodyParameters = {}; }
        if (queryParameters === void 0) { queryParameters = {}; }
        if (additionalHeaders === void 0) { additionalHeaders = {}; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this.performRequest("post", endpoint, {
                        queryParameters: queryParameters,
                        bodyParameters: bodyParameters,
                        additionalHeaders: additionalHeaders,
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
                    })];
            });
        });
    };
    ApiCall.prototype.performRequest = function (requestType, endpoint, _a) {
        var _b, _c, _d, _e;
        var _f = _a.queryParameters, queryParameters = _f === void 0 ? null : _f, _g = _a.bodyParameters, bodyParameters = _g === void 0 ? null : _g, _h = _a.additionalHeaders, additionalHeaders = _h === void 0 ? {} : _h, _j = _a.abortSignal, abortSignal = _j === void 0 ? null : _j, _k = _a.responseType, responseType = _k === void 0 ? undefined : _k, _l = _a.skipConnectionTimeout, skipConnectionTimeout = _l === void 0 ? false : _l, _m = _a.enableKeepAlive, enableKeepAlive = _m === void 0 ? undefined : _m;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var requestNumber, lastException, wasAborted, _loop_1, this_1, numTries, state_1;
            return tslib_1.__generator(this, function (_o) {
                switch (_o.label) {
                    case 0:
                        this.configuration.validate();
                        requestNumber = Date.now();
                        wasAborted = false;
                        this.logger.debug("Request #".concat(requestNumber, ": Performing ").concat(requestType.toUpperCase(), " request: ").concat(endpoint));
                        _loop_1 = function (numTries) {
                            var node, abortListener, requestOptions, cancelToken, source_1, response, error_1;
                            return tslib_1.__generator(this, function (_p) {
                                switch (_p.label) {
                                    case 0:
                                        node = this_1.getNextNode(requestNumber);
                                        this_1.logger.debug("Request #".concat(requestNumber, ": Attempting ").concat(requestType.toUpperCase(), " request Try #").concat(numTries, " to Node ").concat(node.index));
                                        if (abortSignal && abortSignal.aborted) {
                                            return [2 /*return*/, { value: Promise.reject(new Error("Request aborted by caller.")) }];
                                        }
                                        abortListener = void 0;
                                        _p.label = 1;
                                    case 1:
                                        _p.trys.push([1, 3, 5, 6]);
                                        requestOptions = {
                                            method: requestType,
                                            url: this_1.uriFor(endpoint, node),
                                            headers: Object.assign({}, this_1.defaultHeaders(), additionalHeaders, this_1.additionalUserHeaders),
                                            maxContentLength: Infinity,
                                            maxBodyLength: Infinity,
                                            responseType: responseType,
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
                                        return [4 /*yield*/, (0, axios_1.default)(requestOptions)];
                                    case 2:
                                        response = _p.sent();
                                        if (response.status >= 1 && response.status <= 499) {
                                            // Treat any status code > 0 and < 500 to be an indication that node is healthy
                                            // We exclude 0 since some clients return 0 when request fails
                                            this_1.setNodeHealthcheck(node, HEALTHY);
                                        }
                                        this_1.logger.debug("Request #".concat(requestNumber, ": Request to Node ").concat(node.index, " was made. Response Code was ").concat(response.status, "."));
                                        if (response.status >= 200 && response.status < 300) {
                                            return [2 /*return*/, { value: Promise.resolve(response.data) }];
                                        }
                                        else if (response.status < 500) {
                                            return [2 /*return*/, { value: Promise.reject(this_1.customErrorForResponse(response, (_b = response.data) === null || _b === void 0 ? void 0 : _b.message)) }];
                                        }
                                        else {
                                            // Retry all other HTTP errors (HTTPStatus > 500)
                                            // This will get caught by the catch block below
                                            throw this_1.customErrorForResponse(response, (_c = response.data) === null || _c === void 0 ? void 0 : _c.message);
                                        }
                                        return [3 /*break*/, 6];
                                    case 3:
                                        error_1 = _p.sent();
                                        // This block handles retries for HTTPStatus > 500 and network layer issues like connection timeouts
                                        if (!wasAborted) {
                                            this_1.setNodeHealthcheck(node, UNHEALTHY);
                                        }
                                        lastException = error_1;
                                        this_1.logger.warn("Request #".concat(requestNumber, ": Request to Node ").concat(node.index, " failed due to \"").concat((_d = error_1 === null || error_1 === void 0 ? void 0 : error_1.code) !== null && _d !== void 0 ? _d : "", " ").concat(error_1.message).concat(error_1.response == null
                                            ? ""
                                            : " - " + JSON.stringify((_e = error_1.response) === null || _e === void 0 ? void 0 : _e.data), "\""));
                                        // this.logger.debug(error.stack)
                                        if (wasAborted) {
                                            return [2 /*return*/, { value: Promise.reject(new Error("Request aborted by caller.")) }];
                                        }
                                        if (numTries < this_1.numRetriesPerRequest + 1) {
                                            this_1.logger.warn("Request #".concat(requestNumber, ": Sleeping for ").concat(this_1.retryIntervalSeconds, "s and then retrying request..."));
                                        }
                                        return [4 /*yield*/, this_1.timer(this_1.retryIntervalSeconds)];
                                    case 4:
                                        _p.sent();
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
                        _o.label = 1;
                    case 1:
                        if (!(numTries <= this.numRetriesPerRequest + 1)) return [3 /*break*/, 4];
                        return [5 /*yield**/, _loop_1(numTries)];
                    case 2:
                        state_1 = _o.sent();
                        if (typeof state_1 === "object")
                            return [2 /*return*/, state_1.value];
                        _o.label = 3;
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
    ApiCall.prototype.customErrorForResponse = function (response, messageFromServer) {
        var errorMessage = "Request failed with HTTP code ".concat(response.status);
        if (typeof messageFromServer === "string" &&
            messageFromServer.trim() !== "") {
            errorMessage += " | Server said: ".concat(messageFromServer);
        }
        var error = new TypesenseError_1.default(errorMessage);
        if (response.status === 400) {
            error = new Errors_1.RequestMalformed(errorMessage);
        }
        else if (response.status === 401) {
            error = new Errors_1.RequestUnauthorized(errorMessage);
        }
        else if (response.status === 404) {
            error = new Errors_1.ObjectNotFound(errorMessage);
        }
        else if (response.status === 409) {
            error = new Errors_1.ObjectAlreadyExists(errorMessage);
        }
        else if (response.status === 422) {
            error = new Errors_1.ObjectUnprocessable(errorMessage);
        }
        else if (response.status >= 500 && response.status <= 599) {
            error = new Errors_1.ServerError(errorMessage);
        }
        else {
            error = new Errors_1.HTTPError(errorMessage);
        }
        error.httpStatus = response.status;
        return error;
    };
    return ApiCall;
}());
exports.default = ApiCall;
//# sourceMappingURL=ApiCall.js.map