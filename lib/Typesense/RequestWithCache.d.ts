export default class RequestWithCache {
    private responseCache;
    private responsePromiseCache;
    clearCache(): void;
    perform<T>(requestContext: any, requestFunction: (...params: any) => unknown, requestFunctionArguments: any[], cacheOptions: CacheOptions): Promise<T | unknown>;
}
interface CacheOptions {
    cacheResponseForSeconds?: number;
    maxSize?: number;
}
export {};
