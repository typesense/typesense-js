import ApiCall from "./ApiCall";
import { CollectionFieldSchema, CollectionSchema } from "./Collection";
export interface CollectionCreateSchema {
    name: string;
    default_sorting_field?: string;
    fields?: CollectionFieldSchema[];
    symbols_to_index?: string[];
    token_separators?: string[];
    enable_nested_fields?: boolean;
    metadata?: object;
    voice_query_model?: {
        model_name?: string;
    };
}
export interface CollectionCreateOptions {
    src_name?: string;
}
export interface CollectionsRetrieveOptions {
    exclude_fields?: string;
}
export default class Collections {
    private apiCall;
    constructor(apiCall: ApiCall);
    create(schema: CollectionCreateSchema, options?: CollectionCreateOptions): Promise<CollectionSchema>;
    retrieve(options?: CollectionsRetrieveOptions): Promise<CollectionSchema[]>;
    static get RESOURCEPATH(): string;
}
