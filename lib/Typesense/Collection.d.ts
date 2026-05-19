import ApiCall from "./ApiCall";
import type { BaseCollectionCreateSchema, CollectionCreateSchema } from "./Collections";
import Documents, { DocumentSchema } from "./Documents";
import Overrides from "./Overrides";
import Override from "./Override";
import Synonyms from "./Synonyms";
import Synonym from "./Synonym";
import { Document } from "./Document";
export type FieldType = "string" | "int32" | "int64" | "float" | "bool" | "geopoint" | "geopolygon" | "geopoint[]" | "string[]" | "int32[]" | "int64[]" | "float[]" | "bool[]" | "object" | "object[]" | "auto" | "string*" | "image";
export interface CollectionFieldSchema extends Partial<Pick<BaseCollectionCreateSchema, "token_separators" | "symbols_to_index">> {
    name: string;
    type: FieldType;
    optional?: boolean;
    facet?: boolean;
    index?: boolean;
    sort?: boolean;
    locale?: string;
    infix?: boolean;
    stem?: boolean;
    num_dim?: number;
    store?: boolean;
    range_index?: boolean;
    [t: string]: unknown;
}
export interface CollectionSchema extends Required<CollectionCreateSchema> {
    created_at: number;
    num_documents: number;
    num_memory_shards: number;
}
export interface CollectionDropFieldSchema {
    name: string;
    drop: true;
}
export interface CollectionUpdateSchema extends Partial<Omit<CollectionCreateSchema, "name" | "fields">> {
    fields?: (CollectionFieldSchema | CollectionDropFieldSchema)[];
}
export interface CollectionDeleteOptions {
    compact_store?: boolean;
}
export default class Collection<T extends DocumentSchema = object> {
    private readonly name;
    private readonly apiCall;
    private readonly configuration;
    private readonly _documents;
    private individualDocuments;
    private readonly _overrides;
    private individualOverrides;
    private readonly _synonyms;
    private individualSynonyms;
    constructor(name: string, apiCall: ApiCall, configuration: any);
    /**
     * Retrieve the details of a collection, given its name.
     *
     * @example
     * await client.collections("products").retrieve()
     *
     * @see https://typesense.org/docs/latest/api/collections.html#retrieve-a-collection
     */
    retrieve(): Promise<CollectionSchema>;
    /**
     * Update a collection's schema to modify the fields and their types.
     *
     * @example
     * await client.collections("products").update({ fields: [{ name: "tags", type: "string[]" }] })
     *
     * @see https://typesense.org/docs/latest/api/collections.html#update-or-alter-a-collection
     */
    update(schema: CollectionUpdateSchema): Promise<CollectionSchema>;
    /**
     * Permanently drops a collection. This action cannot be undone. For large collections, this might have an impact on read latencies.
     *
     * @example
     * await client.collections("products").delete()
     *
     * @see https://typesense.org/docs/latest/api/collections.html#drop-a-collection
     */
    delete(options?: CollectionDeleteOptions): Promise<CollectionSchema>;
    /**
     * Check whether the collection exists.
     *
     * @example
     * await client.collections("products").exists()
     *
     * @see https://typesense.org/docs/latest/api/collections.html#retrieve-a-collection
     */
    exists(): Promise<boolean>;
    /**
     * Access the documents resource for this collection. Call without arguments to list, index, search, import, or export documents, or pass a document ID to access a single document.
     *
     * @example
     * await client.collections("products").documents().create({ id: "1", title: "Hat" })
     * @example
     * await client.collections("products").documents("1").retrieve()
     *
     * @see https://typesense.org/docs/latest/api/documents.html
     */
    documents(): Documents<T>;
    /**
     * Access an individual document by ID within this collection.
     *
     * @example
     * await client.collections("products").documents("1").retrieve()
     *
     * @see https://typesense.org/docs/latest/api/documents.html
     */
    documents(documentId: string): Document<T>;
    /**
     * Access the legacy overrides (curation) resource for this collection. Call without arguments to list or upsert overrides, or pass an ID to access a single override.
     *
     * @example
     * await client.collections("products").overrides().upsert("promote-hat", { rule: { query: "hat", match: "exact" }, includes: [] })
     * @example
     * await client.collections("products").overrides("promote-hat").retrieve()
     *
     * @see https://typesense.org/docs/latest/api/curation.html
     */
    overrides(): Overrides;
    /**
     * Access an individual override by ID within this collection.
     *
     * @example
     * await client.collections("products").overrides("promote-hat").retrieve()
     *
     * @see https://typesense.org/docs/latest/api/curation.html
     */
    overrides(overrideId: string): Override;
    /**
     * Access the legacy synonyms resource for this collection. Call without arguments to list or upsert synonyms, or pass an ID to access a single synonym.
     *
     * @example
     * await client.collections("products").synonyms().upsert("syn-1", { synonyms: ["nyc", "new york"] })
     * @example
     * await client.collections("products").synonyms("syn-1").retrieve()
     *
     * @see https://typesense.org/docs/latest/api/synonyms.html
     */
    synonyms(): Synonyms;
    /**
     * Access an individual synonym by ID within this collection.
     *
     * @example
     * await client.collections("products").synonyms("syn-1").retrieve()
     *
     * @see https://typesense.org/docs/latest/api/synonyms.html
     */
    synonyms(synonymId: string): Synonym;
    private endpointPath;
}
