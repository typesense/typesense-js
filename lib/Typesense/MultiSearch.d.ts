import ApiCall from './ApiCall';
import Configuration from './Configuration';
import { DocumentSchema, SearchParams, SearchResponse } from './Documents';
export interface MultiSearchRequestSchema extends SearchParams {
    collection?: string;
    'x-typesense-api-key'?: string;
}
export interface MultiSearchRequestsSchema {
    searches: MultiSearchRequestSchema[];
}
export interface MultiSearchResponse<T extends DocumentSchema = {}> {
    results: SearchResponse<T>[];
}
export default class MultiSearch<T extends DocumentSchema = {}> {
    private apiCall;
    private configuration;
    private useTextContentType;
    private requestWithCache;
    constructor(apiCall: ApiCall, configuration: Configuration, useTextContentType?: boolean);
    clearCache(): void;
    perform(searchRequests: MultiSearchRequestsSchema, commonParams?: Partial<MultiSearchRequestSchema>, { cacheSearchResultsForSeconds }?: {
        cacheSearchResultsForSeconds?: number;
    }): Promise<MultiSearchResponse<T>>;
}
