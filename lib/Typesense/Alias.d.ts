import { CollectionAliasSchema } from "./Aliases";
import ApiCall from "./ApiCall";
export default class Alias {
    private name;
    private apiCall;
    constructor(name: string, apiCall: ApiCall);
    /**
     * Find out which collection an alias points to by fetching it
     *
     * @example
     * await client.aliases("my-alias").retrieve()
     *
     * @see https://typesense.org/docs/latest/api/collection-alias.html#retrieve-an-alias
     */
    retrieve(): Promise<CollectionAliasSchema>;
    /**
     * Delete an alias
     *
     * @example
     * await client.aliases("my-alias").delete()
     *
     * @see https://typesense.org/docs/latest/api/collection-alias.html#delete-an-alias
     */
    delete(): Promise<CollectionAliasSchema>;
    private endpointPath;
}
