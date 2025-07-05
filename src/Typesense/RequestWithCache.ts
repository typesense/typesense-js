import { AxiosRequestConfig } from "axios";
import type { DocumentSchema } from "./Documents";
import { HttpClient } from "./ApiCall";
import type { RequestParams } from "./Types";

const defaultCacheResponseForSeconds = 2 * 60;
const defaultMaxSize = 100;

interface CacheEntry<T> {
  requestTimestamp: number;
  response: T;
}

interface PromiseCacheEntry<T> {
  requestTimestamp: number;
  responsePromise: Promise<T>;
}

export default class RequestWithCache {
  private responseCache: Map<string, CacheEntry<unknown>> = new Map();
  private responsePromiseCache: Map<string, PromiseCacheEntry<unknown>> =
    new Map();

  clearCache() {
    this.responseCache = new Map();
    this.responsePromiseCache = new Map();
  }

  async perform<
    const TContext extends HttpClient,
    const TMethod extends keyof HttpClient,
    const TDoc extends DocumentSchema[],
    TResult,
  >(
    requestContext: TContext,
    methodName: TMethod,
    requestParams: RequestParams<TDoc>,
    cacheOptions: CacheOptions | undefined,
  ): Promise<TResult> {
    const {
      cacheResponseForSeconds = defaultCacheResponseForSeconds,
      maxSize = defaultMaxSize,
    } = cacheOptions || {};
    const isCacheDisabled =
      cacheOptions === undefined ||
      cacheResponseForSeconds <= 0 ||
      maxSize <= 0;

    const {
      path,
      queryParams,
      body,
      headers,
      streamConfig,
      abortSignal,
      responseType,
      isStreamingRequest,
    } = requestParams;

    if (isCacheDisabled) {
      return this.executeRequest<TResult>(
        requestContext,
        methodName,
        path,
        queryParams,
        body,
        headers,
        { abortSignal, responseType, streamConfig, isStreamingRequest },
      );
    }

    const requestParamsJSON = JSON.stringify(requestParams);
    const cacheEntry = this.responseCache.get(requestParamsJSON);
    const now = Date.now();

    if (cacheEntry) {
      const isEntryValid =
        now - cacheEntry.requestTimestamp < cacheResponseForSeconds * 1000;
      if (isEntryValid) {
        this.responseCache.delete(requestParamsJSON);
        this.responseCache.set(requestParamsJSON, cacheEntry);
        return cacheEntry.response as TResult;
      } else {
        this.responseCache.delete(requestParamsJSON);
      }
    }

    const cachePromiseEntry = this.responsePromiseCache.get(requestParamsJSON);

    if (cachePromiseEntry) {
      const isEntryValid =
        now - cachePromiseEntry.requestTimestamp <
        cacheResponseForSeconds * 1000;
      if (isEntryValid) {
        this.responsePromiseCache.delete(requestParamsJSON);
        this.responsePromiseCache.set(requestParamsJSON, cachePromiseEntry);
        return cachePromiseEntry.responsePromise as Promise<TResult>;
      } else {
        this.responsePromiseCache.delete(requestParamsJSON);
      }
    }

    const responsePromise = this.executeRequest<TResult>(
      requestContext,
      methodName,
      path,
      queryParams,
      body,
      headers,
      { abortSignal, responseType, streamConfig, isStreamingRequest },
    );

    this.responsePromiseCache.set(requestParamsJSON, {
      requestTimestamp: now,
      responsePromise,
    });

    const response = await responsePromise;
    this.responseCache.set(requestParamsJSON, {
      requestTimestamp: now,
      response: response,
    });

    const isCacheOverMaxSize = this.responseCache.size > maxSize;
    if (isCacheOverMaxSize) {
      const oldestEntry = this.responseCache.keys().next().value;
      if (oldestEntry) {
        this.responseCache.delete(oldestEntry);
      }
    }
    const isResponsePromiseCacheOverMaxSize =
      this.responsePromiseCache.size > maxSize;
    if (isResponsePromiseCacheOverMaxSize) {
      const oldestEntry = this.responsePromiseCache.keys().next().value;
      if (oldestEntry) {
        this.responsePromiseCache.delete(oldestEntry);
      }
    }
    return response;
  }

  private executeRequest<TResult>(
    context: HttpClient,
    methodName: keyof HttpClient,
    path: string,
    queryParams: Record<string, unknown> = {},
    body?: unknown,
    headers?: Record<string, string>,
    options?: {
      abortSignal?: AbortSignal | null;
      responseType?: AxiosRequestConfig["responseType"];
      streamConfig?: any;
      isStreamingRequest: boolean | undefined;
    },
  ): Promise<TResult> {
    const method = context[methodName];

    switch (methodName) {
      case "get":
        return (method as HttpClient["get"]).call(context, path, queryParams, {
          abortSignal: options?.abortSignal,
          responseType: options?.responseType,
          streamConfig: options?.streamConfig,
          isStreamingRequest: options?.isStreamingRequest,
        }) as Promise<TResult>;

      case "delete":
        return (method as HttpClient["delete"]).call(
          context,
          path,
          queryParams,
        ) as Promise<TResult>;

      case "post":
        return (method as HttpClient["post"]).call(
          context,
          path,
          body,
          queryParams,
          headers || {},
          {
            abortSignal: options?.abortSignal,
            responseType: options?.responseType,
            streamConfig: options?.streamConfig,
            isStreamingRequest: options?.isStreamingRequest,
          },
        ) as Promise<TResult>;

      case "put":
      case "patch":
        return (method as HttpClient[typeof methodName]).call(
          context,
          path,
          body,
          queryParams,
        ) as Promise<TResult>;

      default:
        throw new Error(`Unsupported method: ${String(methodName)}`);
    }
  }
}

interface CacheOptions {
  cacheResponseForSeconds?: number;
  maxSize?: number;
}

export type { RequestParams } from "./Types";
