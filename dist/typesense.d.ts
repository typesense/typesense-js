declare module "Typesense/Errors/TypesenseError" {
  export default class TypesenseError extends Error {
    constructor(message?: string);
  }
}
declare module "Typesense/Errors/HTTPError" {
  export default class HTTPError extends TypesenseError {
    constructor(message?: string);
  }
  import TypesenseError from "Typesense/Errors/TypesenseError";
}
declare module "Typesense/Errors/MissingConfigurationError" {
  export default class MissingConfigurationError extends TypesenseError {
    constructor(message?: string);
  }
  import TypesenseError from "Typesense/Errors/TypesenseError";
}
declare module "Typesense/Errors/ObjectAlreadyExists" {
  export default class ObjectAlreadyExists extends TypesenseError {
    constructor(message?: string);
  }
  import TypesenseError from "Typesense/Errors/TypesenseError";
}
declare module "Typesense/Errors/ObjectNotFound" {
  export default class ObjectNotFound extends TypesenseError {
    constructor(message?: string);
  }
  import TypesenseError from "Typesense/Errors/TypesenseError";
}
declare module "Typesense/Errors/ObjectUnprocessable" {
  export default class ObjectUnprocessable extends TypesenseError {
    constructor(message?: string);
  }
  import TypesenseError from "Typesense/Errors/TypesenseError";
}
declare module "Typesense/Errors/RequestMalformed" {
  export default class RequestMalformed extends TypesenseError {
    constructor(message?: string);
  }
  import TypesenseError from "Typesense/Errors/TypesenseError";
}
declare module "Typesense/Errors/RequestUnauthorized" {
  export default class RequestUnauthorized extends TypesenseError {
    constructor(message?: string);
  }
  import TypesenseError from "Typesense/Errors/TypesenseError";
}
declare module "Typesense/Errors/ServerError" {
  export default class ServerError extends TypesenseError {
    constructor(message?: string);
  }
  import TypesenseError from "Typesense/Errors/TypesenseError";
}
declare module "Typesense/Errors/index" {
  import HTTPError from "Typesense/Errors/HTTPError";
  import MissingConfigurationError from "Typesense/Errors/MissingConfigurationError";
  import ObjectAlreadyExists from "Typesense/Errors/ObjectAlreadyExists";
  import ObjectNotFound from "Typesense/Errors/ObjectNotFound";
  import ObjectUnprocessable from "Typesense/Errors/ObjectUnprocessable";
  import RequestMalformed from "Typesense/Errors/RequestMalformed";
  import RequestUnauthorized from "Typesense/Errors/RequestUnauthorized";
  import ServerError from "Typesense/Errors/ServerError";
  import TypesenseError from "Typesense/Errors/TypesenseError";
  export {
    HTTPError,
    MissingConfigurationError,
    ObjectAlreadyExists,
    ObjectNotFound,
    ObjectUnprocessable,
    RequestMalformed,
    RequestUnauthorized,
    ServerError,
    TypesenseError,
  };
}
declare module "Typesense/Configuration" {
  export default class Configuration {
    constructor(options?: {});
    nodes: any;
    nearestNode: any;
    connectionTimeoutSeconds: any;
    healthcheckIntervalSeconds: any;
    numRetries: any;
    retryIntervalSeconds: any;
    apiKey: any;
    logger: any;
    logLevel: any;
    validate(): boolean;
    _validateNodes(): any;
    _isNodeMissingAnyParameters(node: any): boolean;
    _setDefaultPathInNode(node: any): any;
    _setDefaultPortInNode(node: any): any;
    _showDeprecationWarnings(options: any): void;
  }
}
declare module "Typesense/ApiCall" {
  export default class ApiCall {
    constructor(configuration: any);
    _configuration: any;
    _apiKey: any;
    _nodes: any;
    _nearestNode: any;
    _connectionTimeoutSeconds: any;
    _healthcheckIntervalSeconds: any;
    _numRetriesPerRequest: any;
    _retryIntervalSeconds: any;
    _logger: any;
    _currentNodeIndex: number;
    get(endpoint: any, parameters?: {}): Promise<any>;
    delete(endpoint: any, parameters?: {}): Promise<any>;
    post(endpoint: any, parameters?: {}): Promise<any>;
    put(endpoint: any, parameters?: {}): Promise<any>;
    performRequest(
      requestType: any,
      endpoint: any,
      queryParameters?: {},
      bodyParameters?: {},
      additionalHeaders?: {}
    ): Promise<any>;
    _getNextNode(requestNumber?: number): any;
    _nodeDueForHealthcheck(node: any, requestNumber?: number): boolean;
    _initializeMetadataForNodes(): void;
    _setNodeHealthcheck(node: any, isHealthy: any): void;
    _uriFor(endpoint: any, node: any): string;
    _defaultHeaders(): {
      "Content-Type": string;
    };
    _timer(seconds: any): Promise<any>;
    _customErrorForResponse(response: any, messageFromServer: any): HTTPError;
  }
  import { HTTPError } from "Typesense/Errors";
}
declare module "Typesense/Collections" {
  export default class Collections {
    static get RESOURCEPATH(): string;
    constructor(apiCall: any);
    _apiCall: any;
    create(schema: any): any;
    retrieve(schema: any): any;
  }
}
declare module "Typesense/Documents" {
  export default class Documents {
    static get RESOURCEPATH(): string;
    constructor(collectionName: any, apiCall: any);
    _collectionName: any;
    _apiCall: any;
    create(document: any): any;
    createMany(documents: any): Promise<any>;
    import(documentsInJSONLFormat: any): any;
    export(): any;
    search(searchParameters: any): any;
    _endpointPath(operation: any): string;
  }
}
declare module "Typesense/Document" {
  export default class Document {
    constructor(collectionName: any, documentId: any, apiCall: any);
    _collectionName: any;
    _documentId: any;
    _apiCall: any;
    retrieve(): any;
    delete(): any;
    _endpointPath(): string;
  }
}
declare module "Typesense/Overrides" {
  export default class Overrides {
    static get RESOURCEPATH(): string;
    constructor(collectionName: any, apiCall: any);
    _collectionName: any;
    _apiCall: any;
    create(params: any): any;
    retrieve(): any;
    _endpointPath(operation: any): string;
  }
}
declare module "Typesense/Override" {
  export default class Override {
    constructor(collectionName: any, overrideId: any, apiCall: any);
    _collectionName: any;
    _overrideId: any;
    _apiCall: any;
    retrieve(): any;
    delete(): any;
    _endpointPath(): string;
  }
}
declare module "Typesense/Collection" {
  export default class Collection {
    constructor(name: any, apiCall: any);
    _name: any;
    _apiCall: any;
    _documents: Documents;
    _individualDocuments: {};
    _overrides: Overrides;
    _individualOverrides: {};
    retrieve(): any;
    delete(): any;
    documents(documentId: any): any;
    overrides(overrideId: any): any;
    _endpointPath(): string;
  }
  import Documents from "Typesense/Documents";
  import Overrides from "Typesense/Overrides";
}
declare module "Typesense/Aliases" {
  export default class Aliases {
    static get RESOURCEPATH(): string;
    constructor(apiCall: any);
    _apiCall: any;
    upsert(name: any, mapping: any): any;
    retrieve(schema: any): any;
    _endpointPath(aliasName: any): string;
  }
}
declare module "Typesense/Alias" {
  export default class Alias {
    constructor(name: any, apiCall: any);
    _apiCall: any;
    _name: any;
    retrieve(): any;
    delete(): any;
    _endpointPath(): string;
  }
}
declare module "Typesense/Keys" {
  export default class Keys {
    static get RESOURCEPATH(): string;
    constructor(apiCall: any);
    _apiCall: any;
    create(params: any): any;
    retrieve(): any;
    generateScopedSearchKey(searchKey: any, parameters: any): any;
  }
}
declare module "Typesense/Key" {
  export default class Key {
    constructor(id: any, apiCall: any);
    _apiCall: any;
    _id: any;
    retrieve(): any;
    delete(): any;
    _endpointPath(): string;
  }
}
declare module "Typesense/Debug" {
  export default class Debug {
    constructor(apiCall: any);
    _apiCall: any;
    retrieve(): any;
  }
}
declare module "Typesense/Metrics" {
  export default class Metrics {
    constructor(apiCall: any);
    _apiCall: any;
    retrieve(): any;
  }
}
declare module "Typesense/Health" {
  export default class Health {
    constructor(apiCall: any);
    _apiCall: any;
    retrieve(): any;
  }
}
declare module "Typesense/Client" {
  export default class Client {
    constructor(options: any);
    configuration: Configuration;
    _apiCall: ApiCall;
    debug: Debug;
    metrics: Metrics;
    health: Health;
    _collections: Collections;
    _individualCollections: {};
    _aliases: Aliases;
    _individualAliases: {};
    _keys: Keys;
    _individualKeys: {};
    collections(collectionName: any): any;
    aliases(aliasName: any): any;
    keys(id: any): any;
  }
  import Configuration from "Typesense/Configuration";
  import ApiCall from "Typesense/ApiCall";
  import Debug from "Typesense/Debug";
  import Metrics from "Typesense/Metrics";
  import Health from "Typesense/Health";
  import Collections from "Typesense/Collections";
  import Aliases from "Typesense/Aliases";
  import Keys from "Typesense/Keys";
}
declare module "Typesense/SearchClient" {
  export default class SearchClient {
    constructor(options: any);
    configuration: Configuration;
    _apiCall: ApiCall;
    _individualCollections: {};
    collections(collectionName: any): any;
  }
  import Configuration from "Typesense/Configuration";
  import ApiCall from "Typesense/ApiCall";
}
declare module "Typesense" {
  import Client from "Typesense/Client";
  import SearchClient from "Typesense/SearchClient";
  import * as Errors from "Typesense/Errors";
  export { Client, SearchClient, Errors };
}
