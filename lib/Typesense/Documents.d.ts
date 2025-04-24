/// <reference types="node" />
import type { ReadStream } from "fs";
import ApiCall from "./ApiCall";
import Configuration from "./Configuration";
import { SearchOnlyDocuments } from "./SearchOnlyDocuments";
import { SearchParams, WriteableDocuments } from "./Types";
export type DeleteQuery = {
    truncate?: true;
} | {
    truncate?: never;
    filter_by?: string;
    batch_size?: number;
    ignore_not_found?: boolean;
};
export interface DeleteResponse {
    num_deleted: number;
}
interface ImportResponseSuccess {
    success: true;
}
export interface ImportResponseFail {
    success: false;
    error: string;
    document: DocumentSchema;
    code: number;
}
export type ImportResponse = ImportResponseSuccess | ImportResponseFail;
export type DocumentSchema = Record<string, any>;
export interface SearchParamsWithPreset<T extends DocumentSchema> extends Partial<SearchParams<T>> {
    preset: string;
}
type SearchResponseHighlightObject = {
    matched_tokens?: string[];
    snippet?: string;
    value?: string;
};
export type SearchResponseHighlight<T> = T extends string | number ? SearchResponseHighlightObject : {
    [TAttribute in keyof T]?: SearchResponseHighlight<T[TAttribute]>;
};
export interface SearchResponseHit<T extends DocumentSchema> {
    curated?: true;
    highlights?: [
        {
            field: keyof T;
            snippet?: string;
            value?: string;
            snippets?: string[];
            indices?: number[];
            matched_tokens: string[][] | string[];
        }
    ];
    highlight: SearchResponseHighlight<T>;
    document: T;
    text_match: number;
    text_match_info?: {
        best_field_score: `${number}`;
        best_field_weight: number;
        fields_matched: number;
        score: `${number}`;
        tokens_matched: number;
    };
}
export interface SearchResponseFacetCountSchema<T extends DocumentSchema> {
    counts: {
        count: number;
        highlighted: string;
        value: string;
        parent?: Record<string, string | number | boolean>;
    }[];
    field_name: keyof T;
    stats: {
        avg?: number;
        max?: number;
        min?: number;
        sum?: number;
    };
}
export interface SearchResponseRequestParams {
    collection_name?: string;
    q?: string;
    page?: number;
    per_page?: number;
    first_q?: string;
    voice_query?: {
        transcribed_query?: string;
    };
}
export interface SearchResponse<T extends DocumentSchema> {
    facet_counts?: SearchResponseFacetCountSchema<T>[];
    found: number;
    found_docs?: number;
    out_of: number;
    page: number;
    request_params: SearchResponseRequestParams;
    search_time_ms: number;
    search_cutoff?: boolean;
    hits?: SearchResponseHit<T>[];
    grouped_hits?: {
        group_key: string[];
        hits: SearchResponseHit<T>[];
        found?: number;
    }[];
    conversation?: {
        answer: string;
        conversation_history: {
            conversation: object[];
            id: string;
            last_updated: number;
            ttl: number;
        };
        conversation_id: string;
        query: string;
    };
    error?: string;
    code?: number;
}
export interface DocumentWriteParameters {
    dirty_values?: "coerce_or_reject" | "coerce_or_drop" | "drop" | "reject";
    action?: "create" | "update" | "upsert" | "emplace";
}
export interface UpdateByFilterParameters {
    filter_by?: string;
}
export interface UpdateByFilterResponse {
    num_updated: number;
}
export interface DocumentImportParameters extends DocumentWriteParameters {
    batch_size?: number;
    remote_embedding_batch_size?: number;
    remote_embedding_timeout_ms?: number;
    remote_embedding_num_tries?: number;
    return_doc?: boolean;
    return_id?: boolean;
}
export interface DocumentsExportParameters {
    filter_by?: string;
    include_fields?: string;
    exclude_fields?: string;
}
export interface SearchOptions {
    cacheSearchResultsForSeconds?: number;
    abortSignal?: AbortSignal | null;
}
export default class Documents<T extends DocumentSchema = object> extends SearchOnlyDocuments<T> implements WriteableDocuments<T> {
    constructor(collectionName: string, apiCall: ApiCall, configuration: Configuration);
    create(document: T, options?: DocumentWriteParameters): Promise<T>;
    upsert(document: T, options?: DocumentWriteParameters): Promise<T>;
    update(document: T, options: UpdateByFilterParameters): Promise<UpdateByFilterResponse>;
    update(document: T, options: DocumentWriteParameters): Promise<T>;
    delete(query?: DeleteQuery): Promise<DeleteResponse>;
    createMany(documents: T[], options?: DocumentImportParameters): Promise<ImportResponse[]>;
    /**
     * Import a set of documents in a batch.
     * @param {string|Array} documents - Can be a JSONL string of documents or an array of document objects.
     * @param options
     * @return {string|Array} Returns a JSONL string if the input was a JSONL string, otherwise it returns an array of results.
     */
    import(documents: string, options?: DocumentImportParameters): Promise<string>;
    import(documents: T[], options?: DocumentImportParameters): Promise<ImportResponse[]>;
    /**
     * Imports documents from a NodeJS readable stream of JSONL.
     */
    importStream(readableStream: ReadStream, options?: DocumentImportParameters): Promise<ImportResponse[]>;
    /**
     * Returns a JSONL string for all the documents in this collection
     */
    export(options?: DocumentsExportParameters): Promise<string>;
    /**
     * Returns a NodeJS readable stream of JSONL for all the documents in this collection.
     */
    exportStream(options?: DocumentsExportParameters): Promise<ReadStream>;
}
/**
 * @deprecated Import from './Types' instead
 */
export type { SearchParams, WriteableDocuments, SearchableDocuments, DropTokensMode, OperationMode, UnionArrayKeys, UnionArraySearchParams, ArraybleParams, ExtractBaseTypes, } from "./Types";
