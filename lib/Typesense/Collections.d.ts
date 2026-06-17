import ApiCall from "./ApiCall";
import type { CollectionFieldSchema, CollectionSchema } from "./Collection";
export interface BaseCollectionCreateSchema {
    name: string;
    default_sorting_field?: string;
    symbols_to_index?: string[];
    token_separators?: string[];
    enable_nested_fields?: boolean;
    metadata?: object;
    voice_query_model?: {
        model_name?: string;
    };
    synonym_sets?: string[];
    curation_sets?: string[];
}
interface CollectionCreateSchemaWithSrc extends Pick<BaseCollectionCreateSchema, "name"> {
    fields?: CollectionFieldSchema[];
}
interface CollectionCreateSchemaWithoutSrc extends BaseCollectionCreateSchema {
    fields: CollectionFieldSchema[];
}
/**
 * Defines the schema for creating a collection in Typesense.
 *
 * If the `src_name` property in `Options` is a string, the `fields` prop is optional, and only used for embedding fields.
 * Otherwise, `fields` will be required.
 */
export type CollectionCreateSchema<Options extends CollectionCreateOptions = CollectionCreateOptions> = Options["src_name"] extends string ? CollectionCreateSchemaWithSrc : CollectionCreateSchemaWithoutSrc;
export interface CollectionCreateOptions {
    src_name?: string;
}
export interface CollectionsRetrieveOptions {
    exclude_fields?: string;
}
export default class Collections {
    private apiCall;
    constructor(apiCall: ApiCall);
    /**
     * When a collection is created, we give it a name and describe the fields that will be indexed from the documents added to the collection.
     *
     * @example
     * await client.collections().create({ name: "products", fields: [{ name: "title", type: "string" }] })
     *
     * @see https://typesense.org/docs/latest/api/collections.html#create-a-collection
     */
    create<const Options extends CollectionCreateOptions>(schema: CollectionCreateSchema<Options>, options?: Options): Promise<CollectionSchema>;
    /**
     * Returns a summary of all your collections. The collections are returned sorted by creation date, with the most recent collections appearing first.
     *
     * @example
     * await client.collections().retrieve()
     *
     * @see https://typesense.org/docs/latest/api/collections.html#list-all-collections
     */
    retrieve(options?: CollectionsRetrieveOptions): Promise<CollectionSchema[]>;
    static get RESOURCEPATH(): string;
}
export {};
