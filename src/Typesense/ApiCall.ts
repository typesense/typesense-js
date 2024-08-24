import { Logger } from "loglevel";
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
import Configuration, { NodeConfiguration } from "./Configuration";
import { Agent as HTTPAgent } from "http";
import { Agent as HTTPSAgent } from "https";
import { fetchWithTimeout } from "../Shared/FetchWithTimeout";

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
  process.versions.node != null;

export default class ApiCall {
  private readonly apiKey: string;
  private readonly nodes: Node[];
  private readonly nearestNode: Node;
  private readonly healthcheckIntervalSeconds: number;
  private readonly retryIntervalSeconds: number;
  private readonly sendApiKeyAsQueryParam?: boolean;
  private readonly numRetriesPerRequest: number;
  private readonly additionalUserHeaders?: Record<string, string>;
  private readonly connectionTimeoutSeconds: number;

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
    }: {
      abortSignal?: any;
      responseType?: ResponseType | undefined;
    } = {},
  ): Promise<T> {
    return this.performRequest<T>("GET", endpoint, {
      queryParameters,
      abortSignal,
      responseType,
    });
  }

  async delete<T>(endpoint: string, queryParameters: any = {}): Promise<T> {
    return this.performRequest<T>("DELETE", endpoint, { queryParameters });
  }

  async post<T>(
    endpoint: string,
    bodyParameters: any = {},
    queryParameters: any = {},
    additionalHeaders: any = {},
  ): Promise<T> {
    return this.performRequest<T>("POST", endpoint, {
      queryParameters,
      bodyParameters,
      additionalHeaders,
    });
  }

  async put<T>(
    endpoint: string,
    bodyParameters: any = {},
    queryParameters: any = {},
  ): Promise<T> {
    return this.performRequest<T>("PUT", endpoint, {
      queryParameters,
      bodyParameters,
    });
  }

  async patch<T>(
    endpoint: string,
    bodyParameters: any = {},
    queryParameters: any = {},
  ): Promise<T> {
    return this.performRequest<T>("PATCH", endpoint, {
      queryParameters,
      bodyParameters,
    });
  }

  async performRequest<T>(
    requestType: string,
    endpoint: string,
    {
      queryParameters = null,
      bodyParameters = null,
      additionalHeaders = {},
      abortSignal = null,
      enableKeepAlive = undefined,
      skipConnectionTimeout = false,
    }: {
      queryParameters?: any;
      bodyParameters?: any;
      additionalHeaders?: any;
      abortSignal?: any;
      responseType?: ResponseType | undefined;
      skipConnectionTimeout?: boolean;
      enableKeepAlive?: boolean | undefined;
    },
  ): Promise<T> {
    this.configuration.validate();

    const requestNumber = Date.now();
    let lastException;
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

      let abortListener;

      try {
        const url = this.uriFor(endpoint, node);
        const headers = Object.assign(
          {},
          this.defaultHeaders(),
          additionalHeaders,
          this.additionalUserHeaders,
        );

        let fetchOptions: RequestInit = {
          method: requestType,
          headers,
          signal: abortSignal,
        };

        let queryParams = "";

        if (queryParameters && Object.keys(queryParameters).length !== 0) {
          queryParams = new URLSearchParams(queryParameters).toString();

          fetchOptions = {
            ...fetchOptions,
            method: requestType,
          };
          if (this.sendApiKeyAsQueryParam) {
            fetchOptions.headers = {
              ...headers,
              "x-typesense-api-key": this.apiKey,
            };
          }
        }

        if (
          bodyParameters &&
          ((typeof bodyParameters === "string" &&
            bodyParameters.length !== 0) ||
            (typeof bodyParameters === "object" &&
              Object.keys(bodyParameters).length !== 0))
        ) {
          fetchOptions.body = JSON.stringify(bodyParameters);
        }

        /**
         * RequestInit type is being used in a Node.js environment. Since fetch doesn't natively support the agent option in the browser, this approach ensures it's only applied in environments where it's supported (like Node.js).
         */
        if (enableKeepAlive === true && isNodeJSEnvironment) {
          (fetchOptions as any).agent =
            node.protocol === "https:"
              ? new HTTPSAgent({ keepAlive: true })
              : new HTTPAgent({ keepAlive: true });
        }
        const fullUrl = queryParams ? `${url}?${queryParams}` : url;

        const response = await fetchWithTimeout(
          fullUrl,
          fetchOptions,
          skipConnectionTimeout
            ? this.connectionTimeoutSeconds * 1000
            : undefined,
        );

        if (response.ok) {
          this.setNodeHealthcheck(node, HEALTHY);
          const data = await response.json();
          return data;
        } else if (response.status < 500) {
          const errorData = await response.json();

          return Promise.reject(
            this.customErrorForResponse(response, errorData.message),
          );
        } else {
          const responseText = await response.text();
          try {
            const errorResponse = JSON.parse(responseText);
            throw this.customErrorForResponse(
              response,
              await errorResponse.message,
            );
          } catch (ex) {
            throw this.customErrorForResponse(response, "Error message");
          }
        }
      } catch (error: any) {
        this.setNodeHealthcheck(node, UNHEALTHY);
        lastException = error;
        this.logger.warn(
          `Request #${requestNumber}: Request to Node ${node.index} failed due to "${error.message}"`,
        );
        this.logger.warn(
          `Request #${requestNumber}: Sleeping for ${this.retryIntervalSeconds}s and then retrying request...`,
        );
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

  getNextNode(requestNumber = 0): Node {
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
    defaultHeaders["Accept"] = "application/json, text/plain, */*";
    return defaultHeaders;
  }

  async timer(seconds: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
  }

  customErrorForResponse(
    response: Response,
    messageFromServer: string,
  ): TypesenseError {
    let errorMessage = `Request failed with HTTP code ${response.status}`;

    if (
      typeof messageFromServer === "string" &&
      messageFromServer.trim() !== ""
    ) {
      errorMessage += ` | Server said: ${messageFromServer}`;
    }

    let error = new TypesenseError(errorMessage);

    if (response.status === 400) {
      error = new RequestMalformed(errorMessage);
    } else if (response.status === 401) {
      error = new RequestUnauthorized(errorMessage);
    } else if (response.status === 404) {
      error = new ObjectNotFound(errorMessage);
    } else if (response.status === 409) {
      error = new ObjectAlreadyExists(errorMessage);
    } else if (response.status === 422) {
      error = new ObjectUnprocessable(errorMessage);
    } else if (response.status >= 500 && response.status <= 599) {
      error = new ServerError(errorMessage);
    } else {
      error = new HTTPError(errorMessage);
    }

    error.httpStatus = response.status;

    return error;
  }
}
