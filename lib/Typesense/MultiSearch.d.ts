import ApiCall from "./ApiCall";
import Configuration from "./Configuration";
import { DocumentSchema, SearchResponse } from "./Documents";
import type { MultiSearchRequestsWithUnionSchema, MultiSearchUnionParameters, MultiSearchResultsParameters, UnionSearchResponse, MultiSearchRequestsWithoutUnionSchema } from "./Types";
export default class MultiSearch {
    private apiCall;
    private configuration;
    private useTextContentType;
    private requestWithCache;
    constructor(apiCall: ApiCall, configuration: Configuration, useTextContentType?: boolean);
    clearCache(): void;
    perform<const T extends DocumentSchema[] = [], const Infix extends string = string>(searchRequests: MultiSearchRequestsWithUnionSchema<T[number], Infix>, commonParams?: MultiSearchUnionParameters<T[number], Infix>, options?: {
        cacheSearchResultsForSeconds?: number;
    }): Promise<UnionSearchResponse<T[number]>>;
    perform<const T extends DocumentSchema[] = [], const Infix extends string = string>(searchRequests: MultiSearchRequestsWithoutUnionSchema<T[number], Infix>, commonParams?: MultiSearchResultsParameters<T, Infix>, options?: {
        cacheSearchResultsForSeconds?: number;
    }): Promise<{
        results: {
            [Index in keyof T]: SearchResponse<T[Index]>;
        } & {
            length: T["length"];
        };
    }>;
    private isStreamingRequest;
}
export type { MultiSearchRequestsSchema, MultiSearchRequestsWithUnionSchema, MultiSearchResponse, MultiSearchUnionParameters, MultiSearchResultsParameters, UnionSearchResponse, MultiSearchRequestsWithoutUnionSchema, } from "./Types";
