import type { ReadStream } from "fs";
import ApiCall from "./ApiCall";
import Configuration from "./Configuration";
import { SearchOnlyDocuments } from "./SearchOnlyDocuments";
import { SearchParams, SearchResponseRequestParams, WriteableDocuments } from "./Types";
export type DeleteQuery = {
    truncate?: true;
} | {
    truncate?: never;
    filter_by?: string;
    batch_size?: number;
    ignore_not_found?: boolean;
    return_doc?: boolean;
    return_id?: boolean;
};
export interface DeleteResponse<T extends DocumentSchema = DocumentSchema> {
    num_deleted: number;
    documents?: T[];
    ids?: string[];
}
interface ImportResponseSuccess<T extends DocumentSchema = DocumentSchema> {
    success: true;
    error?: never;
    document?: T;
    id?: string;
    code?: never;
}
export interface ImportResponseFail<T extends DocumentSchema = DocumentSchema> {
    success: false;
    error: string;
    document?: T;
    id?: string;
    code: number;
}
export type ImportResponse<T extends DocumentSchema = DocumentSchema> = ImportResponseSuccess<T> | ImportResponseFail<T>;
export type DocumentSchema = Record<string, any>;
export interface SearchParamsWithPreset<T extends DocumentSchema, Infix extends string> extends Partial<SearchParams<T, Infix>> {
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
    geo_distance_meters?: {
        location: number;
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
    sampled: boolean;
    stats: {
        avg?: number;
        max?: number;
        min?: number;
        sum?: number;
        total_values?: number;
    };
}
interface LLMResponse {
    content: string;
    extraction_method: string;
    model: string;
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
    parsed_nl_query?: {
        parse_time_ms: number;
        generated_params: SearchParams<T>;
        augmented_params: SearchParams<T>;
        llm_response?: LLMResponse;
    };
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
    metadata?: JsonRecord;
}
type JSONPrimitive = string | number | boolean | null;
type JsonRecord = {
    [key: string]: JSONPrimitive | JSONPrimitive[] | JsonRecord;
};
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
    throwOnFail?: boolean;
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
    /**
     * Index a single document. The document must conform to the schema of the collection.
     *
     * @example
     * await client.collections("products").documents().create({ id: "1", title: "Hat" })
     *
     * @see https://typesense.org/docs/latest/api/documents.html#index-a-single-document
     */
    create(document: T, options?: Omit<DocumentWriteParameters, "action">): Promise<T>;
    /**
     * Upsert a single document. Creates the document if it does not exist, otherwise updates it.
     *
     * @example
     * await client.collections("products").documents().upsert({ id: "1", title: "Hat" })
     *
     * @see https://typesense.org/docs/latest/api/documents.html#upsert
     */
    upsert(document: T, options?: Omit<DocumentWriteParameters, "action">): Promise<T>;
    /**
     * Update documents matching a `filter_by` condition, or update a single document with `action: "update"` semantics.
     *
     * @example
     * await client.collections("products").documents().update({ in_stock: true }, { filter_by: "category:=hats" })
     * @example
     * await client.collections("products").documents().update({ id: "1", title: "Hat" })
     *
     * @see https://typesense.org/docs/latest/api/documents.html#update-documents-with-conditional-query
     */
    update(document: T, options: UpdateByFilterParameters): Promise<UpdateByFilterResponse>;
    /**
     * Update a single document by merging the provided fields.
     *
     * @example
     * await client.collections("products").documents().update({ id: "1", title: "Hat" })
     *
     * @see https://typesense.org/docs/latest/api/documents.html#update-a-document
     */
    update(document: T, options: Omit<DocumentWriteParameters, "action">): Promise<T>;
    /**
     * Emplace documents — insert new documents or update existing ones, optionally by `filter_by`.
     *
     * @example
     * await client.collections("products").documents().emplace({ id: "1", title: "Hat" })
     * @example
     * await client.collections("products").documents().emplace({ in_stock: true }, { filter_by: "category:=hats" })
     *
     * @see https://typesense.org/docs/latest/api/documents.html#index-multiple-documents
     */
    emplace(document: T, options: UpdateByFilterParameters): Promise<UpdateByFilterResponse>;
    /**
     * Emplace a single document — inserts if it does not exist, otherwise merges the provided fields.
     *
     * @example
     * await client.collections("products").documents().emplace({ id: "1", title: "Hat" })
     *
     * @see https://typesense.org/docs/latest/api/documents.html#index-multiple-documents
     */
    emplace(document: T, options: Omit<DocumentWriteParameters, "action">): Promise<T>;
    /**
     * Delete a bunch of documents that match a specific filter condition, or truncate the collection.
     *
     * @example
     * await client.collections("products").documents().delete({ filter_by: "in_stock:=false" })
     * @example
     * await client.collections("products").documents().delete({ truncate: true })
     *
     * @see https://typesense.org/docs/latest/api/documents.html#delete-by-query
     */
    delete(query?: DeleteQuery): Promise<DeleteResponse<T>>;
    /**
     * @deprecated Use `import` instead, which accepts both an array of documents or a JSONL string.
     */
    createMany(documents: T[], options?: DocumentImportParameters): Promise<ImportResponse<T>[]>;
    /**
     * Import documents into a collection. Accepts a JSONL string or an array of document objects.
     *
     * @example
     * await client.collections("products").documents().import([{ id: "1", title: "Hat" }, { id: "2", title: "Shirt" }])
     * @example
     * await client.collections("products").documents().import(jsonlString)
     *
     * @see https://typesense.org/docs/latest/api/documents.html#index-multiple-documents
     */
    import(documents: string, options?: DocumentImportParameters): Promise<string>;
    /**
     * Import documents into a collection from an array of objects. Returns one result per document.
     *
     * @example
     * await client.collections("products").documents().import([{ id: "1", title: "Hat" }])
     *
     * @see https://typesense.org/docs/latest/api/documents.html#index-multiple-documents
     */
    import(documents: T[], options?: DocumentImportParameters): Promise<ImportResponse<T>[]>;
    /**
     * Imports documents from a NodeJS readable stream of JSONL.
     *
     * @example
     * await client.collections("products").documents().importStream(fs.createReadStream("products.jsonl"))
     *
     * @see https://typesense.org/docs/latest/api/documents.html#index-multiple-documents
     */
    importStream(readableStream: ReadStream, options?: DocumentImportParameters): Promise<ImportResponse<T>[]>;
    /**
     * Export all documents in a collection as a JSONL string.
     *
     * @example
     * await client.collections("products").documents().export()
     *
     * @see https://typesense.org/docs/latest/api/documents.html#export-documents
     */
    export(options?: DocumentsExportParameters): Promise<string>;
    /**
     * Export all documents in a collection as a NodeJS readable stream of JSONL.
     *
     * @example
     * await client.collections("products").documents().exportStream()
     *
     * @see https://typesense.org/docs/latest/api/documents.html#export-documents
     */
    exportStream(options?: DocumentsExportParameters): Promise<ReadStream>;
}
/**
 * @deprecated Import from './Types' instead
 */
export type { SearchParams, WriteableDocuments, SearchableDocuments, DropTokensMode, OperationMode, UnionArrayKeys, UnionArraySearchParams, ArraybleParams, ExtractBaseTypes, SearchResponseRequestParams, } from "./Types";
