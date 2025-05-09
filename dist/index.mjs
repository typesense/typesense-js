import logger from 'loglevel';
import axios from 'axios';

var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// node-modules-polyfills-empty:http
var require_http = __commonJS({
  "node-modules-polyfills-empty:http"(exports, module) {
    module.exports = {};
  }
});

// node-modules-polyfills-empty:https
var require_https = __commonJS({
  "node-modules-polyfills-empty:https"(exports, module) {
    module.exports = {};
  }
});

// node-modules-polyfills-empty:crypto
var require_crypto = __commonJS({
  "node-modules-polyfills-empty:crypto"(exports, module) {
    module.exports = {};
  }
});

// src/Typesense/Errors/index.ts
var Errors_exports = {};
__export(Errors_exports, {
  HTTPError: () => HTTPError,
  ImportError: () => ImportError,
  MissingConfigurationError: () => MissingConfigurationError,
  ObjectAlreadyExists: () => ObjectAlreadyExists,
  ObjectNotFound: () => ObjectNotFound,
  ObjectUnprocessable: () => ObjectUnprocessable,
  RequestMalformed: () => RequestMalformed,
  RequestUnauthorized: () => RequestUnauthorized,
  ServerError: () => ServerError,
  TypesenseError: () => TypesenseError
});

// src/Typesense/Errors/TypesenseError.ts
var TypesenseError = class extends Error {
  // Source: https://stackoverflow.com/a/58417721/123545
  constructor(message, httpBody, httpStatus) {
    super(message);
    this.name = new.target.name;
    this.httpBody = httpBody;
    this.httpStatus = httpStatus;
    Object.setPrototypeOf(this, new.target.prototype);
  }
};

// src/Typesense/Errors/HTTPError.ts
var HTTPError = class extends TypesenseError {
};

// src/Typesense/Errors/MissingConfigurationError.ts
var MissingConfigurationError = class extends TypesenseError {
};

// src/Typesense/Errors/ObjectAlreadyExists.ts
var ObjectAlreadyExists = class extends TypesenseError {
};

// src/Typesense/Errors/ObjectNotFound.ts
var ObjectNotFound = class extends TypesenseError {
};

// src/Typesense/Errors/ObjectUnprocessable.ts
var ObjectUnprocessable = class extends TypesenseError {
};

// src/Typesense/Errors/RequestMalformed.ts
var RequestMalformed = class extends TypesenseError {
};

// src/Typesense/Errors/RequestUnauthorized.ts
var RequestUnauthorized = class extends TypesenseError {
};

// src/Typesense/Errors/ServerError.ts
var ServerError = class extends TypesenseError {
};

// src/Typesense/Errors/ImportError.ts
var ImportError = class extends TypesenseError {
  constructor(message, importResults, payload) {
    super(message);
    this.importResults = importResults;
    this.payload = payload;
  }
};

// src/Typesense/Configuration.ts
var Configuration = class {
  constructor(options) {
    this.nodes = options.nodes || [];
    this.nodes = this.nodes.map((node) => this.setDefaultPathInNode(node)).map((node) => this.setDefaultPortInNode(node)).map((node) => ({ ...node }));
    if (options.randomizeNodes == null) {
      options.randomizeNodes = true;
    }
    if (options.randomizeNodes === true) {
      this.shuffleArray(this.nodes);
    }
    this.nearestNode = options.nearestNode;
    this.nearestNode = this.setDefaultPathInNode(this.nearestNode);
    this.nearestNode = this.setDefaultPortInNode(this.nearestNode);
    this.connectionTimeoutSeconds = options.connectionTimeoutSeconds || options.timeoutSeconds || 5;
    this.healthcheckIntervalSeconds = options.healthcheckIntervalSeconds || 60;
    this.numRetries = (options.numRetries !== void 0 && options.numRetries >= 0 ? options.numRetries : this.nodes.length + (this.nearestNode == null ? 0 : 1)) || 3;
    this.retryIntervalSeconds = options.retryIntervalSeconds || 0.1;
    this.apiKey = options.apiKey;
    this.sendApiKeyAsQueryParam = options.sendApiKeyAsQueryParam;
    this.cacheSearchResultsForSeconds = options.cacheSearchResultsForSeconds || 0;
    this.useServerSideSearchCache = options.useServerSideSearchCache || false;
    this.axiosAdapter = options.axiosAdapter;
    this.logger = options.logger || logger;
    this.logLevel = options.logLevel || "warn";
    this.logger.setLevel(this.logLevel);
    this.additionalHeaders = options.additionalHeaders;
    this.httpAgent = options.httpAgent;
    this.httpsAgent = options.httpsAgent;
    this.paramsSerializer = options.paramsSerializer;
    this.showDeprecationWarnings(options);
    this.validate();
  }
  validate() {
    if (this.nodes == null || this.nodes.length === 0 || this.validateNodes()) {
      throw new MissingConfigurationError(
        "Ensure that nodes[].protocol, nodes[].host and nodes[].port are set"
      );
    }
    if (this.nearestNode != null && this.isNodeMissingAnyParameters(this.nearestNode)) {
      throw new MissingConfigurationError(
        "Ensure that nearestNodes.protocol, nearestNodes.host and nearestNodes.port are set"
      );
    }
    if (this.apiKey == null) {
      throw new MissingConfigurationError("Ensure that apiKey is set");
    }
    return true;
  }
  validateNodes() {
    return this.nodes.some((node) => {
      return this.isNodeMissingAnyParameters(node);
    });
  }
  isNodeMissingAnyParameters(node) {
    return !["protocol", "host", "port", "path"].every((key) => {
      return node.hasOwnProperty(key);
    }) && node["url"] == null;
  }
  setDefaultPathInNode(node) {
    if (node != null && !node.hasOwnProperty("path")) {
      node["path"] = "";
    }
    return node;
  }
  setDefaultPortInNode(node) {
    if (node != null && !node.hasOwnProperty("port") && node.hasOwnProperty("protocol")) {
      switch (node["protocol"]) {
        case "https":
          node["port"] = 443;
          break;
        case "http":
          node["port"] = 80;
          break;
      }
    }
    return node;
  }
  showDeprecationWarnings(options) {
    if (options.timeoutSeconds) {
      this.logger.warn(
        "Deprecation warning: timeoutSeconds is now renamed to connectionTimeoutSeconds"
      );
    }
    if (options.masterNode) {
      this.logger.warn(
        "Deprecation warning: masterNode is now consolidated to nodes, starting with Typesense Server v0.12"
      );
    }
    if (options.readReplicaNodes) {
      this.logger.warn(
        "Deprecation warning: readReplicaNodes is now consolidated to nodes, starting with Typesense Server v0.12"
      );
    }
  }
  shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
};

// src/Typesense/ApiCall.ts
var import_http = __toESM(require_http());
var import_https = __toESM(require_https());

// src/Typesense/Types.ts
var arrayableParams = {
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
  sort_by: "sort_by"
};

// src/Typesense/Utils.ts
function hasNoArrayValues(params) {
  return Object.keys(arrayableParams).filter((key) => params[key] !== void 0).every((key) => isNonArrayValue(params[key]));
}
function normalizeArrayableParams(params) {
  const result = { ...params };
  const transformedValues = Object.keys(arrayableParams).filter((key) => Array.isArray(result[key])).map((key) => {
    result[key] = result[key].join(",");
    return key;
  });
  if (!transformedValues.length && hasNoArrayValues(result)) {
    return result;
  }
  if (!hasNoArrayValues(result)) {
    throw new Error(
      `Failed to normalize arrayable params: ${JSON.stringify(result)}`
    );
  }
  return result;
}
function isNonArrayValue(value) {
  return !Array.isArray(value);
}
function isErrorWithMessage(error) {
  return typeof error === "object" && error !== null && "message" in error && typeof error.message === "string";
}
function toErrorWithMessage(couldBeError) {
  if (isErrorWithMessage(couldBeError)) return couldBeError;
  try {
    if (typeof couldBeError === "string") {
      return new Error(couldBeError);
    }
    return new Error(JSON.stringify(couldBeError));
  } catch {
    return new Error(String(couldBeError));
  }
}

// src/Typesense/ApiCall.ts
var APIKEYHEADERNAME = "X-TYPESENSE-API-KEY";
var HEALTHY = true;
var UNHEALTHY = false;
var isNodeJSEnvironment = typeof process !== "undefined" && process.versions != null && process.versions.node != null && typeof window === "undefined";
var ApiCall = class {
  constructor(configuration) {
    this.configuration = configuration;
    this.apiKey = this.configuration.apiKey;
    this.nodes = this.configuration.nodes == null ? this.configuration.nodes : JSON.parse(JSON.stringify(this.configuration.nodes));
    this.nearestNode = this.configuration.nearestNode == null ? this.configuration.nearestNode : JSON.parse(JSON.stringify(this.configuration.nearestNode));
    this.connectionTimeoutSeconds = this.configuration.connectionTimeoutSeconds;
    this.healthcheckIntervalSeconds = this.configuration.healthcheckIntervalSeconds;
    this.numRetriesPerRequest = this.configuration.numRetries;
    this.retryIntervalSeconds = this.configuration.retryIntervalSeconds;
    this.sendApiKeyAsQueryParam = this.configuration.sendApiKeyAsQueryParam;
    this.additionalUserHeaders = this.configuration.additionalHeaders;
    this.logger = this.configuration.logger;
    this.initializeMetadataForNodes();
    this.currentNodeIndex = -1;
  }
  async get(endpoint, queryParameters = {}, {
    abortSignal = null,
    responseType = void 0,
    streamConfig = void 0,
    isStreamingRequest
  } = {}) {
    return this.performRequest("get", endpoint, {
      queryParameters,
      abortSignal,
      responseType,
      streamConfig,
      isStreamingRequest
    });
  }
  async delete(endpoint, queryParameters = {}) {
    return this.performRequest("delete", endpoint, {
      queryParameters,
      isStreamingRequest: false
    });
  }
  async post(endpoint, bodyParameters = {}, queryParameters = {}, additionalHeaders = {}, {
    abortSignal = null,
    responseType = void 0,
    streamConfig = void 0,
    isStreamingRequest
  } = {}) {
    return this.performRequest("post", endpoint, {
      queryParameters,
      bodyParameters,
      additionalHeaders,
      abortSignal,
      responseType,
      streamConfig,
      isStreamingRequest
    });
  }
  async put(endpoint, bodyParameters = {}, queryParameters = {}) {
    return this.performRequest("put", endpoint, {
      queryParameters,
      bodyParameters,
      isStreamingRequest: false
    });
  }
  async patch(endpoint, bodyParameters = {}, queryParameters = {}) {
    return this.performRequest("patch", endpoint, {
      queryParameters,
      bodyParameters,
      isStreamingRequest: false
    });
  }
  getAdapter() {
    if (!this.configuration.axiosAdapter) return void 0;
    if (typeof this.configuration.axiosAdapter === "function")
      return this.configuration.axiosAdapter;
    const isCloudflareWorkers = typeof navigator !== "undefined" && navigator.userAgent === "Cloudflare-Workers";
    return isCloudflareWorkers ? axios.getAdapter(this.configuration.axiosAdapter).bind(globalThis) : axios.getAdapter(this.configuration.axiosAdapter);
  }
  async performRequest(requestType, endpoint, {
    queryParameters = null,
    bodyParameters = null,
    additionalHeaders = {},
    abortSignal = null,
    responseType = void 0,
    skipConnectionTimeout = false,
    enableKeepAlive = void 0,
    streamConfig = void 0,
    isStreamingRequest
  }) {
    this.configuration.validate();
    if (isStreamingRequest) {
      this.logger.debug(`Request: Performing streaming request to ${endpoint}`);
      if (!isNodeJSEnvironment && typeof fetch !== "undefined") {
        this.logger.debug("Using fetch adapter for browser streaming");
        responseType = "stream";
      }
    }
    const requestNumber = Date.now();
    let lastException;
    let wasAborted = false;
    this.logger.debug(
      `Request #${requestNumber}: Performing ${requestType.toUpperCase()} request: ${endpoint}`
    );
    for (let numTries = 1; numTries <= this.numRetriesPerRequest + 1; numTries++) {
      const node = this.getNextNode(requestNumber);
      this.logger.debug(
        `Request #${requestNumber}: Attempting ${requestType.toUpperCase()} request Try #${numTries} to Node ${node.index}`
      );
      if (abortSignal && abortSignal.aborted) {
        return Promise.reject(new Error("Request aborted by caller."));
      }
      let abortListener;
      try {
        const requestOptions = {
          method: requestType,
          url: this.uriFor(endpoint, node),
          headers: Object.assign(
            {},
            this.defaultHeaders(),
            additionalHeaders,
            this.additionalUserHeaders
          ),
          maxContentLength: Infinity,
          maxBodyLength: Infinity,
          validateStatus: (status) => {
            return status > 0;
          },
          transformResponse: [
            (data, headers) => {
              let transformedData = data;
              if (headers !== void 0 && typeof data === "string" && headers["content-type"] && headers["content-type"].startsWith("application/json")) {
                transformedData = JSON.parse(data);
              }
              return transformedData;
            }
          ]
        };
        requestOptions.adapter = isStreamingRequest && !isNodeJSEnvironment ? "fetch" : this.getAdapter();
        if (skipConnectionTimeout !== true) {
          requestOptions.timeout = this.connectionTimeoutSeconds * 1e3;
        }
        if (queryParameters && Object.keys(queryParameters).length !== 0) {
          requestOptions.params = queryParameters;
        }
        if (this.sendApiKeyAsQueryParam) {
          requestOptions.params = requestOptions.params || {};
          requestOptions.params["x-typesense-api-key"] = this.apiKey;
        }
        if (this.configuration.httpAgent) {
          this.logger.debug(
            `Request #${requestNumber}: Using custom httpAgent`
          );
          requestOptions.httpAgent = this.configuration.httpAgent;
        } else if (enableKeepAlive === true) {
          if (!isNodeJSEnvironment) {
            this.logger.warn(
              `Request #${requestNumber}: Cannot use custom httpAgent in a browser environment to enable keepAlive`
            );
          } else {
            this.logger.debug(`Request #${requestNumber}: Enabling KeepAlive`);
            requestOptions.httpAgent = new import_http.Agent({ keepAlive: true });
          }
        }
        if (this.configuration.httpsAgent) {
          this.logger.debug(
            `Request #${requestNumber}: Using custom httpsAgent`
          );
          requestOptions.httpsAgent = this.configuration.httpsAgent;
        } else if (enableKeepAlive === true) {
          if (!isNodeJSEnvironment) {
            this.logger.warn(
              `Request #${requestNumber}: Cannot use custom httpAgent in a browser environment to enable keepAlive`
            );
          } else {
            this.logger.debug(`Request #${requestNumber}: Enabling keepAlive`);
            requestOptions.httpsAgent = new import_https.Agent({ keepAlive: true });
          }
        }
        if (this.configuration.paramsSerializer) {
          this.logger.debug(
            `Request #${requestNumber}: Using custom paramsSerializer`
          );
          requestOptions.paramsSerializer = this.configuration.paramsSerializer;
        }
        if (bodyParameters && (typeof bodyParameters === "string" && bodyParameters.length !== 0 || typeof bodyParameters === "object" && Object.keys(bodyParameters).length !== 0)) {
          requestOptions.data = bodyParameters;
        }
        if (abortSignal) {
          const cancelToken = axios.CancelToken;
          const source = cancelToken.source();
          abortListener = () => {
            wasAborted = true;
            source.cancel();
          };
          abortSignal.addEventListener("abort", abortListener);
          requestOptions.cancelToken = source.token;
        }
        if (isStreamingRequest) {
          requestOptions.responseType = "stream";
          if (!isNodeJSEnvironment) {
            requestOptions.headers = {
              ...requestOptions.headers,
              Accept: "text/event-stream"
            };
          }
        } else if (responseType) {
          requestOptions.responseType = responseType;
        }
        const response = await axios(requestOptions);
        if (response.status >= 1 && response.status <= 499) {
          this.setNodeHealthcheck(node, HEALTHY);
        }
        this.logger.debug(
          `Request #${requestNumber}: Request to Node ${node.index} was made. Response Code was ${response.status}.`
        );
        if (response.status >= 200 && response.status < 300) {
          if (isStreamingRequest) {
            return this.handleStreamingResponse(response, streamConfig);
          }
          return Promise.resolve(response.data);
        } else if (response.status < 500) {
          return Promise.reject(
            this.customErrorForResponse(
              response,
              response.data?.message,
              requestOptions.data
            )
          );
        } else {
          throw this.customErrorForResponse(
            response,
            response.data?.message,
            requestOptions.data
          );
        }
      } catch (error) {
        if (!wasAborted) {
          this.setNodeHealthcheck(node, UNHEALTHY);
        }
        lastException = error;
        this.logger.warn(
          `Request #${requestNumber}: Request to Node ${node.index} failed due to "${error?.code ?? ""} ${error.message}${error.response == null ? "" : " - " + JSON.stringify(error.response?.data)}"`
        );
        if (wasAborted) {
          return Promise.reject(new Error("Request aborted by caller."));
        }
        if (isStreamingRequest) {
          this.invokeOnErrorCallback(error, streamConfig);
        }
        if (numTries < this.numRetriesPerRequest + 1) {
          this.logger.warn(
            `Request #${requestNumber}: Sleeping for ${this.retryIntervalSeconds}s and then retrying request...`
          );
        } else {
          this.logger.debug(
            `Request #${requestNumber}: No retries left. Raising last error`
          );
          return Promise.reject(lastException);
        }
        await this.timer(this.retryIntervalSeconds);
      } finally {
        if (abortSignal && abortListener) {
          abortSignal.removeEventListener("abort", abortListener);
        }
      }
    }
    this.logger.debug(
      `Request #${requestNumber}: No retries left. Raising last error`
    );
    return Promise.reject(lastException);
  }
  processStreamingLine(line) {
    if (!line.trim() || line === "data: [DONE]") {
      return null;
    }
    if (line.startsWith("data: ")) {
      return this.processDataLine(line.slice(6).trim());
    }
    if (line.trim().startsWith("{")) {
      try {
        const jsonData = JSON.parse(line.trim());
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
          message: JSON.stringify(jsonData)
        };
      } catch (e) {
        return {
          conversation_id: "unknown",
          message: line.trim()
        };
      }
    }
    return {
      conversation_id: "unknown",
      message: line.trim()
    };
  }
  processDataLine(dataContent) {
    if (!dataContent) {
      return null;
    }
    if (dataContent.startsWith("{")) {
      try {
        const jsonData = JSON.parse(dataContent);
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
          message: JSON.stringify(jsonData)
        };
      } catch (e) {
        return {
          conversation_id: "unknown",
          message: dataContent
        };
      }
    }
    return {
      conversation_id: "unknown",
      message: dataContent
    };
  }
  async handleStreamingResponse(response, streamConfig) {
    this.logger.debug(
      `Handling streaming response. Environment: ${isNodeJSEnvironment ? "Node.js" : "Browser"}`
    );
    if (isNodeJSEnvironment && response.data) {
      return this.handleNodeStreaming(response, streamConfig);
    }
    if (!isNodeJSEnvironment) {
      return this.handleBrowserStreaming(response, streamConfig);
    }
    this.logger.debug("Processing non-streaming response");
    this.invokeOnCompleteCallback(response.data, streamConfig);
    return Promise.resolve(response.data);
  }
  handleNodeStreaming(response, streamConfig) {
    this.logger.debug("Processing Node.js stream");
    return new Promise((resolve, reject) => {
      const stream = response.data;
      const allChunks = [];
      let buffer = "";
      stream.on("data", (chunk) => {
        try {
          const data = chunk.toString();
          buffer += data;
          const lines = buffer.split("\n");
          buffer = lines.pop() ?? "";
          this.processStreamLines(lines, allChunks, streamConfig);
        } catch (error) {
          reject(error);
        }
      });
      stream.on("end", () => {
        if (buffer.trim().length > 0) {
          const lines = buffer.split("\n");
          this.processStreamLines(lines, allChunks, streamConfig);
        }
        this.finalizeStreamResult(
          allChunks,
          resolve,
          response,
          streamConfig
        );
      });
      stream.on("error", (error) => {
        this.logger.error(`Stream error: ${error}`);
        this.invokeOnErrorCallback(error, streamConfig);
        reject(error);
      });
    });
  }
  handleBrowserStreaming(response, streamConfig) {
    this.logger.debug("Processing browser stream");
    return new Promise(async (resolve, reject) => {
      try {
        if (response.data && typeof response.data.getReader === "function") {
          return this.handleBrowserReadableStream(
            response.data,
            resolve,
            reject,
            response,
            streamConfig
          );
        }
        if (typeof response.data === "string") {
          return this.handleBrowserStringResponse(
            response.data,
            resolve,
            response,
            streamConfig
          );
        }
        if (typeof response.data === "object" && response.data !== null) {
          this.logger.debug("No stream found, but data object is available");
          this.invokeOnCompleteCallback(response.data, streamConfig);
          return resolve(response.data);
        }
        this.logger.error("No usable data found in response");
        return reject(new Error("No usable data found in response"));
      } catch (error) {
        this.logger.error(`Error processing streaming response: ${error}`);
        this.invokeOnErrorCallback(error, streamConfig);
        reject(error);
      }
    });
  }
  async handleBrowserReadableStream(stream, resolve, reject, response, streamConfig) {
    this.logger.debug("Found ReadableStream in response.data");
    const reader = stream.getReader();
    const allChunks = [];
    let buffer = "";
    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          this.logger.debug("Stream reading complete");
          if (buffer.trim()) {
            const lines2 = buffer.split("\n");
            this.processStreamLines(lines2, allChunks, streamConfig);
          }
          break;
        }
        const chunk = new TextDecoder().decode(value);
        this.logger.debug(`Received chunk: ${chunk.length} bytes`);
        buffer += chunk;
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";
        this.processStreamLines(lines, allChunks, streamConfig);
      }
      this.finalizeStreamResult(allChunks, resolve, response, streamConfig);
    } catch (error) {
      this.logger.error(`Stream error: ${error}`);
      this.invokeOnErrorCallback(error, streamConfig);
      reject(error);
    }
  }
  handleBrowserStringResponse(data, resolve, response, streamConfig) {
    this.logger.debug("Processing text response as stream data");
    const allChunks = [];
    const lines = data.split("\n");
    this.processStreamLines(lines, allChunks, streamConfig);
    if (allChunks.length > 0) {
      const finalResult = this.combineStreamingChunks(allChunks);
      this.invokeOnCompleteCallback(finalResult, streamConfig);
      resolve(finalResult);
    } else {
      this.logger.debug("No chunks processed, returning original API response");
      this.invokeOnCompleteCallback(response.data, streamConfig);
      resolve(response.data);
    }
  }
  processStreamLines(lines, allChunks, streamConfig) {
    for (const line of lines) {
      if (line.trim() && line !== "data: [DONE]") {
        const processed = this.processStreamingLine(line);
        if (processed !== null) {
          this.invokeOnChunkCallback(processed, streamConfig);
          allChunks.push(processed);
        }
      }
    }
  }
  finalizeStreamResult(allChunks, resolve, response, streamConfig) {
    if (allChunks.length > 0) {
      const finalResult = this.combineStreamingChunks(allChunks);
      this.logger.debug("Stream processing complete");
      this.invokeOnCompleteCallback(finalResult, streamConfig);
      resolve(finalResult);
    } else {
      this.logger.debug("No chunks processed, returning original API response");
      this.invokeOnCompleteCallback(response.data, streamConfig);
      resolve(response.data);
    }
  }
  /**
   * Combines multiple streaming chunks into a single coherent result
   * This is critical for ensuring we return the complete data rather than just the last chunk
   */
  combineStreamingChunks(chunks) {
    if (chunks.length === 0) return {};
    if (chunks.length === 1) return chunks[0];
    const messagesChunks = this.getMessageChunks(
      chunks
    );
    if (messagesChunks.length > 0) {
      return this.combineMessageChunks(
        chunks,
        messagesChunks
      );
    }
    const lastChunk = chunks[chunks.length - 1];
    if (!this.isCompleteSearchResponse(lastChunk)) {
      throw new Error("Last chunk is not a complete search response");
    }
    return lastChunk;
  }
  getMessageChunks(chunks) {
    return chunks.filter(this.isChunkMessage);
  }
  isChunkMessage(chunk) {
    return typeof chunk === "object" && chunk !== null && "message" in chunk && "conversation_id" in chunk;
  }
  combineMessageChunks(chunks, messagesChunks) {
    this.logger.debug(
      `Found ${messagesChunks.length} message chunks to combine`
    );
    const lastChunk = chunks[chunks.length - 1];
    if (this.isCompleteSearchResponse(lastChunk)) {
      return lastChunk;
    }
    const metadataChunk = chunks.find(this.isCompleteSearchResponse);
    if (!metadataChunk) {
      throw new Error("No metadata chunk found");
    }
    return metadataChunk;
  }
  isCompleteSearchResponse(chunk) {
    if (typeof chunk === "object" && chunk !== null && Object.keys(chunk).length > 0) {
      return "results" in chunk || "found" in chunk || "hits" in chunk || "page" in chunk || "search_time_ms" in chunk;
    }
    return false;
  }
  // Attempts to find the next healthy node, looping through the list of nodes once.
  //   But if no healthy nodes are found, it will just return the next node, even if it's unhealthy
  //     so we can try the request for good measure, in case that node has become healthy since
  getNextNode(requestNumber = 0) {
    if (this.nearestNode != null) {
      this.logger.debug(
        `Request #${requestNumber}: Nodes Health: Node ${this.nearestNode.index} is ${this.nearestNode.isHealthy === true ? "Healthy" : "Unhealthy"}`
      );
      if (this.nearestNode.isHealthy === true || this.nodeDueForHealthcheck(this.nearestNode, requestNumber)) {
        this.logger.debug(
          `Request #${requestNumber}: Updated current node to Node ${this.nearestNode.index}`
        );
        return this.nearestNode;
      }
      this.logger.debug(
        `Request #${requestNumber}: Falling back to individual nodes`
      );
    }
    this.logger.debug(
      `Request #${requestNumber}: Nodes Health: ${this.nodes.map(
        (node) => `Node ${node.index} is ${node.isHealthy === true ? "Healthy" : "Unhealthy"}`
      ).join(" || ")}`
    );
    let candidateNode = this.nodes[0];
    for (let i = 0; i <= this.nodes.length; i++) {
      this.currentNodeIndex = (this.currentNodeIndex + 1) % this.nodes.length;
      candidateNode = this.nodes[this.currentNodeIndex];
      if (candidateNode.isHealthy === true || this.nodeDueForHealthcheck(candidateNode, requestNumber)) {
        this.logger.debug(
          `Request #${requestNumber}: Updated current node to Node ${candidateNode.index}`
        );
        return candidateNode;
      }
    }
    this.logger.debug(
      `Request #${requestNumber}: No healthy nodes were found. Returning the next node, Node ${candidateNode.index}`
    );
    return candidateNode;
  }
  nodeDueForHealthcheck(node, requestNumber = 0) {
    const isDueForHealthcheck = Date.now() - node.lastAccessTimestamp > this.healthcheckIntervalSeconds * 1e3;
    if (isDueForHealthcheck) {
      this.logger.debug(
        `Request #${requestNumber}: Node ${node.index} has exceeded healtcheckIntervalSeconds of ${this.healthcheckIntervalSeconds}. Adding it back into rotation.`
      );
    }
    return isDueForHealthcheck;
  }
  initializeMetadataForNodes() {
    if (this.nearestNode != null) {
      this.nearestNode.index = "nearestNode";
      this.setNodeHealthcheck(this.nearestNode, HEALTHY);
    }
    this.nodes.forEach((node, i) => {
      node.index = i;
      this.setNodeHealthcheck(node, HEALTHY);
    });
  }
  setNodeHealthcheck(node, isHealthy) {
    node.isHealthy = isHealthy;
    node.lastAccessTimestamp = Date.now();
  }
  uriFor(endpoint, node) {
    if (node.url != null) {
      return `${node.url}${endpoint}`;
    }
    return `${node.protocol}://${node.host}:${node.port}${node.path}${endpoint}`;
  }
  defaultHeaders() {
    const defaultHeaders = {};
    if (!this.sendApiKeyAsQueryParam) {
      defaultHeaders[APIKEYHEADERNAME] = this.apiKey;
    }
    defaultHeaders["Content-Type"] = "application/json";
    return defaultHeaders;
  }
  async timer(seconds) {
    return new Promise((resolve) => setTimeout(resolve, seconds * 1e3));
  }
  customErrorForResponse(response, messageFromServer, httpBody) {
    let errorMessage = `Request failed with HTTP code ${response.status}`;
    if (typeof messageFromServer === "string" && messageFromServer.trim() !== "") {
      errorMessage += ` | Server said: ${messageFromServer}`;
    }
    let error = new TypesenseError(errorMessage, httpBody, response.status);
    if (response.status === 400) {
      error = new RequestMalformed(errorMessage, httpBody, response.status);
    } else if (response.status === 401) {
      error = new RequestUnauthorized(errorMessage, httpBody, response.status);
    } else if (response.status === 404) {
      error = new ObjectNotFound(errorMessage, httpBody, response.status);
    } else if (response.status === 409) {
      error = new ObjectAlreadyExists(errorMessage, httpBody, response.status);
    } else if (response.status === 422) {
      error = new ObjectUnprocessable(errorMessage, httpBody, response.status);
    } else if (response.status >= 500 && response.status <= 599) {
      error = new ServerError(errorMessage, httpBody, response.status);
    } else {
      error = new HTTPError(errorMessage, httpBody, response.status);
    }
    return error;
  }
  invokeOnChunkCallback(data, streamConfig) {
    if (streamConfig?.onChunk) {
      try {
        streamConfig.onChunk(data);
      } catch (error) {
        this.logger.warn(`Error in onChunk callback: ${error}`);
      }
    }
  }
  invokeOnCompleteCallback(data, streamConfig) {
    if (streamConfig?.onComplete) {
      try {
        streamConfig.onComplete(data);
      } catch (error) {
        this.logger.warn(`Error in onComplete callback: ${error}`);
      }
    }
  }
  invokeOnErrorCallback(error, streamConfig) {
    if (streamConfig?.onError) {
      const errorObj = toErrorWithMessage(error);
      try {
        streamConfig.onError(errorObj);
      } catch (callbackError) {
        this.logger.warn(`Error in onError callback: ${callbackError}`);
      }
    }
  }
};

// src/Typesense/RequestWithCache.ts
var defaultCacheResponseForSeconds = 2 * 60;
var defaultMaxSize = 100;
var RequestWithCache = class {
  constructor() {
    this.responseCache = /* @__PURE__ */ new Map();
    this.responsePromiseCache = /* @__PURE__ */ new Map();
  }
  clearCache() {
    this.responseCache = /* @__PURE__ */ new Map();
    this.responsePromiseCache = /* @__PURE__ */ new Map();
  }
  async perform(requestContext, methodName, requestParams, cacheOptions) {
    const {
      cacheResponseForSeconds = defaultCacheResponseForSeconds,
      maxSize = defaultMaxSize
    } = cacheOptions;
    const isCacheDisabled = cacheResponseForSeconds <= 0 || maxSize <= 0;
    const {
      path,
      queryParams,
      body,
      headers,
      streamConfig,
      abortSignal,
      responseType,
      isStreamingRequest
    } = requestParams;
    if (isCacheDisabled) {
      return this.executeRequest(
        requestContext,
        methodName,
        path,
        queryParams,
        body,
        headers,
        { abortSignal, responseType, streamConfig, isStreamingRequest }
      );
    }
    const requestParamsJSON = JSON.stringify(requestParams);
    const cacheEntry = this.responseCache.get(requestParamsJSON);
    const now = Date.now();
    if (cacheEntry) {
      const isEntryValid = now - cacheEntry.requestTimestamp < cacheResponseForSeconds * 1e3;
      if (isEntryValid) {
        this.responseCache.delete(requestParamsJSON);
        this.responseCache.set(requestParamsJSON, cacheEntry);
        return cacheEntry.response;
      } else {
        this.responseCache.delete(requestParamsJSON);
      }
    }
    const cachePromiseEntry = this.responsePromiseCache.get(requestParamsJSON);
    if (cachePromiseEntry) {
      const isEntryValid = now - cachePromiseEntry.requestTimestamp < cacheResponseForSeconds * 1e3;
      if (isEntryValid) {
        this.responsePromiseCache.delete(requestParamsJSON);
        this.responsePromiseCache.set(requestParamsJSON, cachePromiseEntry);
        return cachePromiseEntry.responsePromise;
      } else {
        this.responsePromiseCache.delete(requestParamsJSON);
      }
    }
    const responsePromise = this.executeRequest(
      requestContext,
      methodName,
      path,
      queryParams,
      body,
      headers,
      { abortSignal, responseType, streamConfig, isStreamingRequest }
    );
    this.responsePromiseCache.set(requestParamsJSON, {
      requestTimestamp: now,
      responsePromise
    });
    const response = await responsePromise;
    this.responseCache.set(requestParamsJSON, {
      requestTimestamp: now,
      response
    });
    const isCacheOverMaxSize = this.responseCache.size > maxSize;
    if (isCacheOverMaxSize) {
      const oldestEntry = this.responseCache.keys().next().value;
      if (oldestEntry) {
        this.responseCache.delete(oldestEntry);
      }
    }
    const isResponsePromiseCacheOverMaxSize = this.responsePromiseCache.size > maxSize;
    if (isResponsePromiseCacheOverMaxSize) {
      const oldestEntry = this.responsePromiseCache.keys().next().value;
      if (oldestEntry) {
        this.responsePromiseCache.delete(oldestEntry);
      }
    }
    return response;
  }
  executeRequest(context, methodName, path, queryParams = {}, body, headers, options) {
    const method = context[methodName];
    switch (methodName) {
      case "get":
        return method.call(context, path, queryParams, {
          abortSignal: options?.abortSignal,
          responseType: options?.responseType,
          streamConfig: options?.streamConfig,
          isStreamingRequest: options?.isStreamingRequest
        });
      case "delete":
        return method.call(
          context,
          path,
          queryParams
        );
      case "post":
        return method.call(
          context,
          path,
          body,
          queryParams,
          headers || {},
          {
            abortSignal: options?.abortSignal,
            responseType: options?.responseType,
            streamConfig: options?.streamConfig,
            isStreamingRequest: options?.isStreamingRequest
          }
        );
      case "put":
      case "patch":
        return method.call(
          context,
          path,
          body,
          queryParams
        );
      default:
        throw new Error(`Unsupported method: ${String(methodName)}`);
    }
  }
};

// src/Typesense/MultiSearch.ts
var RESOURCEPATH = "/multi_search";
var MultiSearch = class {
  constructor(apiCall, configuration, useTextContentType = false) {
    this.apiCall = apiCall;
    this.configuration = configuration;
    this.useTextContentType = useTextContentType;
    this.requestWithCache = new RequestWithCache();
  }
  clearCache() {
    this.requestWithCache.clearCache();
  }
  async perform(searchRequests, commonParams, {
    cacheSearchResultsForSeconds = this.configuration.cacheSearchResultsForSeconds
  } = {}) {
    const params = commonParams ? { ...commonParams } : {};
    if (this.configuration.useServerSideSearchCache === true) {
      params.use_cache = true;
    }
    const normalizedSearchRequests = {
      union: searchRequests.union,
      searches: searchRequests.searches.map(normalizeArrayableParams)
    };
    const { streamConfig, ...paramsWithoutStream } = params;
    const normalizedQueryParams = normalizeArrayableParams(
      paramsWithoutStream
    );
    return this.requestWithCache.perform(
      this.apiCall,
      "post",
      {
        path: RESOURCEPATH,
        body: normalizedSearchRequests,
        queryParams: normalizedQueryParams,
        headers: this.useTextContentType ? { "content-type": "text/plain" } : {},
        streamConfig,
        isStreamingRequest: this.isStreamingRequest(params)
      },
      { cacheResponseForSeconds: cacheSearchResultsForSeconds }
    );
  }
  isStreamingRequest(commonParams) {
    return commonParams.streamConfig !== void 0;
  }
};

// src/Typesense/Collections.ts
var RESOURCEPATH2 = "/collections";
var Collections = class {
  constructor(apiCall) {
    this.apiCall = apiCall;
  }
  async create(schema, options) {
    return this.apiCall.post(RESOURCEPATH2, schema, options);
  }
  async retrieve(options = {}) {
    return this.apiCall.get(RESOURCEPATH2, options);
  }
  static get RESOURCEPATH() {
    return RESOURCEPATH2;
  }
};

// src/Typesense/SearchOnlyDocuments.ts
var RESOURCEPATH3 = "/documents";
var SearchOnlyDocuments = class {
  constructor(collectionName, apiCall, configuration) {
    this.collectionName = collectionName;
    this.apiCall = apiCall;
    this.configuration = configuration;
    this.requestWithCache = new RequestWithCache();
  }
  clearCache() {
    this.requestWithCache.clearCache();
  }
  async search(searchParameters, {
    cacheSearchResultsForSeconds = this.configuration.cacheSearchResultsForSeconds,
    abortSignal = null
  } = {}) {
    const additionalQueryParams = {};
    if (this.configuration.useServerSideSearchCache === true) {
      additionalQueryParams["use_cache"] = true;
    }
    const { streamConfig, ...rest } = normalizeArrayableParams(searchParameters);
    const queryParams = {
      ...additionalQueryParams,
      ...rest
    };
    const isStreamingRequest = queryParams.conversation_stream === true;
    return this.requestWithCache.perform(
      this.apiCall,
      "get",
      {
        path: this.endpointPath("search"),
        queryParams,
        streamConfig,
        abortSignal,
        isStreamingRequest
      },
      {
        cacheResponseForSeconds: cacheSearchResultsForSeconds
      }
    );
  }
  endpointPath(operation) {
    return `${Collections.RESOURCEPATH}/${encodeURIComponent(this.collectionName)}${RESOURCEPATH3}${operation === void 0 ? "" : "/" + operation}`;
  }
  static get RESOURCEPATH() {
    return RESOURCEPATH3;
  }
};

// src/Typesense/SearchOnlyCollection.ts
var SearchOnlyCollection = class {
  constructor(name, apiCall, configuration) {
    this.name = name;
    this.apiCall = apiCall;
    this.configuration = configuration;
    this._documents = new SearchOnlyDocuments(
      this.name,
      this.apiCall,
      this.configuration
    );
  }
  documents() {
    return this._documents;
  }
};

// src/Typesense/SearchClient.ts
var SearchClient = class {
  constructor(options) {
    options.sendApiKeyAsQueryParam = options.sendApiKeyAsQueryParam ?? true;
    if (options.sendApiKeyAsQueryParam === true && (options.apiKey || "").length > 2e3) {
      console.warn(
        "[typesense] API Key is longer than 2000 characters which is over the allowed limit, so disabling sending it as a query parameter."
      );
      options.sendApiKeyAsQueryParam = false;
    }
    this.configuration = new Configuration(options);
    this.apiCall = new ApiCall(this.configuration);
    this.multiSearch = new MultiSearch(this.apiCall, this.configuration, true);
    this.individualCollections = {};
  }
  clearCache() {
    this.multiSearch.clearCache();
    Object.entries(this.individualCollections).forEach(([_, collection]) => {
      collection.documents().clearCache();
    });
  }
  collections(collectionName) {
    if (!collectionName) {
      throw new Error(
        "Typesense.SearchClient only supports search operations, so the collectionName that needs to be searched must be specified. Use Typesense.Client if you need to access the collection object."
      );
    } else {
      if (this.individualCollections[collectionName] === void 0) {
        this.individualCollections[collectionName] = new SearchOnlyCollection(
          collectionName,
          this.apiCall,
          this.configuration
        );
      }
      return this.individualCollections[collectionName];
    }
  }
};

// src/Typesense/Documents.ts
var isNodeJSEnvironment2 = typeof process !== "undefined" && process.versions != null && process.versions.node != null;
var Documents = class extends SearchOnlyDocuments {
  constructor(collectionName, apiCall, configuration) {
    super(collectionName, apiCall, configuration);
  }
  async create(document, options = {}) {
    if (!document) throw new Error("No document provided");
    return this.apiCall.post(this.endpointPath(), document, options);
  }
  async upsert(document, options = {}) {
    if (!document) throw new Error("No document provided");
    return this.apiCall.post(
      this.endpointPath(),
      document,
      Object.assign({}, options, { action: "upsert" })
    );
  }
  async update(document, options = {}) {
    if (!document) throw new Error("No document provided");
    if (options["filter_by"] != null) {
      return this.apiCall.patch(
        this.endpointPath(),
        document,
        Object.assign({}, options)
      );
    } else {
      return this.apiCall.post(
        this.endpointPath(),
        document,
        Object.assign({}, options, { action: "update" })
      );
    }
  }
  async delete(query = {}) {
    return this.apiCall.delete(this.endpointPath(), query);
  }
  async createMany(documents, options = {}) {
    this.configuration.logger.warn(
      "createMany is deprecated and will be removed in a future version. Use import instead, which now takes both an array of documents or a JSONL string of documents"
    );
    return this.import(documents, options);
  }
  async import(documents, options = {}) {
    let documentsInJSONLFormat;
    if (Array.isArray(documents)) {
      if (documents.length === 0) {
        throw new RequestMalformed("No documents provided");
      }
      try {
        documentsInJSONLFormat = documents.map((document) => JSON.stringify(document)).join("\n");
      } catch (error) {
        if (error instanceof RangeError && error.message.includes("Too many properties to enumerate")) {
          throw new Error(`${error}
          It looks like you have reached a Node.js limit that restricts the number of keys in an Object: https://stackoverflow.com/questions/9282869/are-there-limits-to-the-number-of-properties-in-a-javascript-object

         Please try reducing the number of keys in your document, or using CURL to import your data.
          `);
        }
        throw new Error(error);
      }
    } else {
      documentsInJSONLFormat = documents;
      if (isEmptyString(documentsInJSONLFormat)) {
        throw new RequestMalformed("No documents provided");
      }
    }
    const resultsInJSONLFormat = await this.apiCall.performRequest(
      "post",
      this.endpointPath("import"),
      {
        queryParameters: options,
        bodyParameters: documentsInJSONLFormat,
        additionalHeaders: { "Content-Type": "text/plain" },
        skipConnectionTimeout: true,
        // We never want to client-side-timeout on an import and retry, since imports are syncronous and we want to let them take as long as it takes to complete fully
        enableKeepAlive: isNodeJSEnvironment2 ? true : false
        // This is to prevent ECONNRESET socket hang up errors. Reference: https://github.com/axios/axios/issues/2936#issuecomment-779439991
      }
    );
    if (Array.isArray(documents)) {
      const resultsInJSONFormat = resultsInJSONLFormat.split("\n").map((r) => JSON.parse(r));
      const failedItems = resultsInJSONFormat.filter(
        (r) => r.success === false
      );
      if (failedItems.length > 0) {
        throw new ImportError(
          `${resultsInJSONFormat.length - failedItems.length} documents imported successfully, ${failedItems.length} documents failed during import. Use \`error.importResults\` from the raised exception to get a detailed error reason for each document.`,
          resultsInJSONFormat,
          {
            documentsInJSONLFormat,
            options,
            failedItems,
            successCount: resultsInJSONFormat.length - failedItems.length
          }
        );
      } else {
        return resultsInJSONFormat;
      }
    } else {
      return resultsInJSONLFormat;
    }
  }
  /**
   * Imports documents from a NodeJS readable stream of JSONL.
   */
  async importStream(readableStream, options = {}) {
    const resultsInJSONLFormat = await this.apiCall.performRequest(
      "post",
      this.endpointPath("import"),
      {
        queryParameters: options,
        bodyParameters: readableStream,
        additionalHeaders: { "Content-Type": "text/plain" },
        skipConnectionTimeout: true,
        // We never want to client-side-timeout on an import and retry, since imports are syncronous and we want to let them take as long as it takes to complete fully
        enableKeepAlive: isNodeJSEnvironment2 ? true : false
        // This is to prevent ECONNRESET socket hang up errors. Reference: https://github.com/axios/axios/issues/2936#issuecomment-779439991
      }
    );
    const resultsInJSONFormat = resultsInJSONLFormat.split("\n").map((r) => JSON.parse(r));
    const failedItems = resultsInJSONFormat.filter((r) => r.success === false);
    if (failedItems.length > 0) {
      throw new ImportError(
        `${resultsInJSONFormat.length - failedItems.length} documents imported successfully, ${failedItems.length} documents failed during import. Use \`error.importResults\` from the raised exception to get a detailed error reason for each document.`,
        resultsInJSONFormat,
        {
          documentsInJSONLFormat: readableStream,
          options,
          failedItems,
          successCount: resultsInJSONFormat.length - failedItems.length
        }
      );
    } else {
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
      responseType: "stream"
    });
  }
};
function isEmptyString(str) {
  return str == null || str === "" || str.length === 0;
}

// src/Typesense/Overrides.ts
var RESOURCEPATH4 = "/overrides";
var Overrides = class _Overrides {
  constructor(collectionName, apiCall) {
    this.collectionName = collectionName;
    this.apiCall = apiCall;
  }
  async upsert(overrideId, params) {
    return this.apiCall.put(
      this.endpointPath(overrideId),
      params
    );
  }
  async retrieve() {
    return this.apiCall.get(this.endpointPath());
  }
  endpointPath(operation) {
    return `${Collections.RESOURCEPATH}/${this.collectionName}${_Overrides.RESOURCEPATH}${operation === void 0 ? "" : "/" + encodeURIComponent(operation)}`;
  }
  static get RESOURCEPATH() {
    return RESOURCEPATH4;
  }
};

// src/Typesense/Override.ts
var Override = class {
  constructor(collectionName, overrideId, apiCall) {
    this.collectionName = collectionName;
    this.overrideId = overrideId;
    this.apiCall = apiCall;
  }
  async retrieve() {
    return this.apiCall.get(this.endpointPath());
  }
  async delete() {
    return this.apiCall.delete(this.endpointPath());
  }
  endpointPath() {
    return `${Collections.RESOURCEPATH}/${encodeURIComponent(this.collectionName)}${Overrides.RESOURCEPATH}/${encodeURIComponent(this.overrideId)}`;
  }
};

// src/Typesense/Synonyms.ts
var RESOURCEPATH5 = "/synonyms";
var Synonyms = class _Synonyms {
  constructor(collectionName, apiCall) {
    this.collectionName = collectionName;
    this.apiCall = apiCall;
  }
  async upsert(synonymId, params) {
    return this.apiCall.put(
      this.endpointPath(synonymId),
      params
    );
  }
  async retrieve() {
    return this.apiCall.get(this.endpointPath());
  }
  endpointPath(operation) {
    return `${Collections.RESOURCEPATH}/${encodeURIComponent(this.collectionName)}${_Synonyms.RESOURCEPATH}${operation === void 0 ? "" : "/" + encodeURIComponent(operation)}`;
  }
  static get RESOURCEPATH() {
    return RESOURCEPATH5;
  }
};

// src/Typesense/Synonym.ts
var Synonym = class {
  constructor(collectionName, synonymId, apiCall) {
    this.collectionName = collectionName;
    this.synonymId = synonymId;
    this.apiCall = apiCall;
  }
  async retrieve() {
    return this.apiCall.get(this.endpointPath());
  }
  async delete() {
    return this.apiCall.delete(this.endpointPath());
  }
  endpointPath() {
    return `${Collections.RESOURCEPATH}/${encodeURIComponent(this.collectionName)}${Synonyms.RESOURCEPATH}/${encodeURIComponent(this.synonymId)}`;
  }
};

// src/Typesense/Document.ts
var Document = class {
  constructor(collectionName, documentId, apiCall) {
    this.collectionName = collectionName;
    this.documentId = documentId;
    this.apiCall = apiCall;
  }
  async retrieve() {
    return this.apiCall.get(this.endpointPath());
  }
  async delete(options) {
    return this.apiCall.delete(this.endpointPath(), options);
  }
  async update(partialDocument, options = {}) {
    return this.apiCall.patch(this.endpointPath(), partialDocument, options);
  }
  endpointPath() {
    return `${Collections.RESOURCEPATH}/${encodeURIComponent(this.collectionName)}${Documents.RESOURCEPATH}/${encodeURIComponent(this.documentId)}`;
  }
};

// src/Typesense/Collection.ts
var Collection = class {
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
    this._documents = new Documents(
      this.name,
      this.apiCall,
      this.configuration
    );
    this._overrides = new Overrides(this.name, this.apiCall);
    this._synonyms = new Synonyms(this.name, this.apiCall);
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
    } catch (e) {
      if (e instanceof ObjectNotFound) return false;
      throw e;
    }
  }
  documents(documentId) {
    if (!documentId) {
      return this._documents;
    } else {
      if (this.individualDocuments[documentId] === void 0) {
        this.individualDocuments[documentId] = new Document(
          this.name,
          documentId,
          this.apiCall
        );
      }
      return this.individualDocuments[documentId];
    }
  }
  overrides(overrideId) {
    if (overrideId === void 0) {
      return this._overrides;
    } else {
      if (this.individualOverrides[overrideId] === void 0) {
        this.individualOverrides[overrideId] = new Override(
          this.name,
          overrideId,
          this.apiCall
        );
      }
      return this.individualOverrides[overrideId];
    }
  }
  synonyms(synonymId) {
    if (synonymId === void 0) {
      return this._synonyms;
    } else {
      if (this.individualSynonyms[synonymId] === void 0) {
        this.individualSynonyms[synonymId] = new Synonym(
          this.name,
          synonymId,
          this.apiCall
        );
      }
      return this.individualSynonyms[synonymId];
    }
  }
  endpointPath() {
    return `${Collections.RESOURCEPATH}/${encodeURIComponent(this.name)}`;
  }
};

// src/Typesense/Aliases.ts
var RESOURCEPATH6 = "/aliases";
var Aliases = class _Aliases {
  constructor(apiCall) {
    this.apiCall = apiCall;
  }
  async upsert(name, mapping) {
    return this.apiCall.put(
      this.endpointPath(name),
      mapping
    );
  }
  async retrieve() {
    return this.apiCall.get(RESOURCEPATH6);
  }
  endpointPath(aliasName) {
    return `${_Aliases.RESOURCEPATH}/${encodeURIComponent(aliasName)}`;
  }
  static get RESOURCEPATH() {
    return RESOURCEPATH6;
  }
};

// src/Typesense/Alias.ts
var Alias = class {
  constructor(name, apiCall) {
    this.name = name;
    this.apiCall = apiCall;
  }
  async retrieve() {
    return this.apiCall.get(this.endpointPath());
  }
  async delete() {
    return this.apiCall.delete(this.endpointPath());
  }
  endpointPath() {
    return `${Aliases.RESOURCEPATH}/${encodeURIComponent(this.name)}`;
  }
};

// src/Typesense/Keys.ts
var import_crypto = __toESM(require_crypto());
var RESOURCEPATH7 = "/keys";
var Keys = class _Keys {
  constructor(apiCall) {
    this.apiCall = apiCall;
    this.apiCall = apiCall;
  }
  async create(params) {
    return this.apiCall.post(_Keys.RESOURCEPATH, params);
  }
  async retrieve() {
    return this.apiCall.get(RESOURCEPATH7);
  }
  generateScopedSearchKey(searchKey, parameters) {
    const normalizedParams = normalizeArrayableParams(
      parameters
    );
    const paramsJSON = JSON.stringify(normalizedParams);
    const digest = Buffer.from(
      (0, import_crypto.createHmac)("sha256", searchKey).update(paramsJSON).digest("base64")
    );
    const keyPrefix = searchKey.substr(0, 4);
    const rawScopedKey = `${digest}${keyPrefix}${paramsJSON}`;
    return Buffer.from(rawScopedKey).toString("base64");
  }
  static get RESOURCEPATH() {
    return RESOURCEPATH7;
  }
};

// src/Typesense/Key.ts
var Key = class {
  constructor(id, apiCall) {
    this.id = id;
    this.apiCall = apiCall;
  }
  async retrieve() {
    return this.apiCall.get(this.endpointPath());
  }
  async delete() {
    return this.apiCall.delete(this.endpointPath());
  }
  endpointPath() {
    return `${Keys.RESOURCEPATH}/${encodeURIComponent(this.id)}`;
  }
};

// src/Typesense/Debug.ts
var RESOURCEPATH8 = "/debug";
var Debug = class {
  constructor(apiCall) {
    this.apiCall = apiCall;
  }
  async retrieve() {
    return this.apiCall.get(RESOURCEPATH8);
  }
};

// src/Typesense/Metrics.ts
var RESOURCEPATH9 = "/metrics.json";
var Metrics = class {
  constructor(apiCall) {
    this.apiCall = apiCall;
  }
  async retrieve() {
    return this.apiCall.get(RESOURCEPATH9);
  }
};

// src/Typesense/Stats.ts
var RESOURCEPATH10 = "/stats.json";
var Metrics2 = class {
  constructor(apiCall) {
    this.apiCall = apiCall;
  }
  async retrieve() {
    return this.apiCall.get(RESOURCEPATH10);
  }
};

// src/Typesense/Health.ts
var RESOURCEPATH11 = "/health";
var Health = class {
  constructor(apiCall) {
    this.apiCall = apiCall;
  }
  async retrieve() {
    return this.apiCall.get(RESOURCEPATH11);
  }
};

// src/Typesense/Operations.ts
var RESOURCEPATH12 = "/operations";
var Operations = class {
  constructor(apiCall) {
    this.apiCall = apiCall;
  }
  async perform(operationName, queryParameters = {}) {
    return this.apiCall.post(
      `${RESOURCEPATH12}/${operationName}`,
      {},
      queryParameters
    );
  }
};

// src/Typesense/Presets.ts
var RESOURCEPATH13 = "/presets";
var Presets = class _Presets {
  constructor(apiCall) {
    this.apiCall = apiCall;
  }
  async upsert(presetId, params) {
    if (typeof params.value === "object" && "searches" in params.value) {
      const normalizedParams2 = params.value.searches.map(
        (search) => normalizeArrayableParams(search)
      );
      return this.apiCall.put(this.endpointPath(presetId), {
        value: { searches: normalizedParams2 }
      });
    }
    const normalizedParams = normalizeArrayableParams(
      params.value
    );
    return this.apiCall.put(this.endpointPath(presetId), {
      value: normalizedParams
    });
  }
  async retrieve() {
    return this.apiCall.get(this.endpointPath());
  }
  endpointPath(operation) {
    return `${_Presets.RESOURCEPATH}${operation === void 0 ? "" : "/" + encodeURIComponent(operation)}`;
  }
  static get RESOURCEPATH() {
    return RESOURCEPATH13;
  }
};

// src/Typesense/Preset.ts
var Preset = class {
  constructor(presetId, apiCall) {
    this.presetId = presetId;
    this.apiCall = apiCall;
  }
  async retrieve() {
    return this.apiCall.get(this.endpointPath());
  }
  async delete() {
    return this.apiCall.delete(this.endpointPath());
  }
  endpointPath() {
    return `${Presets.RESOURCEPATH}/${encodeURIComponent(this.presetId)}`;
  }
};

// src/Typesense/AnalyticsRules.ts
var RESOURCEPATH14 = "/analytics/rules";
var AnalyticsRules = class _AnalyticsRules {
  constructor(apiCall) {
    this.apiCall = apiCall;
    this.apiCall = apiCall;
  }
  async upsert(name, params) {
    return this.apiCall.put(
      this.endpointPath(name),
      params
    );
  }
  async retrieve() {
    return this.apiCall.get(this.endpointPath());
  }
  endpointPath(operation) {
    return `${_AnalyticsRules.RESOURCEPATH}${operation === void 0 ? "" : "/" + encodeURIComponent(operation)}`;
  }
  static get RESOURCEPATH() {
    return RESOURCEPATH14;
  }
};

// src/Typesense/AnalyticsRule.ts
var AnalyticsRule = class {
  constructor(name, apiCall) {
    this.name = name;
    this.apiCall = apiCall;
  }
  async retrieve() {
    return this.apiCall.get(this.endpointPath());
  }
  async delete() {
    return this.apiCall.delete(this.endpointPath());
  }
  endpointPath() {
    return `${AnalyticsRules.RESOURCEPATH}/${encodeURIComponent(this.name)}`;
  }
};

// src/Typesense/AnalyticsEvents.ts
var RESOURCEPATH15 = "/analytics/events";
var AnalyticsEvents = class _AnalyticsEvents {
  constructor(apiCall) {
    this.apiCall = apiCall;
    this.apiCall = apiCall;
  }
  async create(params) {
    return this.apiCall.post(
      this.endpointPath(),
      params
    );
  }
  endpointPath(operation) {
    return `${_AnalyticsEvents.RESOURCEPATH}${operation === void 0 ? "" : "/" + encodeURIComponent(operation)}`;
  }
  static get RESOURCEPATH() {
    return RESOURCEPATH15;
  }
};

// src/Typesense/Analytics.ts
var RESOURCEPATH16 = "/analytics";
var Analytics = class {
  constructor(apiCall) {
    this.apiCall = apiCall;
    this.individualAnalyticsRules = {};
    this.apiCall = apiCall;
    this._analyticsRules = new AnalyticsRules(this.apiCall);
    this._analyticsEvents = new AnalyticsEvents(this.apiCall);
  }
  rules(id) {
    if (id === void 0) {
      return this._analyticsRules;
    } else {
      if (this.individualAnalyticsRules[id] === void 0) {
        this.individualAnalyticsRules[id] = new AnalyticsRule(id, this.apiCall);
      }
      return this.individualAnalyticsRules[id];
    }
  }
  events() {
    return this._analyticsEvents;
  }
  static get RESOURCEPATH() {
    return RESOURCEPATH16;
  }
};

// src/Typesense/Stopwords.ts
var RESOURCEPATH17 = "/stopwords";
var Stopwords = class _Stopwords {
  constructor(apiCall) {
    this.apiCall = apiCall;
  }
  async upsert(stopwordId, params) {
    return this.apiCall.put(
      this.endpointPath(stopwordId),
      params
    );
  }
  async retrieve() {
    return this.apiCall.get(this.endpointPath());
  }
  endpointPath(operation) {
    return `${_Stopwords.RESOURCEPATH}${operation === void 0 ? "" : "/" + encodeURIComponent(operation)}`;
  }
  static get RESOURCEPATH() {
    return RESOURCEPATH17;
  }
};

// src/Typesense/Stopword.ts
var Stopword = class {
  constructor(stopwordId, apiCall) {
    this.stopwordId = stopwordId;
    this.apiCall = apiCall;
  }
  async retrieve() {
    return this.apiCall.get(this.endpointPath());
  }
  async delete() {
    return this.apiCall.delete(this.endpointPath());
  }
  endpointPath() {
    return `${Stopwords.RESOURCEPATH}/${encodeURIComponent(this.stopwordId)}`;
  }
};

// src/Typesense/ConversationModels.ts
var RESOURCEPATH18 = "/conversations/models";
var ConversationModels = class _ConversationModels {
  constructor(apiCall) {
    this.apiCall = apiCall;
    this.apiCall = apiCall;
  }
  async create(params) {
    return this.apiCall.post(
      this.endpointPath(),
      params
    );
  }
  async retrieve() {
    return this.apiCall.get(
      this.endpointPath()
    );
  }
  endpointPath(operation) {
    return `${_ConversationModels.RESOURCEPATH}${operation === void 0 ? "" : "/" + encodeURIComponent(operation)}`;
  }
  static get RESOURCEPATH() {
    return RESOURCEPATH18;
  }
};

// src/Typesense/ConversationModel.ts
var ConversationModel = class {
  constructor(id, apiCall) {
    this.id = id;
    this.apiCall = apiCall;
  }
  async update(params) {
    return this.apiCall.put(
      this.endpointPath(),
      params
    );
  }
  async retrieve() {
    return this.apiCall.get(this.endpointPath());
  }
  async delete() {
    return this.apiCall.delete(
      this.endpointPath()
    );
  }
  endpointPath() {
    return `${ConversationModels.RESOURCEPATH}/${encodeURIComponent(this.id)}`;
  }
};

// src/Typesense/Conversations.ts
var RESOURCEPATH19 = "/conversations";
var Conversations = class {
  constructor(apiCall) {
    this.apiCall = apiCall;
    this.individualConversationModels = {};
    this.apiCall = apiCall;
    this._conversationsModels = new ConversationModels(this.apiCall);
  }
  async retrieve() {
    return this.apiCall.get(RESOURCEPATH19);
  }
  models(id) {
    if (id === void 0) {
      return this._conversationsModels;
    } else {
      if (this.individualConversationModels[id] === void 0) {
        this.individualConversationModels[id] = new ConversationModel(
          id,
          this.apiCall
        );
      }
      return this.individualConversationModels[id];
    }
  }
  static get RESOURCEPATH() {
    return RESOURCEPATH19;
  }
};

// src/Typesense/Conversation.ts
var Conversation = class {
  constructor(id, apiCall) {
    this.id = id;
    this.apiCall = apiCall;
  }
  async retrieve() {
    return this.apiCall.get(this.endpointPath());
  }
  async update(params) {
    return this.apiCall.put(
      this.endpointPath(),
      params
    );
  }
  async delete() {
    return this.apiCall.delete(this.endpointPath());
  }
  endpointPath() {
    return `${Conversations.RESOURCEPATH}/${encodeURIComponent(this.id)}`;
  }
};

// src/Typesense/StemmingDictionaries.ts
var RESOURCEPATH20 = "/stemming/dictionaries";
var StemmingDictionaries = class _StemmingDictionaries {
  constructor(apiCall) {
    this.apiCall = apiCall;
    this.apiCall = apiCall;
  }
  async upsert(id, wordRootCombinations) {
    const wordRootCombinationsInJSONLFormat = Array.isArray(
      wordRootCombinations
    ) ? wordRootCombinations.map((combo) => JSON.stringify(combo)).join("\n") : wordRootCombinations;
    const resultsInJSONLFormat = await this.apiCall.performRequest(
      "post",
      this.endpointPath("import"),
      {
        queryParameters: { id },
        bodyParameters: wordRootCombinationsInJSONLFormat,
        additionalHeaders: { "Content-Type": "text/plain" },
        skipConnectionTimeout: true
      }
    );
    return Array.isArray(wordRootCombinations) ? resultsInJSONLFormat.split("\n").map((line) => JSON.parse(line)) : resultsInJSONLFormat;
  }
  async retrieve() {
    return this.apiCall.get(
      this.endpointPath()
    );
  }
  endpointPath(operation) {
    return operation === void 0 ? `${_StemmingDictionaries.RESOURCEPATH}` : `${_StemmingDictionaries.RESOURCEPATH}/${encodeURIComponent(operation)}`;
  }
  static get RESOURCEPATH() {
    return RESOURCEPATH20;
  }
};

// src/Typesense/StemmingDictionary.ts
var StemmingDictionary = class {
  constructor(id, apiCall) {
    this.id = id;
    this.apiCall = apiCall;
  }
  async retrieve() {
    return this.apiCall.get(this.endpointPath());
  }
  endpointPath() {
    return `${StemmingDictionaries.RESOURCEPATH}/${encodeURIComponent(this.id)}`;
  }
};

// src/Typesense/Stemming.ts
var RESOURCEPATH21 = "/stemming";
var Stemming = class {
  constructor(apiCall) {
    this.apiCall = apiCall;
    this.individualStemmingDictionaries = {};
    this.apiCall = apiCall;
    this._stemmingDictionaries = new StemmingDictionaries(this.apiCall);
  }
  dictionaries(id) {
    if (id === void 0) {
      return this._stemmingDictionaries;
    } else {
      if (this.individualStemmingDictionaries[id] === void 0) {
        this.individualStemmingDictionaries[id] = new StemmingDictionary(
          id,
          this.apiCall
        );
      }
      return this.individualStemmingDictionaries[id];
    }
  }
  static get RESOURCEPATH() {
    return RESOURCEPATH21;
  }
};

// src/Typesense/Client.ts
var Client = class {
  constructor(options) {
    options.sendApiKeyAsQueryParam = options.sendApiKeyAsQueryParam ?? false;
    this.configuration = new Configuration(options);
    this.apiCall = new ApiCall(this.configuration);
    this.debug = new Debug(this.apiCall);
    this.metrics = new Metrics(this.apiCall);
    this.stats = new Metrics2(this.apiCall);
    this.health = new Health(this.apiCall);
    this.operations = new Operations(this.apiCall);
    this.multiSearch = new MultiSearch(this.apiCall, this.configuration);
    this._collections = new Collections(this.apiCall);
    this.individualCollections = {};
    this._aliases = new Aliases(this.apiCall);
    this.individualAliases = {};
    this._keys = new Keys(this.apiCall);
    this.individualKeys = {};
    this._presets = new Presets(this.apiCall);
    this.individualPresets = {};
    this._stopwords = new Stopwords(this.apiCall);
    this.individualStopwords = {};
    this.analytics = new Analytics(this.apiCall);
    this.stemming = new Stemming(this.apiCall);
    this._conversations = new Conversations(this.apiCall);
    this.individualConversations = {};
  }
  collections(collectionName) {
    if (collectionName === void 0) {
      return this._collections;
    } else {
      if (this.individualCollections[collectionName] === void 0) {
        this.individualCollections[collectionName] = new Collection(
          collectionName,
          this.apiCall,
          this.configuration
        );
      }
      return this.individualCollections[collectionName];
    }
  }
  aliases(aliasName) {
    if (aliasName === void 0) {
      return this._aliases;
    } else {
      if (this.individualAliases[aliasName] === void 0) {
        this.individualAliases[aliasName] = new Alias(aliasName, this.apiCall);
      }
      return this.individualAliases[aliasName];
    }
  }
  keys(id) {
    if (id === void 0) {
      return this._keys;
    } else {
      if (this.individualKeys[id] === void 0) {
        this.individualKeys[id] = new Key(id, this.apiCall);
      }
      return this.individualKeys[id];
    }
  }
  presets(id) {
    if (id === void 0) {
      return this._presets;
    } else {
      if (this.individualPresets[id] === void 0) {
        this.individualPresets[id] = new Preset(id, this.apiCall);
      }
      return this.individualPresets[id];
    }
  }
  stopwords(id) {
    if (id === void 0) {
      return this._stopwords;
    } else {
      if (this.individualStopwords[id] === void 0) {
        this.individualStopwords[id] = new Stopword(id, this.apiCall);
      }
      return this.individualStopwords[id];
    }
  }
  conversations(id) {
    if (id === void 0) {
      return this._conversations;
    } else {
      if (this.individualConversations[id] === void 0) {
        this.individualConversations[id] = new Conversation(id, this.apiCall);
      }
      return this.individualConversations[id];
    }
  }
};

export { Client, Errors_exports as Errors, SearchClient };
