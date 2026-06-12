"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FetchTransportError = void 0;
var tslib_1 = require("tslib");
var FetchTransportError = /** @class */ (function (_super) {
    tslib_1.__extends(FetchTransportError, _super);
    function FetchTransportError(type, message, _a) {
        var _b = _a === void 0 ? {} : _a, request = _b.request, response = _b.response, originalError = _b.originalError;
        var _this = _super.call(this, message) || this;
        _this.name = "FetchTransportError";
        _this.type = type;
        _this.request = request;
        _this.response = response;
        _this.originalError = originalError;
        return _this;
    }
    return FetchTransportError;
}(Error));
exports.FetchTransportError = FetchTransportError;
var isNodeJSEnvironment = typeof process !== "undefined" &&
    process.versions != null &&
    process.versions.node != null &&
    typeof window === "undefined";
var FetchTransport = /** @class */ (function () {
    function FetchTransport(options) {
        this.options = options;
    }
    FetchTransport.prototype.perform = function (request, requestOptions) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var mutableRequest, abortController, abortType, timeoutHandle, abortListener, callerAbortSignal, fetchFn, url, body, init, rawResponse, response, error_1, type, message, transportError;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mutableRequest = tslib_1.__assign(tslib_1.__assign({}, request), { headers: tslib_1.__assign({}, request.headers), queryParameters: tslib_1.__assign({}, request.queryParameters) });
                        return [4 /*yield*/, this.runRequestHooks(mutableRequest, requestOptions)];
                    case 1:
                        _a.sent();
                        abortController = new AbortController();
                        callerAbortSignal = requestOptions.abortSignal;
                        if (callerAbortSignal === null || callerAbortSignal === void 0 ? void 0 : callerAbortSignal.aborted) {
                            throw new FetchTransportError("abort", "Request aborted by caller.", {
                                request: mutableRequest,
                            });
                        }
                        if (callerAbortSignal) {
                            abortListener = function () {
                                abortType = "caller";
                                abortController.abort();
                            };
                            callerAbortSignal.addEventListener("abort", abortListener);
                        }
                        if (requestOptions.skipConnectionTimeout !== true) {
                            timeoutHandle = setTimeout(function () {
                                abortType = "timeout";
                                abortController.abort();
                            }, this.options.connectionTimeoutSeconds * 1000);
                        }
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 6, 10, 11]);
                        fetchFn = this.fetchFn();
                        url = this.urlWithQueryParameters(mutableRequest.url, mutableRequest.queryParameters);
                        body = this.serializedBody(mutableRequest);
                        mutableRequest.url = url;
                        mutableRequest.body = body;
                        init = {
                            method: mutableRequest.method.toUpperCase(),
                            headers: mutableRequest.headers,
                            signal: abortController.signal,
                        };
                        if (body !== undefined) {
                            init.body = body;
                            if (isNodeJSEnvironment) {
                                init.duplex = "half";
                            }
                        }
                        if (this.options.dispatcher !== undefined) {
                            init.dispatcher = this.options.dispatcher;
                        }
                        return [4 /*yield*/, fetchFn(url, init)];
                    case 3:
                        rawResponse = _a.sent();
                        return [4 /*yield*/, this.normalizedResponse(rawResponse, mutableRequest)];
                    case 4:
                        response = _a.sent();
                        return [4 /*yield*/, this.runResponseHooks(response, requestOptions)];
                    case 5:
                        _a.sent();
                        return [2 /*return*/, response];
                    case 6:
                        error_1 = _a.sent();
                        if (!(error_1 instanceof FetchTransportError)) return [3 /*break*/, 8];
                        return [4 /*yield*/, this.runErrorHooks(error_1, error_1.type, requestOptions)];
                    case 7:
                        _a.sent();
                        throw error_1;
                    case 8:
                        type = abortType === "caller"
                            ? "abort"
                            : abortType === "timeout"
                                ? "timeout"
                                : "network";
                        message = type === "abort"
                            ? "Request aborted by caller."
                            : type === "timeout"
                                ? "Request timed out after ".concat(this.options.connectionTimeoutSeconds, " seconds.")
                                : error_1 instanceof Error
                                    ? error_1.message
                                    : String(error_1);
                        transportError = new FetchTransportError(type, message, {
                            request: mutableRequest,
                            originalError: error_1,
                        });
                        return [4 /*yield*/, this.runErrorHooks(transportError, type, requestOptions)];
                    case 9:
                        _a.sent();
                        throw transportError;
                    case 10:
                        if (timeoutHandle !== undefined) {
                            clearTimeout(timeoutHandle);
                        }
                        if (callerAbortSignal && abortListener) {
                            callerAbortSignal.removeEventListener("abort", abortListener);
                        }
                        return [7 /*endfinally*/];
                    case 11: return [2 /*return*/];
                }
            });
        });
    };
    FetchTransport.prototype.notifyError = function (error, type, requestOptions, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.runErrorHooks(error, type, requestOptions, response)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    FetchTransport.prototype.fetchFn = function () {
        if (this.options.fetch) {
            return this.options.fetch;
        }
        if (typeof globalThis.fetch !== "function") {
            throw new FetchTransportError("network", "No fetch implementation is available. Pass a custom fetch implementation in ConfigurationOptions.fetch.");
        }
        return globalThis.fetch.bind(globalThis);
    };
    FetchTransport.prototype.normalizedResponse = function (response, request) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var headers, responseType, data, error_2;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        headers = this.headersToObject(response.headers);
                        responseType = request.isStreamingRequest
                            ? "stream"
                            : request.responseType;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.responseData(response, responseType)];
                    case 2:
                        data = _a.sent();
                        return [2 /*return*/, {
                                status: response.status,
                                headers: headers,
                                data: data,
                                body: response.body,
                                request: request,
                                responseType: responseType,
                            }];
                    case 3:
                        error_2 = _a.sent();
                        throw new FetchTransportError("parse", "Failed to parse response body.", {
                            request: request,
                            originalError: error_2,
                        });
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    FetchTransport.prototype.responseData = function (response, responseType) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var contentType, text;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (responseType === "stream") {
                            return [2 /*return*/, response.body];
                        }
                        if (responseType === "arraybuffer") {
                            return [2 /*return*/, response.arrayBuffer()];
                        }
                        if (responseType === "blob") {
                            return [2 /*return*/, response.blob()];
                        }
                        contentType = response.headers.get("content-type") || "";
                        return [4 /*yield*/, response.text()];
                    case 1:
                        text = _a.sent();
                        if (text === "") {
                            return [2 /*return*/, ""];
                        }
                        if (responseType === "json" ||
                            contentType.toLowerCase().startsWith("application/json")) {
                            return [2 /*return*/, JSON.parse(text)];
                        }
                        return [2 /*return*/, text];
                }
            });
        });
    };
    FetchTransport.prototype.urlWithQueryParameters = function (url, queryParameters) {
        if (Object.keys(queryParameters).length === 0) {
            return url;
        }
        var serializedQueryParameters = this.serializeQueryParameters(queryParameters);
        if (serializedQueryParameters === "") {
            return url;
        }
        var separator = url.includes("?") ? "&" : "?";
        return "".concat(url).concat(separator).concat(serializedQueryParameters);
    };
    FetchTransport.prototype.serializeQueryParameters = function (queryParameters) {
        var serializer = this.options.paramsSerializer;
        if (typeof serializer === "function") {
            return serializer(queryParameters);
        }
        if (serializer && typeof serializer.serialize === "function") {
            return serializer.serialize(queryParameters);
        }
        var urlSearchParams = new URLSearchParams();
        Object.entries(queryParameters).forEach(function (_a) {
            var key = _a[0], value = _a[1];
            if (value === undefined || value === null) {
                return;
            }
            if (Array.isArray(value)) {
                value.forEach(function (entry) {
                    if (entry !== undefined && entry !== null) {
                        urlSearchParams.append(key, String(entry));
                    }
                });
                return;
            }
            urlSearchParams.append(key, String(value));
        });
        return urlSearchParams.toString();
    };
    FetchTransport.prototype.serializedBody = function (request) {
        var body = request.body !== undefined ? request.body : request.bodyParameters;
        if (body === undefined || body === null) {
            return undefined;
        }
        if (typeof body === "string") {
            return body.length === 0 ? undefined : body;
        }
        if (typeof body === "object" && this.isPlainEmptyObject(body)) {
            return undefined;
        }
        if (this.shouldSerializeAsJSON(request.headers, body)) {
            return JSON.stringify(body);
        }
        return body;
    };
    FetchTransport.prototype.shouldSerializeAsJSON = function (_headers, body) {
        if (typeof body !== "object" || body === null) {
            return false;
        }
        if (this.isBodyInit(body)) {
            return false;
        }
        return true;
    };
    FetchTransport.prototype.isBodyInit = function (body) {
        return ((typeof ArrayBuffer !== "undefined" && body instanceof ArrayBuffer) ||
            (typeof Blob !== "undefined" && body instanceof Blob) ||
            (typeof FormData !== "undefined" && body instanceof FormData) ||
            (typeof URLSearchParams !== "undefined" &&
                body instanceof URLSearchParams) ||
            (typeof ReadableStream !== "undefined" &&
                body instanceof ReadableStream) ||
            ("pipe" in body && typeof body["pipe"] === "function"));
    };
    FetchTransport.prototype.isPlainEmptyObject = function (body) {
        return (Object.prototype.toString.call(body) === "[object Object]" &&
            Object.keys(body).length === 0);
    };
    FetchTransport.prototype.headersToObject = function (headers) {
        var result = {};
        headers.forEach(function (value, key) {
            result[key] = value;
        });
        return result;
    };
    FetchTransport.prototype.runRequestHooks = function (request, requestOptions) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _i, _a, hook;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _i = 0, _a = this.options.requestHooks || [];
                        _b.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 4];
                        hook = _a[_i];
                        return [4 /*yield*/, hook(request, this.hookContext(requestOptions))];
                    case 2:
                        _b.sent();
                        _b.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    FetchTransport.prototype.runResponseHooks = function (response, requestOptions) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _i, _a, hook;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _i = 0, _a = this.options.responseHooks || [];
                        _b.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 4];
                        hook = _a[_i];
                        return [4 /*yield*/, hook(response, this.hookContext(requestOptions))];
                    case 2:
                        _b.sent();
                        _b.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    FetchTransport.prototype.runErrorHooks = function (error, errorType, requestOptions, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _i, _a, hook;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _i = 0, _a = this.options.errorHooks || [];
                        _b.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 4];
                        hook = _a[_i];
                        return [4 /*yield*/, hook(error, tslib_1.__assign(tslib_1.__assign({}, this.hookContext(requestOptions)), { errorType: errorType, response: response }))];
                    case 2:
                        _b.sent();
                        _b.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    FetchTransport.prototype.hookContext = function (requestOptions) {
        return {
            requestNumber: requestOptions.requestNumber,
            attemptNumber: requestOptions.attemptNumber,
            nodeIndex: requestOptions.nodeIndex,
        };
    };
    return FetchTransport;
}());
exports.default = FetchTransport;
//# sourceMappingURL=Transport.js.map