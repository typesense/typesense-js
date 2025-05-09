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
export interface CollectionSchema extends CollectionCreateSchema {
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
    retrieve(): Promise<CollectionSchema>;
    update(schema: CollectionUpdateSchema): Promise<CollectionSchema>;
    delete(options?: CollectionDeleteOptions): Promise<CollectionSchema>;
    exists(): Promise<boolean>;
    documents(): Documents<T>;
    documents(documentId: string): Document<T>;
    overrides(): Overrides;
    overrides(overrideId: string): Override;
    synonyms(): Synonyms;
    synonyms(synonymId: string): Synonym;
    private endpointPath;
}
