import { AxiosRequestConfig } from "axios";
import type { DocumentSchema } from "./Documents";
import type { StreamConfig } from "./Configuration";
import { HttpClient } from "./ApiCall";
export interface RequestParams<T extends DocumentSchema> {
    path: string;
    queryParams?: Record<string, unknown>;
    body?: unknown;
    headers?: Record<string, string>;
    streamConfig?: StreamConfig<T>;
    abortSignal?: AbortSignal | null;
    responseType?: AxiosRequestConfig["responseType"] | undefined;
}
export default class RequestWithCache {
    private responseCache;
    private responsePromiseCache;
    clearCache(): void;
    perform<const TContext extends HttpClient, const TMethod extends keyof HttpClient, const TDoc extends DocumentSchema, TResult>(requestContext: TContext, methodName: TMethod, requestParams: RequestParams<TDoc>, cacheOptions: CacheOptions): Promise<TResult>;
    private executeRequest;
}
interface CacheOptions {
    cacheResponseForSeconds?: number;
    maxSize?: number;
}
export {};
