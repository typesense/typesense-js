import ApiCall from "./ApiCall";
export interface CollectionAliasCreateSchema {
    collection_name: string;
}
export interface CollectionAliasSchema extends CollectionAliasCreateSchema {
    name: string;
}
export interface CollectionAliasesResponseSchema {
    aliases: CollectionAliasSchema[];
}
export default class Aliases {
    private apiCall;
    constructor(apiCall: ApiCall);
    /**
     * Create or update a collection alias.
     *
     * @example
     * await client.aliases().upsert("my-alias", { collection_name: "products" })
     *
     * @see https://typesense.org/docs/latest/api/collection-alias.html#create-or-update-an-alias
     */
    upsert(name: string, mapping: CollectionAliasCreateSchema): Promise<CollectionAliasSchema>;
    /**
     * List all aliases and the corresponding collections that they map to.
     *
     * @example
     * await client.aliases().retrieve()
     *
     * @see https://typesense.org/docs/latest/api/collection-alias.html#list-all-aliases
     */
    retrieve(): Promise<CollectionAliasesResponseSchema>;
    private endpointPath;
    static get RESOURCEPATH(): string;
}
