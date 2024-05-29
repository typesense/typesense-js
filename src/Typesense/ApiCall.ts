import axios, { AxiosRequestConfig, AxiosResponse, Method } from 'axios';
import { Logger } from 'loglevel';
import {
  HTTPError,
  ObjectAlreadyExists,
  ObjectNotFound,
  ObjectUnprocessable,
  RequestMalformed,
  RequestUnauthorized,
  ServerError,
} from './Errors';
import TypesenseError from './Errors/TypesenseError';
import Configuration, { NodeConfiguration } from './Configuration';
import { Agent as HTTPAgent } from 'http';
import { Agent as HTTPSAgent } from 'https';

const APIKEYHEADERNAME = 'X-TYPESENSE-API-KEY';
const HEALTHY = true;
const UNHEALTHY = false;

interface Node extends NodeConfiguration {
  isHealthy: boolean;
  index: string | number;
}

export default class ApiCall {
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
    }: {
      abortSignal?: any;
      responseType?: AxiosRequestConfig['responseType'] | undefined;
    } = {},
  ): Promise<T> {
    return this.performRequest<T>('get', endpoint, {
      queryParameters,
      abortSignal,
      responseType,
    });
  }

  async delete<T>(endpoint: string, queryParameters: any = {}): Promise<T> {
    return this.performRequest<T>('delete', endpoint, { queryParameters });
  }

  async post<T>(
    endpoint: string,
    bodyParameters: any = {},
    queryParameters: any = {},
    additionalHeaders: any = {},
  ): Promise<T> {
    return this.performRequest<T>('post', endpoint, {
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
    return this.performRequest<T>('put', endpoint, {
      queryParameters,
      bodyParameters,
    });
  }

  async patch<T>(
    endpoint: string,
    bodyParameters: any = {},
    queryParameters: any = {},
  ): Promise<T> {
    return this.performRequest<T>('patch', endpoint, {
      queryParameters,
      bodyParameters,
    });
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
    }: {
      queryParameters?: any;
      bodyParameters?: any;
      additionalHeaders?: any;
      abortSignal?: any;
      responseType?: AxiosRequestConfig['responseType'] | undefined;
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
        return Promise.reject(new Error('Request aborted by caller.'));
      }

      let abortListener;

      try {
        const requestOptions: AxiosRequestConfig = {
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
          responseType,
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
                typeof data === 'string' &&
                headers['content-type'] &&
                headers['content-type'].startsWith('application/json')
              ) {
                transformedData = JSON.parse(data);
              }
              return transformedData;
            },
          ],
        };

        if (skipConnectionTimeout !== true) {
          requestOptions.timeout = this.connectionTimeoutSeconds * 1000;
        }

        if (queryParameters && Object.keys(queryParameters).length !== 0) {
          requestOptions.params = queryParameters;
        }

        if (this.sendApiKeyAsQueryParam) {
          requestOptions.params = requestOptions.params || {};
          requestOptions.params['x-typesense-api-key'] = this.apiKey;
        }

        if (this.configuration.httpAgent) {
          this.logger.debug(
            `Request #${requestNumber}: Using custom httpAgent`,
          );
          requestOptions.httpAgent = this.configuration.httpAgent;
        } else if (enableKeepAlive === true) {
          this.logger.debug(`Request #${requestNumber}: Enabling KeepAlive`);
          requestOptions.httpAgent = new HTTPAgent({ keepAlive: true });
        }

        if (this.configuration.httpsAgent) {
          this.logger.debug(
            `Request #${requestNumber}: Using custom httpsAgent`,
          );
          requestOptions.httpsAgent = this.configuration.httpsAgent;
        } else if (enableKeepAlive === true) {
          this.logger.debug(`Request #${requestNumber}: Enabling keepAlive`);
          requestOptions.httpsAgent = new HTTPSAgent({ keepAlive: true });
        }

        if (this.configuration.paramsSerializer) {
          this.logger.debug(
            `Request #${requestNumber}: Using custom paramsSerializer`,
          );
          requestOptions.paramsSerializer = this.configuration.paramsSerializer;
        }

        if (
          bodyParameters &&
          ((typeof bodyParameters === 'string' &&
            bodyParameters.length !== 0) ||
            (typeof bodyParameters === 'object' &&
              Object.keys(bodyParameters).length !== 0))
        ) {
          requestOptions.data = bodyParameters;
        }

        // Translate from user-provided AbortController to the Axios request cancel mechanism.
        if (abortSignal) {
          const cancelToken = axios.CancelToken;
          const source = cancelToken.source();
          abortListener = () => source.cancel();
          abortSignal.addEventListener('abort', abortListener);
          requestOptions.cancelToken = source.token;
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
          // If response is 2xx return a resolved promise
          return Promise.resolve(response.data);
        } else if (response.status < 500) {
          // Next, if response is anything but 5xx, don't retry, return a custom error
          return Promise.reject(
            this.customErrorForResponse(response, response.data?.message),
          );
        } else {
          // Retry all other HTTP errors (HTTPStatus > 500)
          // This will get caught by the catch block below
          throw this.customErrorForResponse(response, response.data?.message);
        }
      } catch (error: any) {
        // This block handles retries for HTTPStatus > 500 and network layer issues like connection timeouts
        this.setNodeHealthcheck(node, UNHEALTHY);
        lastException = error;
        this.logger.warn(
          `Request #${requestNumber}: Request to Node ${
            node.index
          } failed due to "${error.code} ${error.message}${
            error.response == null
              ? ''
              : ' - ' + JSON.stringify(error.response?.data)
          }"`,
        );
        // this.logger.debug(error.stack)
        this.logger.warn(
          `Request #${requestNumber}: Sleeping for ${this.retryIntervalSeconds}s and then retrying request...`,
        );
        await this.timer(this.retryIntervalSeconds);
      } finally {
        if (abortSignal && abortListener) {
          abortSignal.removeEventListener('abort', abortListener);
        }
      }
    }
    this.logger.debug(
      `Request #${requestNumber}: No retries left. Raising last error`,
    );
    return Promise.reject(lastException);
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
        } is ${this.nearestNode.isHealthy === true ? 'Healthy' : 'Unhealthy'}`,
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
              node.isHealthy === true ? 'Healthy' : 'Unhealthy'
            }`,
        )
        .join(' || ')}`,
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
      this.nearestNode.index = 'nearestNode';
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
    defaultHeaders['Content-Type'] = 'application/json';
    return defaultHeaders;
  }

  async timer(seconds): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
  }

  customErrorForResponse(
    response: AxiosResponse,
    messageFromServer: string,
  ): TypesenseError {
    let errorMessage = `Request failed with HTTP code ${response.status}`;
    if (
      typeof messageFromServer === 'string' &&
      messageFromServer.trim() !== ''
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
