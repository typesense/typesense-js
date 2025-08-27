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
    perform<const T extends DocumentSchema[] = [], const Infix extends string = string>(searchRequests: MultiSearchRequestsWithUnionSchema<T[number], Infix>, commonParams?: MultiSearchUnionParameters<T[number], Infix>, options?: SearchOptions): Promise<UnionSearchResponse<T[number]>>;
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
