export default class RequestWithCache {
    private responseCache;
    perform<T extends any>(requestContext: any, requestFunction: (...params: any) => unknown, requestFunctionArguments: any[], { cacheResponseForSeconds }: {
        cacheResponseForSeconds: number;
    }): Promise<T>;
}
