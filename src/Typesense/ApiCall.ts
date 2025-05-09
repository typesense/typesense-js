import type {
  AxiosAdapter,
  AxiosRequestConfig,
  AxiosResponse,
  Method,
} from "axios";
import axios from "axios";
import { Agent as HTTPAgent } from "http";
import { Agent as HTTPSAgent } from "https";
import { Logger } from "loglevel";
import Configuration from "./Configuration";
import type { NodeConfiguration, StreamConfig } from "./Configuration";
import {
  HTTPError,
  ObjectAlreadyExists,
  ObjectNotFound,
  ObjectUnprocessable,
  RequestMalformed,
  RequestUnauthorized,
  ServerError,
} from "./Errors";
import TypesenseError from "./Errors/TypesenseError";
import type { DocumentSchema, SearchResponse } from "./Documents";
import { toErrorWithMessage } from "./Utils";
import { MessageChunk } from "./Types";

const APIKEYHEADERNAME = "X-TYPESENSE-API-KEY";
const HEALTHY = true;
const UNHEALTHY = false;

interface Node extends NodeConfiguration {
  isHealthy: boolean;
  index: string | number;
}

const isNodeJSEnvironment =
  typeof process !== "undefined" &&
  process.versions != null &&
  process.versions.node != null &&
  typeof window === "undefined";

export interface HttpClient {
  get<T>(
    endpoint: string,
    queryParameters: Record<string, unknown>,
    {
      abortSignal,
      responseType,
      streamConfig,
      isStreamingRequest,
    }: {
      abortSignal?: AbortSignal | null;
      responseType?: AxiosRequestConfig["responseType"] | undefined;
      streamConfig?:
        | StreamConfig<T extends DocumentSchema ? T : DocumentSchema>
        | undefined;
      isStreamingRequest: boolean | undefined;
    },
  ): Promise<T>;
  delete<T>(
    endpoint: string,
    queryParameters: Record<string, unknown>,
  ): Promise<T>;
  post<T>(
    endpoint: string,
    bodyParameters: unknown,
    queryParameters: Record<string, unknown>,
    additionalHeaders: Record<string, string>,
    {
      abortSignal,
      responseType,
      streamConfig,
      isStreamingRequest,
    }: {
      abortSignal?: AbortSignal | null;
      responseType?: AxiosRequestConfig["responseType"] | undefined;
      streamConfig?:
        | StreamConfig<T extends DocumentSchema ? T : DocumentSchema>
        | undefined;
      isStreamingRequest: boolean | undefined;
    },
  ): Promise<T>;
  put<T>(
    endpoint: string,
    bodyParameters: unknown,
    queryParameters: Record<string, unknown>,
  ): Promise<T>;
  patch<T>(
    endpoint: string,
    bodyParameters: unknown,
    queryParameters: Record<string, unknown>,
  ): Promise<T>;
}

export default class ApiCall implements HttpClient {
  private readonly apiKey: string;
  private readonly nodes: Node[];
  private readonly nearestNode: Node;
  private readonly connectionTimeoutSeconds: number;
  private readonly healthcheckIntervalSeconds: number;
  private readonly retryIntervalSeconds: number;
  private readonly sendApiKeyAsQueryParam?: boolean;
  private readonly numRetriesPerRequest: number;
  private readonly additionalUserHeaders?: Record<string, string>;

  private readonly logger: Logger;
  private currentNodeIndex: number;

  constructor(private configuration: Configuration) {
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

  async get<T>(
    endpoint: string,
    queryParameters: any = {},
    {
      abortSignal = null,
      responseType = undefined,
      streamConfig = undefined,
      isStreamingRequest,
    }: {
      abortSignal?: any;
      responseType?: AxiosRequestConfig["responseType"] | undefined;
      streamConfig?:
        | StreamConfig<T extends DocumentSchema ? T : DocumentSchema>
        | undefined;
      isStreamingRequest?: boolean | undefined;
    } = {},
  ): Promise<T> {
    return this.performRequest<T>("get", endpoint, {
      queryParameters,
      abortSignal,
      responseType,
      streamConfig,
      isStreamingRequest,
    });
  }

  async delete<T>(endpoint: string, queryParameters: any = {}): Promise<T> {
    return this.performRequest<T>("delete", endpoint, {
      queryParameters,
      isStreamingRequest: false,
    });
  }

  async post<T>(
    endpoint: string,
    bodyParameters: any = {},
    queryParameters: any = {},
    additionalHeaders: any = {},
    {
      abortSignal = null,
      responseType = undefined,
      streamConfig = undefined,
      isStreamingRequest,
    }: {
      abortSignal?: AbortSignal | null;
      responseType?: AxiosRequestConfig["responseType"] | undefined;
      streamConfig?:
        | StreamConfig<T extends DocumentSchema ? T : DocumentSchema>
        | undefined;
      isStreamingRequest?: boolean | undefined;
    } = {},
  ): Promise<T> {
    return this.performRequest<T>("post", endpoint, {
      queryParameters,
      bodyParameters,
      additionalHeaders,
      abortSignal,
      responseType,
      streamConfig,
      isStreamingRequest,
    });
  }

  async put<T>(
    endpoint: string,
    bodyParameters: any = {},
    queryParameters: any = {},
  ): Promise<T> {
    return this.performRequest<T>("put", endpoint, {
      queryParameters,
      bodyParameters,
      isStreamingRequest: false,
    });
  }

  async patch<T>(
    endpoint: string,
    bodyParameters: any = {},
    queryParameters: any = {},
  ): Promise<T> {
    return this.performRequest<T>("patch", endpoint, {
      queryParameters,
      bodyParameters,
      isStreamingRequest: false,
    });
  }

  private getAdapter(): AxiosAdapter | undefined {
    if (!this.configuration.axiosAdapter) return undefined;

    if (typeof this.configuration.axiosAdapter === "function")
      return this.configuration.axiosAdapter;

    const isCloudflareWorkers =
      typeof navigator !== "undefined" &&
      navigator.userAgent === "Cloudflare-Workers";

    return isCloudflareWorkers
      ? axios.getAdapter(this.configuration.axiosAdapter).bind(globalThis)
      : axios.getAdapter(this.configuration.axiosAdapter);
  }

  async performRequest<T>(
    requestType: Method,
    endpoint: string,
    {
      queryParameters = null,
      bodyParameters = null,
      additionalHeaders = {},
      abortSignal = null,
      responseType = undefined,
      skipConnectionTimeout = false,
      enableKeepAlive = undefined,
      streamConfig = undefined,
      isStreamingRequest,
    }: {
      queryParameters?: any;
      bodyParameters?: any;
      additionalHeaders?: any;
      abortSignal?: any;
      responseType?: AxiosRequestConfig["responseType"] | undefined;
      skipConnectionTimeout?: boolean;
      enableKeepAlive?: boolean | undefined;
      streamConfig?:
        | StreamConfig<T extends DocumentSchema ? T : DocumentSchema>
        | undefined;
      isStreamingRequest?: boolean | undefined;
    },
  ): Promise<T> {
    this.configuration.validate();

    if (isStreamingRequest) {
      this.logger.debug(`Request: Performing streaming request to ${endpoint}`);

      // For browser streaming, always use responseType: "stream" and adapter: "fetch"
      if (!isNodeJSEnvironment && typeof fetch !== "undefined") {
        this.logger.debug("Using fetch adapter for browser streaming");
        responseType = "stream";
      }
    }

    const requestNumber = Date.now();
    let lastException;
    let wasAborted = false;
    this.logger.debug(
      `Request #${requestNumber}: Performing ${requestType.toUpperCase()} request: ${endpoint}`,
    );
    for (
      let numTries = 1;
      numTries <= this.numRetriesPerRequest + 1;
      numTries++
    ) {
      const node = this.getNextNode(requestNumber);
      this.logger.debug(
        `Request #${requestNumber}: Attempting ${requestType.toUpperCase()} request Try #${numTries} to Node ${
          node.index
        }`,
      );

      if (abortSignal && abortSignal.aborted) {
        return Promise.reject(new Error("Request aborted by caller."));
      }

      let abortListener: ((event: Event) => void) | undefined;

      try {
        const requestOptions: AxiosRequestConfig<string> = {
          method: requestType,
          url: this.uriFor(endpoint, node),
          headers: Object.assign(
            {},
            this.defaultHeaders(),
            additionalHeaders,
            this.additionalUserHeaders,
          ),
          maxContentLength: Infinity,
          maxBodyLength: Infinity,
          validateStatus: (status) => {
            /* Override default validateStatus, which only considers 2xx a success.
                In our case, if the server returns any HTTP code, we will handle it below.
                We do this to be able to raise custom errors based on response code.
             */
            return status > 0;
          },
          transformResponse: [
            (data, headers) => {
              let transformedData = data;
              if (
                headers !== undefined &&
                typeof data === "string" &&
                headers["content-type"] &&
                headers["content-type"].startsWith("application/json")
              ) {
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
            : this.getAdapter();

        if (skipConnectionTimeout !== true) {
          requestOptions.timeout = this.connectionTimeoutSeconds * 1000;
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
            `Request #${requestNumber}: Using custom httpAgent`,
          );
          requestOptions.httpAgent = this.configuration.httpAgent;
        } else if (enableKeepAlive === true) {
          if (!isNodeJSEnvironment) {
            this.logger.warn(
              `Request #${requestNumber}: Cannot use custom httpAgent in a browser environment to enable keepAlive`,
            );
          } else {
            this.logger.debug(`Request #${requestNumber}: Enabling KeepAlive`);
            requestOptions.httpAgent = new HTTPAgent({ keepAlive: true });
          }
        }

        if (this.configuration.httpsAgent) {
          this.logger.debug(
            `Request #${requestNumber}: Using custom httpsAgent`,
          );
          requestOptions.httpsAgent = this.configuration.httpsAgent;
        } else if (enableKeepAlive === true) {
          if (!isNodeJSEnvironment) {
            this.logger.warn(
              `Request #${requestNumber}: Cannot use custom httpAgent in a browser environment to enable keepAlive`,
            );
          } else {
            this.logger.debug(`Request #${requestNumber}: Enabling keepAlive`);
            requestOptions.httpsAgent = new HTTPSAgent({ keepAlive: true });
          }
        }

        if (this.configuration.paramsSerializer) {
          this.logger.debug(
            `Request #${requestNumber}: Using custom paramsSerializer`,
          );
          requestOptions.paramsSerializer = this.configuration.paramsSerializer;
        }

        if (
          bodyParameters &&
          ((typeof bodyParameters === "string" &&
            bodyParameters.length !== 0) ||
            (typeof bodyParameters === "object" &&
              Object.keys(bodyParameters).length !== 0))
        ) {
          requestOptions.data = bodyParameters;
        }

        // Translate from user-provided AbortController to the Axios request cancel mechanism.
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
              Accept: "text/event-stream",
            };
          }
        } else if (responseType) {
          requestOptions.responseType = responseType;
        }

        const response = await axios(requestOptions);

        if (response.status >= 1 && response.status <= 499) {
          // Treat any status code > 0 and < 500 to be an indication that node is healthy
          // We exclude 0 since some clients return 0 when request fails
          this.setNodeHealthcheck(node, HEALTHY);
        }

        this.logger.debug(
          `Request #${requestNumber}: Request to Node ${node.index} was made. Response Code was ${response.status}.`,
        );

        if (response.status >= 200 && response.status < 300) {
          if (isStreamingRequest) {
            return this.handleStreamingResponse<T>(response, streamConfig);
          }
          return Promise.resolve(response.data);
        } else if (response.status < 500) {
          // Next, if response is anything but 5xx, don't retry, return a custom error
          return Promise.reject(
            this.customErrorForResponse(
              response,
              response.data?.message,
              requestOptions.data,
            ),
          );
        } else {
          // Retry all other HTTP errors (HTTPStatus > 500)
          // This will get caught by the catch block below
          throw this.customErrorForResponse(
            response,
            response.data?.message,
            requestOptions.data,
          );
        }
      } catch (error: any) {
        // This block handles retries for HTTPStatus > 500 and network layer issues like connection timeouts
        if (!wasAborted) {
          this.setNodeHealthcheck(node, UNHEALTHY);
        }
        lastException = error;
        this.logger.warn(
          `Request #${requestNumber}: Request to Node ${
            node.index
          } failed due to "${error?.code ?? ""} ${error.message}${
            error.response == null
              ? ""
              : " - " + JSON.stringify(error.response?.data)
          }"`,
        );

        if (wasAborted) {
          return Promise.reject(new Error("Request aborted by caller."));
        }

        if (isStreamingRequest) {
          this.invokeOnErrorCallback(error, streamConfig);
        }

        if (numTries < this.numRetriesPerRequest + 1) {
          this.logger.warn(
            `Request #${requestNumber}: Sleeping for ${this.retryIntervalSeconds}s and then retrying request...`,
          );
        } else {
          this.logger.debug(
            `Request #${requestNumber}: No retries left. Raising last error`,
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
      `Request #${requestNumber}: No retries left. Raising last error`,
    );
    return Promise.reject(lastException);
  }

  private processStreamingLine(line: string): {
    conversation_id: string;
    message: string;
  } | null {
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
          message: JSON.stringify(jsonData),
        };
      } catch (e) {
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
  }

  private processDataLine(dataContent: string): {
    conversation_id: string;
    message: string;
  } | null {
    if (!dataContent) {
      return null;
    }

    if (dataContent.startsWith("{")) {
      try {
        const jsonData = JSON.parse(dataContent);
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
      } catch (e) {
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
  }

  private async handleStreamingResponse<T>(
    response: AxiosResponse,
    streamConfig:
      | StreamConfig<T extends DocumentSchema ? T : DocumentSchema>
      | undefined,
  ): Promise<T> {
    this.logger.debug(
      `Handling streaming response. Environment: ${isNodeJSEnvironment ? "Node.js" : "Browser"}`,
    );

    if (isNodeJSEnvironment && response.data) {
      return this.handleNodeStreaming<T>(response, streamConfig);
    }

    if (!isNodeJSEnvironment) {
      return this.handleBrowserStreaming<T>(response, streamConfig);
    }

    this.logger.debug("Processing non-streaming response");
    this.invokeOnCompleteCallback(response.data, streamConfig);
    return Promise.resolve(response.data as T);
  }

  private handleNodeStreaming<T>(
    response: AxiosResponse,
    streamConfig?: StreamConfig<T extends DocumentSchema ? T : DocumentSchema>,
  ): Promise<T> {
    this.logger.debug("Processing Node.js stream");
    return new Promise<T>((resolve, reject) => {
      const stream = response.data;
      const allChunks:
        | [
            ...MessageChunk[],
            SearchResponse<T extends DocumentSchema ? T : DocumentSchema>,
          ]
        | [] = [];
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

        this.finalizeStreamResult<T>(
          allChunks,
          resolve,
          response,
          streamConfig,
        );
      });

      stream.on("error", (error: unknown) => {
        this.logger.error(`Stream error: ${error}`);
        this.invokeOnErrorCallback(error, streamConfig);
        reject(error);
      });
    });
  }

  private handleBrowserStreaming<T>(
    response: AxiosResponse,
    streamConfig?: StreamConfig<T extends DocumentSchema ? T : DocumentSchema>,
  ): Promise<T> {
    this.logger.debug("Processing browser stream");

    return new Promise<T>(async (resolve, reject) => {
      try {
        if (response.data && typeof response.data.getReader === "function") {
          return this.handleBrowserReadableStream<T>(
            response.data,
            resolve,
            reject,
            response,
            streamConfig,
          );
        }

        if (typeof response.data === "string") {
          return this.handleBrowserStringResponse<T>(
            response.data,
            resolve,
            response,
            streamConfig,
          );
        }

        if (typeof response.data === "object" && response.data !== null) {
          this.logger.debug("No stream found, but data object is available");
          this.invokeOnCompleteCallback(response.data, streamConfig);
          return resolve(response.data as T);
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

  private async handleBrowserReadableStream<T>(
    stream: any,
    resolve: (value: T) => void,
    reject: (reason?: any) => void,
    response: AxiosResponse,
    streamConfig:
      | StreamConfig<T extends DocumentSchema ? T : DocumentSchema>
      | undefined,
  ): Promise<void> {
    this.logger.debug("Found ReadableStream in response.data");
    const reader = stream.getReader();
    const allChunks:
      | [
          ...MessageChunk[],
          SearchResponse<T extends DocumentSchema ? T : DocumentSchema>,
        ]
      | [] = [];
    let buffer = "";

    try {
      while (true) {
        const { done, value } = await reader.read();

        if (done) {
          this.logger.debug("Stream reading complete");
          if (buffer.trim()) {
            const lines = buffer.split("\n");
            this.processStreamLines(lines, allChunks, streamConfig);
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

      this.finalizeStreamResult<T>(allChunks, resolve, response, streamConfig);
    } catch (error) {
      this.logger.error(`Stream error: ${error}`);
      this.invokeOnErrorCallback(error, streamConfig);
      reject(error);
    }
  }

  private handleBrowserStringResponse<T>(
    data: string,
    resolve: (value: T) => void,
    response: AxiosResponse,
    streamConfig:
      | StreamConfig<T extends DocumentSchema ? T : DocumentSchema>
      | undefined,
  ): void {
    this.logger.debug("Processing text response as stream data");
    const allChunks:
      | [
          ...MessageChunk[],
          SearchResponse<T extends DocumentSchema ? T : DocumentSchema>,
        ]
      | [] = [];

    const lines = data.split("\n");
    this.processStreamLines(lines, allChunks, streamConfig);

    if (allChunks.length > 0) {
      const finalResult =
        this.combineStreamingChunks<
          T extends DocumentSchema ? T : DocumentSchema
        >(allChunks);
      this.invokeOnCompleteCallback(finalResult, streamConfig);
      resolve(finalResult as unknown as T);
    } else {
      // If no chunks were processed, use the original response
      this.logger.debug("No chunks processed, returning original API response");
      this.invokeOnCompleteCallback(response.data, streamConfig);
      resolve(response.data as T);
    }
  }

  private processStreamLines<T extends DocumentSchema>(
    lines: string[],
    allChunks: [...MessageChunk[], SearchResponse<T>] | [],
    streamConfig: StreamConfig<T> | undefined,
  ): void {
    for (const line of lines) {
      if (line.trim() && line !== "data: [DONE]") {
        const processed = this.processStreamingLine(line);
        if (processed !== null) {
          this.invokeOnChunkCallback(processed, streamConfig);
          (allChunks as MessageChunk[]).push(processed);
        }
      }
    }
  }

  private finalizeStreamResult<T>(
    allChunks:
      | [
          ...MessageChunk[],
          SearchResponse<T extends DocumentSchema ? T : DocumentSchema>,
        ]
      | [],
    resolve: (value: T) => void,
    response: AxiosResponse,
    streamConfig?: StreamConfig<T extends DocumentSchema ? T : DocumentSchema>,
  ): void {
    if (allChunks.length > 0) {
      const finalResult = this.combineStreamingChunks(allChunks);
      this.logger.debug("Stream processing complete");
      this.invokeOnCompleteCallback(finalResult, streamConfig);
      resolve(finalResult as unknown as T);
    } else {
      this.logger.debug("No chunks processed, returning original API response");
      this.invokeOnCompleteCallback(response.data, streamConfig);
      resolve(response.data as T);
    }
  }

  /**
   * Combines multiple streaming chunks into a single coherent result
   * This is critical for ensuring we return the complete data rather than just the last chunk
   */
  private combineStreamingChunks<T extends DocumentSchema>(
    chunks: [...MessageChunk[], SearchResponse<T>] | [],
  ): SearchResponse<T> {
    if (chunks.length === 0) return {} as SearchResponse<T>;
    if (chunks.length === 1) return chunks[0] as unknown as SearchResponse<T>;

    // For conversation streams with message chunks
    const messagesChunks = this.getMessageChunks(
      chunks as [...MessageChunk[], SearchResponse<T>],
    );
    if (messagesChunks.length > 0) {
      return this.combineMessageChunks(
        chunks as [...MessageChunk[], SearchResponse<T>],
        messagesChunks,
      );
    }

    // For regular search responses
    const lastChunk = chunks[chunks.length - 1];
    if (!this.isCompleteSearchResponse(lastChunk)) {
      throw new Error("Last chunk is not a complete search response");
    }

    return lastChunk;
  }

  private getMessageChunks<T extends DocumentSchema>(
    chunks: [...MessageChunk[], SearchResponse<T>],
  ): MessageChunk[] {
    return chunks.filter(this.isChunkMessage);
  }

  private isChunkMessage(chunk: unknown): chunk is MessageChunk {
    return (
      typeof chunk === "object" &&
      chunk !== null &&
      "message" in chunk &&
      "conversation_id" in chunk
    );
  }

  private combineMessageChunks<T extends DocumentSchema>(
    chunks: [...MessageChunk[], SearchResponse<T>],
    messagesChunks: MessageChunk[],
  ): SearchResponse<T> {
    this.logger.debug(
      `Found ${messagesChunks.length} message chunks to combine`,
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

  private isCompleteSearchResponse<T extends DocumentSchema>(
    chunk: MessageChunk | SearchResponse<T>,
  ): chunk is SearchResponse<T> {
    if (
      typeof chunk === "object" &&
      chunk !== null &&
      Object.keys(chunk as object).length > 0
    ) {
      return (
        "results" in (chunk as object) ||
        "found" in (chunk as object) ||
        "hits" in (chunk as object) ||
        "page" in (chunk as object) ||
        "search_time_ms" in (chunk as object)
      );
    }
    return false;
  }

  // Attempts to find the next healthy node, looping through the list of nodes once.
  //   But if no healthy nodes are found, it will just return the next node, even if it's unhealthy
  //     so we can try the request for good measure, in case that node has become healthy since
  getNextNode(requestNumber = 0): Node {
    // Check if nearestNode is set and is healthy, if so return it
    if (this.nearestNode != null) {
      this.logger.debug(
        `Request #${requestNumber}: Nodes Health: Node ${
          this.nearestNode.index
        } is ${this.nearestNode.isHealthy === true ? "Healthy" : "Unhealthy"}`,
      );
      if (
        this.nearestNode.isHealthy === true ||
        this.nodeDueForHealthcheck(this.nearestNode, requestNumber)
      ) {
        this.logger.debug(
          `Request #${requestNumber}: Updated current node to Node ${this.nearestNode.index}`,
        );
        return this.nearestNode;
      }
      this.logger.debug(
        `Request #${requestNumber}: Falling back to individual nodes`,
      );
    }

    // Fallback to nodes as usual
    this.logger.debug(
      `Request #${requestNumber}: Nodes Health: ${this.nodes
        .map(
          (node) =>
            `Node ${node.index} is ${
              node.isHealthy === true ? "Healthy" : "Unhealthy"
            }`,
        )
        .join(" || ")}`,
    );
    let candidateNode: Node = this.nodes[0];
    for (let i = 0; i <= this.nodes.length; i++) {
      this.currentNodeIndex = (this.currentNodeIndex + 1) % this.nodes.length;
      candidateNode = this.nodes[this.currentNodeIndex];
      if (
        candidateNode.isHealthy === true ||
        this.nodeDueForHealthcheck(candidateNode, requestNumber)
      ) {
        this.logger.debug(
          `Request #${requestNumber}: Updated current node to Node ${candidateNode.index}`,
        );
        return candidateNode;
      }
    }

    // None of the nodes are marked healthy, but some of them could have become healthy since last health check.
    //  So we will just return the next node.
    this.logger.debug(
      `Request #${requestNumber}: No healthy nodes were found. Returning the next node, Node ${candidateNode.index}`,
    );
    return candidateNode;
  }

  nodeDueForHealthcheck(node, requestNumber = 0): boolean {
    const isDueForHealthcheck =
      Date.now() - node.lastAccessTimestamp >
      this.healthcheckIntervalSeconds * 1000;
    if (isDueForHealthcheck) {
      this.logger.debug(
        `Request #${requestNumber}: Node ${node.index} has exceeded healtcheckIntervalSeconds of ${this.healthcheckIntervalSeconds}. Adding it back into rotation.`,
      );
    }
    return isDueForHealthcheck;
  }

  initializeMetadataForNodes(): void {
    if (this.nearestNode != null) {
      this.nearestNode.index = "nearestNode";
      this.setNodeHealthcheck(this.nearestNode, HEALTHY);
    }

    this.nodes.forEach((node, i) => {
      node.index = i;
      this.setNodeHealthcheck(node, HEALTHY);
    });
  }

  setNodeHealthcheck(node, isHealthy): void {
    node.isHealthy = isHealthy;
    node.lastAccessTimestamp = Date.now();
  }

  uriFor(endpoint: string, node): string {
    if (node.url != null) {
      return `${node.url}${endpoint}`;
    }
    return `${node.protocol}://${node.host}:${node.port}${node.path}${endpoint}`;
  }

  defaultHeaders(): any {
    const defaultHeaders = {};
    if (!this.sendApiKeyAsQueryParam) {
      defaultHeaders[APIKEYHEADERNAME] = this.apiKey;
    }
    defaultHeaders["Content-Type"] = "application/json";
    return defaultHeaders;
  }

  async timer(seconds): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
  }

  customErrorForResponse(
    response: AxiosResponse,
    messageFromServer: string,
    httpBody?: string,
  ): TypesenseError {
    let errorMessage = `Request failed with HTTP code ${response.status}`;
    if (
      typeof messageFromServer === "string" &&
      messageFromServer.trim() !== ""
    ) {
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

  private invokeOnChunkCallback<T extends DocumentSchema>(
    data: {
      conversation_id: string;
      message: string;
    },
    streamConfig: StreamConfig<T> | undefined,
  ): void {
    if (streamConfig?.onChunk) {
      try {
        streamConfig.onChunk(data);
      } catch (error) {
        this.logger.warn(`Error in onChunk callback: ${error}`);
      }
    }
  }

  private invokeOnCompleteCallback<T extends DocumentSchema>(
    data: SearchResponse<T>,
    streamConfig: StreamConfig<T> | undefined,
  ): void {
    if (streamConfig?.onComplete) {
      try {
        streamConfig.onComplete(data);
      } catch (error) {
        this.logger.warn(`Error in onComplete callback: ${error}`);
      }
    }
  }

  private invokeOnErrorCallback<T extends DocumentSchema>(
    error: unknown,
    streamConfig: StreamConfig<T> | undefined,
  ): void {
    if (streamConfig?.onError) {
      const errorObj = toErrorWithMessage(error);
      try {
        streamConfig.onError(errorObj);
      } catch (callbackError) {
        this.logger.warn(`Error in onError callback: ${callbackError}`);
      }
    }
  }
}
