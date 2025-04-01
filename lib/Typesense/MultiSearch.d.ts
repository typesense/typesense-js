import ApiCall from "./ApiCall";
import Configuration from "./Configuration";
import { DocumentSchema, SearchParams, SearchParamsWithPreset, SearchResponse, SearchResponseRequestParams } from "./Documents";
export interface MultiSearchRequestSchema<T extends DocumentSchema> extends SearchParams<T> {
    collection?: string;
    rerank_hybrid_matches?: boolean;
    "x-typesense-api-key"?: string;
}
export interface MultiSearchRequestWithPresetSchema<T extends DocumentSchema> extends SearchParamsWithPreset<T> {
    collection?: string;
    "x-typesense-api-key"?: string;
}
export interface MultiSearchRequestsWithUnionSchema<T extends DocumentSchema> {
    union: true;
    searches: (MultiSearchRequestSchema<T> | MultiSearchRequestWithPresetSchema<T>)[];
}
export interface MultiSearchRequestsWithoutUnionSchema<T extends DocumentSchema> {
    union?: false | undefined;
    searches: (MultiSearchRequestSchema<T> | MultiSearchRequestWithPresetSchema<T>)[];
}
export type MultiSearchRequestsSchema<T extends DocumentSchema> = MultiSearchRequestsWithUnionSchema<T> | MultiSearchRequestsWithoutUnionSchema<T>;
export interface UnionSearchResponse<T extends DocumentSchema> extends Omit<SearchResponse<T>, "request_params"> {
    union_request_params: SearchResponseRequestParams[];
}
export type MultiSearchResponse<T extends DocumentSchema[], R extends MultiSearchRequestsSchema<T[number]> = MultiSearchRequestsSchema<T[number]>> = R extends MultiSearchRequestsWithUnionSchema<any> ? UnionSearchResponse<T[number]> : {
    results: {
        [Index in keyof T]: SearchResponse<T[Index]>;
    } & {
        length: T["length"];
    };
};
export default class MultiSearch {
    private apiCall;
    private configuration;
    private useTextContentType;
    private requestWithCache;
    constructor(apiCall: ApiCall, configuration: Configuration, useTextContentType?: boolean);
    clearCache(): void;
    perform<const T extends DocumentSchema[] = []>(searchRequests: MultiSearchRequestsWithUnionSchema<T[number]>, commonParams?: Partial<MultiSearchRequestSchema<T[number]>>, options?: {
        cacheSearchResultsForSeconds?: number;
    }): Promise<UnionSearchResponse<T[number]>>;
    perform<const T extends DocumentSchema[] = []>(searchRequests: MultiSearchRequestsWithoutUnionSchema<T[number]>, commonParams?: Partial<MultiSearchRequestSchema<T[number]>>, options?: {
        cacheSearchResultsForSeconds?: number;
    }): Promise<{
        results: {
            [Index in keyof T]: SearchResponse<T[Index]>;
        } & {
            length: T["length"];
        };
    }>;
    /**
     * Extracts streamConfig from search requests and returns both the config and clean requests
     */
    private extractStreamConfig;
}
