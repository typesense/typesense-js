import ApiCall from "./ApiCall";
import { KeyCreateSchema, KeySchema } from "./Key";
import type { DocumentSchema, SearchParams } from "./Documents";
export interface KeysRetrieveSchema {
    keys: KeySchema[];
}
export interface GenerateScopedSearchKeyParams<T extends DocumentSchema, Infix extends string> extends Partial<SearchParams<T, Infix>> {
    expires_at?: number;
    cache_ttl?: number;
    limit_multi_searches?: number;
}
export default class Keys {
    private apiCall;
    constructor(apiCall: ApiCall);
    /**
     * Create an API Key with fine-grain access control. You can restrict access on both a per-collection and per-action level. The generated key is returned only during creation. You want to store this key carefully in a secure place.
     *
     * @example
     * await client.keys().create({ description: "Search-only key", actions: ["documents:search"], collections: ["*"] })
     *
     * @see https://typesense.org/docs/latest/api/api-keys.html#create-an-api-key
     */
    create(params: KeyCreateSchema): Promise<KeySchema>;
    /**
     * Retrieve (metadata about) all keys.
     *
     * @example
     * await client.keys().retrieve()
     *
     * @see https://typesense.org/docs/latest/api/api-keys.html#list-all-keys
     */
    retrieve(): Promise<KeysRetrieveSchema>;
    /**
     * Generate a scoped search-only API key with embedded parameters such as `filter_by` or `expires_at`.
     *
     * @example
     * client.keys().generateScopedSearchKey("search-only-key", { filter_by: "company_id:124", expires_at: 1700000000 })
     *
     * @see https://typesense.org/docs/latest/api/api-keys.html#generate-scoped-search-key
     */
    generateScopedSearchKey<T extends DocumentSchema, const Infix extends string>(searchKey: string, parameters: GenerateScopedSearchKeyParams<T, Infix>): string;
    static get RESOURCEPATH(): string;
}
