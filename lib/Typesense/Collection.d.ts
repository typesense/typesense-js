import ApiCall from "./ApiCall";
import { CollectionCreateSchema } from "./Collections";
import Documents, { DocumentSchema } from "./Documents";
import Overrides from "./Overrides";
import Override from "./Override";
import Synonyms from "./Synonyms";
import Synonym from "./Synonym";
import { Document } from "./Document";
export declare type FieldType = "string" | "int32" | "int64" | "float" | "bool" | "geopoint" | "geopoint[]" | "string[]" | "int32[]" | "int64[]" | "float[]" | "bool[]" | "object" | "object[]" | "auto" | "string*";
export interface CollectionFieldSchema {
    name: string;
    type: FieldType;
    optional?: boolean;
    facet?: boolean;
    index?: boolean;
    sort?: boolean;
    locale?: string;
    infix?: boolean;
    num_dim?: number;
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
    delete(): Promise<CollectionSchema>;
    exists(): Promise<boolean>;
    documents(): Documents<T>;
    documents(documentId: string): Document<T>;
    overrides(): Overrides;
    overrides(overrideId: string): Override;
    synonyms(): Synonyms;
    synonyms(synonymId: string): Synonym;
    private endpointPath;
}
