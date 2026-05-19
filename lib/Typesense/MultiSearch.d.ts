import type ApiCall from "./ApiCall";
import type Configuration from "./Configuration";
import type { DocumentSchema, SearchOptions, SearchResponse } from "./Documents";
import type { MultiSearchRequestsWithUnionSchema, MultiSearchUnionParameters, MultiSearchResultsParameters, UnionSearchResponse, MultiSearchRequestsWithoutUnionSchema } from "./Types";
import { Logger } from "loglevel";
export default class MultiSearch {
    private apiCall;
    private configuration;
    private useTextContentType;
    private requestWithCache;
    readonly logger: Logger;
    constructor(apiCall: ApiCall, configuration: Configuration, useTextContentType?: boolean);
    clearCache(): void;
    /**
     * Send multiple search requests in a single HTTP request. Pass `union: true` to merge results, or omit it to receive a `results` array.
     *
     * @example
     * await client.multiSearch.perform({ searches: [{ collection: "products", q: "*" }] })
     * @example
     * await client.multiSearch.perform({ union: true, searches: [{ collection: "products", q: "*" }] })
     *
     * @see https://typesense.org/docs/latest/api/documents.html#federated-multi-search
     */
    perform<const T extends DocumentSchema[] = [], const Infix extends string = string>(searchRequests: MultiSearchRequestsWithUnionSchema<T[number], Infix>, commonParams?: MultiSearchUnionParameters<T[number], Infix>, options?: SearchOptions): Promise<UnionSearchResponse<T[number]>>;
    /**
     * Send multiple search requests in a single HTTP request and receive a `results` array (one entry per search).
     *
     * @example
     * await client.multiSearch.perform({ searches: [{ collection: "products", q: "*" }] })
     *
     * @see https://typesense.org/docs/latest/api/documents.html#federated-multi-search
     */
    perform<const T extends DocumentSchema[] = [], const Infix extends string = string>(searchRequests: MultiSearchRequestsWithoutUnionSchema<T[number], Infix>, commonParams?: MultiSearchResultsParameters<T, Infix>, options?: SearchOptions): Promise<{
        results: {
            [Index in keyof T]: SearchResponse<T[Index]>;
        } & {
            length: T["length"];
        };
    }>;
    private isStreamingRequest;
    private hasAnySearchObjectPagination;
}
export type { MultiSearchRequestsSchema, MultiSearchRequestsWithUnionSchema, MultiSearchResponse, MultiSearchUnionParameters, MultiSearchResultsParameters, UnionSearchResponse, MultiSearchRequestsWithoutUnionSchema, } from "./Types";
