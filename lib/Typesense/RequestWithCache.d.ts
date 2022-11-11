export default class RequestWithCache {
    private responseCache;
    clearCache(): void;
    perform<T extends any>(requestContext: any, requestFunction: (...params: any) => unknown, requestFunctionArguments: any[], cacheOptions: CacheOptions): Promise<T | unknown>;
}
interface CacheOptions {
    cacheResponseForSeconds?: number;
    maxSize?: number;
}
export {};
