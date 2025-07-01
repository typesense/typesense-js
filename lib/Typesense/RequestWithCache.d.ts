import type { DocumentSchema } from "./Documents";
import { HttpClient } from "./ApiCall";
import type { RequestParams } from "./Types";
export default class RequestWithCache {
    private responseCache;
    private responsePromiseCache;
    clearCache(): void;
    perform<const TContext extends HttpClient, const TMethod extends keyof HttpClient, const TDoc extends DocumentSchema[], TResult>(requestContext: TContext, methodName: TMethod, requestParams: RequestParams<TDoc>, cacheOptions: CacheOptions | undefined): Promise<TResult>;
    private executeRequest;
}
interface CacheOptions {
    cacheResponseForSeconds?: number;
    maxSize?: number;
}
export type { RequestParams } from "./Types";
