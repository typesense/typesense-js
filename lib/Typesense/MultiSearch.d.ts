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
    perform<const T extends DocumentSchema[] = []>(searchRequests: MultiSearchRequestsWithUnionSchema<T[number]>, commonParams?: MultiSearchUnionParameters<T[number]>, options?: {
        cacheSearchResultsForSeconds?: number;
    }): Promise<UnionSearchResponse<T[number]>>;
    perform<const T extends DocumentSchema[] = []>(searchRequests: MultiSearchRequestsWithoutUnionSchema<T[number]>, commonParams?: MultiSearchResultsParameters<T>, options?: {
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
