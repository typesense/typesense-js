"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isStreamBody = isStreamBody;
var tslib_1 = require("tslib");
var FetchTransportError_1 = tslib_1.__importDefault(require("./Errors/FetchTransportError"));
var isNodeJSEnvironment = typeof process !== "undefined" &&
    process.versions != null &&
    process.versions.node != null &&
    typeof window === "undefined";
var undiciModule;
// Loaded on first use, so that importing the SDK doesn't install Undici's
// global dispatcher or fail where Undici can't load, such as Jest's jsdom
// environment. Browser and edge bundles replace Undici with an empty module,
// including runtimes that report a Node version, such as Cloudflare's
// nodejs_compat.
function loadUndici() {
    undiciModule !== null && undiciModule !== void 0 ? undiciModule : (undiciModule = Promise.resolve().then(function () { return tslib_1.__importStar(require(/* webpackMode: "eager" */ "undici")); }).then(function (undici) {
        return typeof undici.fetch === "function" &&
            typeof undici.getGlobalDispatcher === "function"
            ? undici
            : undefined;
    }, function () { return undefined; }));
    return undiciModule;
}
var FetchTransport = /** @class */ (function () {
    function FetchTransport(options) {
        this.options = options;
    }
    FetchTransport.prototype.perform = function (request, requestOptions) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var mutableRequest, abortController, abortType, timeoutHandle, abortListener, streamReturned, responseBody, bodyErrorReported, cleanup, clearTimer, resetTimeout, classifyError, callerAbortSignal, undici, _a, fetchFn, url, body, init, dispatcher_1, rawResponse, response, error_1, transportError;
            var _this = this;
            var _b;
            return tslib_1.__generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        mutableRequest = tslib_1.__assign(tslib_1.__assign({}, request), { headers: tslib_1.__assign({}, request.headers), queryParameters: tslib_1.__assign({}, request.queryParameters) });
                        return [4 /*yield*/, this.runRequestHooks(mutableRequest, requestOptions)];
                    case 1:
                        _c.sent();
                        abortController = new AbortController();
                        streamReturned = false;
                        responseBody = null;
                        bodyErrorReported = false;
                        cleanup = function () {
                            if (timeoutHandle !== undefined) {
                                clearTimeout(timeoutHandle);
                            }
                            if (callerAbortSignal && abortListener) {
                                callerAbortSignal.removeEventListener("abort", abortListener);
                            }
                        };
                        clearTimer = function () {
                            if (timeoutHandle !== undefined)
                                clearTimeout(timeoutHandle);
                            timeoutHandle = undefined;
                        };
                        resetTimeout = function () {
                            clearTimer();
                            if (requestOptions.skipConnectionTimeout !== true &&
                                _this.options.connectionTimeoutSeconds > 0) {
                                timeoutHandle = setTimeout(function () {
                                    if (abortType !== undefined)
                                        return;
                                    abortType = "timeout";
                                    abortController.abort();
                                }, _this.options.connectionTimeoutSeconds * 1000);
                            }
                        };
                        classifyError = function (error) {
                            // Cancellation takes precedence even if a body reader wraps the abort.
                            if (abortType === undefined && error instanceof FetchTransportError_1.default) {
                                return error;
                            }
                            if (abortType === "caller") {
                                return new FetchTransportError_1.default("abort", "Request aborted by caller.", {
                                    request: mutableRequest,
                                    originalError: error,
                                });
                            }
                            if (abortType === "timeout") {
                                return new FetchTransportError_1.default("timeout", "Request timed out after ".concat(_this.options.connectionTimeoutSeconds, " seconds."), { request: mutableRequest, originalError: error });
                            }
                            return new FetchTransportError_1.default("network", networkErrorMessage(error), {
                                code: networkErrorCode(error),
                                request: mutableRequest,
                                originalError: error,
                            });
                        };
                        callerAbortSignal = requestOptions.abortSignal;
                        if (callerAbortSignal === null || callerAbortSignal === void 0 ? void 0 : callerAbortSignal.aborted) {
                            throw new FetchTransportError_1.default("abort", "Request aborted by caller.", {
                                request: mutableRequest,
                            });
                        }
                        if (callerAbortSignal) {
                            abortListener = function () {
                                if (abortType !== undefined)
                                    return;
                                abortType = "caller";
                                abortController.abort();
                            };
                            callerAbortSignal.addEventListener("abort", abortListener);
                        }
                        resetTimeout();
                        _c.label = 2;
                    case 2:
                        _c.trys.push([2, 9, 14, 15]);
                        if (!(isNodeJSEnvironment &&
                            (requestOptions.skipConnectionTimeout === true ||
                                this.options.dispatcher !== undefined))) return [3 /*break*/, 4];
                        return [4 /*yield*/, loadUndici()];
                    case 3:
                        _a = _c.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        _a = undefined;
                        _c.label = 5;
                    case 5:
                        undici = _a;
                        fetchFn = this.fetchFn(undici);
                        url = this.urlWithQueryParameters(mutableRequest.url, mutableRequest.queryParameters);
                        body = this.serializedBody(mutableRequest);
                        mutableRequest.url = url;
                        mutableRequest.body = body;
                        if (body === undefined) {
                            // A bodyless GET with Content-Type is not a CORS simple request, so
                            // browsers would send a preflight before every search.
                            Object.keys(mutableRequest.headers)
                                .filter(function (name) { return name.toLowerCase() === "content-type"; })
                                .forEach(function (name) { return delete mutableRequest.headers[name]; });
                        }
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
                        if (undici && requestOptions.skipConnectionTimeout === true) {
                            dispatcher_1 = ((_b = this.options.dispatcher) !== null && _b !== void 0 ? _b : undici.getGlobalDispatcher());
                            // Override at dispatch time: some native fetch versions explicitly pass
                            // their own timeouts, which would override an Agent's defaults.
                            init.dispatcher = {
                                dispatch: function (options, handler) {
                                    return dispatcher_1.dispatch(tslib_1.__assign(tslib_1.__assign({}, options), { headersTimeout: 0, bodyTimeout: 0 }), handler);
                                },
                            };
                        }
                        return [4 /*yield*/, fetchFn(url, init)];
                    case 6:
                        rawResponse = _c.sent();
                        if (isNodeJSEnvironment)
                            resetTimeout();
                        responseBody = rawResponse.body
                            ? this.managedBody(rawResponse.body, {
                                signal: abortController.signal,
                                cleanup: cleanup,
                                // In Node the timer measures how long a read waits on the
                                // network, not how long the consumer takes between reads.
                                onReadStart: function () {
                                    if (isNodeJSEnvironment)
                                        resetTimeout();
                                },
                                onReadEnd: function () {
                                    if (isNodeJSEnvironment)
                                        clearTimer();
                                },
                                classifyError: classifyError,
                                onError: function (error) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                    return tslib_1.__generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0:
                                                bodyErrorReported = true;
                                                return [4 /*yield*/, this.notifyError(error, error.type, requestOptions)];
                                            case 1:
                                                _a.sent();
                                                return [2 /*return*/];
                                        }
                                    });
                                }); },
                            })
                            : null;
                        return [4 /*yield*/, this.normalizedResponse(rawResponse, mutableRequest, responseBody)];
                    case 7:
                        response = _c.sent();
                        return [4 /*yield*/, this.runResponseHooks(response, requestOptions)];
                    case 8:
                        _c.sent();
                        if (abortController.signal.aborted) {
                            throw classifyError(abortController.signal.reason);
                        }
                        streamReturned =
                            response.responseType === "stream" && responseBody !== null;
                        return [2 /*return*/, response];
                    case 9:
                        error_1 = _c.sent();
                        if (!(responseBody && !responseBody.locked)) return [3 /*break*/, 11];
                        return [4 /*yield*/, responseBody.cancel().catch(function () { })];
                    case 10:
                        _c.sent();
                        _c.label = 11;
                    case 11:
                        transportError = classifyError(error_1);
                        if (!(!bodyErrorReported && transportError.type !== "hook")) return [3 /*break*/, 13];
                        return [4 /*yield*/, this.notifyError(transportError, transportError.type, requestOptions)];
                    case 12:
                        _c.sent();
                        _c.label = 13;
                    case 13: throw transportError;
                    case 14:
                        if (!streamReturned)
                            cleanup();
                        return [7 /*endfinally*/];
                    case 15: return [2 /*return*/];
                }
            });
        });
    };
    FetchTransport.prototype.managedBody = function (body, lifecycle) {
        var reader = body.getReader();
        var finished = false;
        var abortListener;
        var cleanup = function () {
            finished = true;
            lifecycle.signal.removeEventListener("abort", abortListener);
            lifecycle.cleanup();
        };
        var fail;
        return new ReadableStream({
            start: function (controller) {
                var _this = this;
                fail = function (error) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                    var transportError;
                    return tslib_1.__generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (finished)
                                    return [2 /*return*/];
                                cleanup();
                                transportError = lifecycle.classifyError(error);
                                // Cancel also unblocks a pending read when a custom fetch ignores abort.
                                void reader
                                    .cancel(error)
                                    .catch(function () { })
                                    .finally(function () { return reader.releaseLock(); });
                                return [4 /*yield*/, lifecycle.onError(transportError)];
                            case 1:
                                _a.sent();
                                controller.error(transportError);
                                return [2 /*return*/];
                        }
                    });
                }); };
                abortListener = function () {
                    void fail(lifecycle.signal.reason);
                };
                lifecycle.signal.addEventListener("abort", abortListener);
                if (lifecycle.signal.aborted)
                    abortListener();
            },
            pull: function (controller) {
                return tslib_1.__awaiter(this, void 0, void 0, function () {
                    var _a, done, value, error_2;
                    return tslib_1.__generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                // A failure can still be reporting to error hooks
                                if (finished)
                                    return [2 /*return*/];
                                _b.label = 1;
                            case 1:
                                _b.trys.push([1, 3, , 5]);
                                lifecycle.onReadStart();
                                return [4 /*yield*/, reader.read()];
                            case 2:
                                _a = _b.sent(), done = _a.done, value = _a.value;
                                if (finished)
                                    return [2 /*return*/];
                                lifecycle.onReadEnd();
                                if (done) {
                                    cleanup();
                                    reader.releaseLock();
                                    controller.close();
                                }
                                else {
                                    controller.enqueue(value);
                                }
                                return [3 /*break*/, 5];
                            case 3:
                                error_2 = _b.sent();
                                return [4 /*yield*/, fail(error_2)];
                            case 4:
                                _b.sent();
                                return [3 /*break*/, 5];
                            case 5: return [2 /*return*/];
                        }
                    });
                });
            },
            cancel: function (reason) {
                return tslib_1.__awaiter(this, void 0, void 0, function () {
                    return tslib_1.__generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                cleanup();
                                _a.label = 1;
                            case 1:
                                _a.trys.push([1, , 3, 4]);
                                return [4 /*yield*/, reader.cancel(reason)];
                            case 2:
                                _a.sent();
                                return [3 /*break*/, 4];
                            case 3:
                                reader.releaseLock();
                                return [7 /*endfinally*/];
                            case 4: return [2 /*return*/];
                        }
                    });
                });
            },
        });
    };
    FetchTransport.prototype.fetchFn = function (undici) {
        if (this.options.fetch) {
            return this.options.fetch;
        }
        if (undici) {
            // Keep fetch and its dispatcher on the same Undici major. Node's native
            // fetch bundles a different one per release (6 on Node 20 and 22, 7 on
            // Node 24, 8 on Node 26), and the handler API changes between majors.
            return undici.fetch;
        }
        if (typeof globalThis.fetch !== "function") {
            throw new FetchTransportError_1.default("network", "No fetch implementation is available. Pass a custom fetch implementation in ConfigurationOptions.fetch.");
        }
        return globalThis.fetch.bind(globalThis);
    };
    FetchTransport.prototype.normalizedResponse = function (response, request, body) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var headers, requestedType, responseType, data, _a;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        headers = this.headersToObject(response.headers);
                        requestedType = request.isStreamingRequest
                            ? "stream"
                            : request.responseType;
                        responseType = requestedType === "stream" &&
                            (!response.ok || (body === null && request.isStreamingRequest))
                            ? "text"
                            : requestedType;
                        if (!(responseType === "stream")) return [3 /*break*/, 1];
                        _a = body;
                        return [3 /*break*/, 3];
                    case 1: return [4 /*yield*/, this.responseData(body === null
                            ? response
                            : new Response(body, { headers: response.headers }), responseType, request)];
                    case 2:
                        _a = _b.sent();
                        _b.label = 3;
                    case 3:
                        data = _a;
                        return [2 /*return*/, {
                                status: response.status,
                                headers: headers,
                                data: data,
                                body: body,
                                request: request,
                                responseType: responseType,
                            }];
                }
            });
        });
    };
    FetchTransport.prototype.responseData = function (response, responseType, request) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var contentType, text;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
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
                            try {
                                return [2 /*return*/, JSON.parse(text)];
                            }
                            catch (error) {
                                throw new FetchTransportError_1.default("parse", "Failed to parse response body.", {
                                    request: request,
                                    originalError: error,
                                });
                            }
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
                        urlSearchParams.append("".concat(key, "[]"), String(entry));
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
        if (typeof body !== "object") {
            return body;
        }
        if (this.isEmptyObjectOrArray(body)) {
            return undefined;
        }
        return this.isBodyInit(body) ? body : JSON.stringify(body);
    };
    FetchTransport.prototype.isBodyInit = function (body) {
        return ((typeof ArrayBuffer !== "undefined" &&
            (body instanceof ArrayBuffer || ArrayBuffer.isView(body))) ||
            (typeof Blob !== "undefined" && body instanceof Blob) ||
            (typeof FormData !== "undefined" && body instanceof FormData) ||
            (typeof URLSearchParams !== "undefined" &&
                body instanceof URLSearchParams) ||
            isStreamBody(body));
    };
    FetchTransport.prototype.isEmptyObjectOrArray = function (body) {
        return Array.isArray(body)
            ? body.length === 0
            : Object.prototype.toString.call(body) === "[object Object]" &&
                Object.keys(body).length === 0;
    };
    FetchTransport.prototype.headersToObject = function (headers) {
        var result = {};
        headers.forEach(function (value, key) {
            result[key] = value;
        });
        return result;
    };
    // A failing request or response hook ends the request without a retry:
    // the node did nothing wrong, and a retry could repeat a write.
    FetchTransport.prototype.runRequestHooks = function (request, requestOptions) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _i, _a, hook, error_3;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _i = 0, _a = this.options.requestHooks || [];
                        _b.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 6];
                        hook = _a[_i];
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, hook(request, this.hookContext(requestOptions))];
                    case 3:
                        _b.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        error_3 = _b.sent();
                        throw hookError(error_3, { request: request });
                    case 5:
                        _i++;
                        return [3 /*break*/, 1];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    FetchTransport.prototype.runResponseHooks = function (response, requestOptions) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _i, _a, hook, error_4;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _i = 0, _a = this.options.responseHooks || [];
                        _b.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 6];
                        hook = _a[_i];
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, hook(response, this.hookContext(requestOptions))];
                    case 3:
                        _b.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        error_4 = _b.sent();
                        throw hookError(error_4, { request: response.request, response: response });
                    case 5:
                        _i++;
                        return [3 /*break*/, 1];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    // Error hooks only observe: a failing one is logged and the original error
    // keeps its classification.
    FetchTransport.prototype.notifyError = function (error, errorType, requestOptions, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _i, _a, hook, hookFailure_1;
            var _b;
            return tslib_1.__generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _i = 0, _a = this.options.errorHooks || [];
                        _c.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 6];
                        hook = _a[_i];
                        _c.label = 2;
                    case 2:
                        _c.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, hook(error, tslib_1.__assign(tslib_1.__assign({}, this.hookContext(requestOptions)), { errorType: errorType, response: response }))];
                    case 3:
                        _c.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        hookFailure_1 = _c.sent();
                        (_b = this.options.logger) === null || _b === void 0 ? void 0 : _b.warn("Request #".concat(requestOptions.requestNumber, ": An error hook failed: ").concat(errorMessage(hookFailure_1)));
                        return [3 /*break*/, 5];
                    case 5:
                        _i++;
                        return [3 /*break*/, 1];
                    case 6: return [2 /*return*/];
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
// Streams can be sent only once, so requests with one are not retried.
function isStreamBody(body) {
    return (typeof body === "object" &&
        body !== null &&
        ((typeof ReadableStream !== "undefined" &&
            body instanceof ReadableStream) ||
            ("pipe" in body && typeof body["pipe"] === "function")));
}
function errorMessage(error) {
    return error instanceof Error ? error.message : String(error);
}
function hookError(error, context) {
    return new FetchTransportError_1.default("hook", errorMessage(error), tslib_1.__assign(tslib_1.__assign({}, context), { originalError: error }));
}
// Undici reports "fetch failed" and keeps the socket error in `cause`, which
// is an AggregateError when every address of a host refuses the connection.
function networkErrorSources(error) {
    var outer = (error !== null && error !== void 0 ? error : {});
    var cause = outer.cause;
    var firstOfCause = Array.isArray(cause === null || cause === void 0 ? void 0 : cause.errors)
        ? cause.errors[0]
        : undefined;
    return [cause, firstOfCause, outer].filter(function (source) {
        return typeof source === "object" && source !== null;
    });
}
function networkErrorMessage(error) {
    var message = networkErrorSources(error)
        .map(function (source) { return source.message; })
        .find(function (value) { return typeof value === "string" && value !== ""; });
    return message !== null && message !== void 0 ? message : String(error);
}
function networkErrorCode(error) {
    return networkErrorSources(error)
        .map(function (source) { return source.code; })
        .find(function (value) { return typeof value === "string"; });
}
//# sourceMappingURL=Transport.js.map