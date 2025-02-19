import ApiCall from "./ApiCall";
import Configuration from "./Configuration";
import { DocumentSchema, SearchParams, SearchParamsWithPreset, SearchResponse, SearchResponseRequestParams } from "./Documents";
export interface MultiSearchRequestSchema extends SearchParams {
    collection?: string;
    rerank_hybrid_matches?: boolean;
    "x-typesense-api-key"?: string;
}
export interface MultiSearchRequestWithPresetSchema extends SearchParamsWithPreset {
    collection?: string;
    "x-typesense-api-key"?: string;
}
export interface MultiSearchRequestsSchema<U extends boolean | undefined = undefined> {
    union?: U;
    searches: (MultiSearchRequestSchema | MultiSearchRequestWithPresetSchema)[];
}
export interface UnionSearchResponse<T extends DocumentSchema> extends Omit<SearchResponse<T>, "request_params"> {
    union_request_params: SearchResponseRequestParams[];
}
export type MultiSearchResponse<U extends boolean | undefined, T extends DocumentSchema[]> = U extends true ? UnionSearchResponse<T[number]> : {
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
    perform<T extends DocumentSchema[] = [], const U extends boolean | undefined = undefined>(searchRequests: MultiSearchRequestsSchema<U>, commonParams?: Partial<MultiSearchRequestSchema>, { cacheSearchResultsForSeconds, }?: {
        cacheSearchResultsForSeconds?: number;
    }): Promise<MultiSearchResponse<U, T>>;
}
