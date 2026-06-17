import { ConfigurationOptions } from "./Configuration";
import MultiSearch from "./MultiSearch";
import { DocumentSchema } from "./Documents";
import { SearchOnlyCollection } from "./SearchOnlyCollection";
/**
 * Search-only Typesense client. Restricted to search operations and intended for use with search-only API keys in browser environments.
 *
 * @see https://typesense.org/docs/latest/api/
 */
export default class SearchClient {
    /**
     * Send multiple search requests in a single HTTP request.
     *
     * @example
     * await searchClient.multiSearch.perform({ searches: [{ collection: "products", q: "*" }] })
     *
     * @see https://typesense.org/docs/latest/api/documents.html#federated-multi-search
     */
    readonly multiSearch: MultiSearch;
    private readonly configuration;
    private readonly apiCall;
    private readonly individualCollections;
    constructor(options: ConfigurationOptions);
    clearCache(): void;
    /**
     * Access a search-only collection by name.
     *
     * @example
     * await searchClient.collections("products").documents().search({ q: "*", query_by: "title" })
     *
     * @see https://typesense.org/docs/latest/api/search.html
     */
    collections<TDocumentSchema extends DocumentSchema>(collectionName: string): SearchOnlyCollection<TDocumentSchema>;
}
