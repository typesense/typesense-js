import type { DocumentSchema } from "./Documents";
import ApiCall from "./ApiCall";
import type { SearchableDocuments } from "./Types";
export declare class SearchOnlyCollection<T extends DocumentSchema> {
    private readonly name;
    private readonly apiCall;
    private readonly configuration;
    private readonly _documents;
    constructor(name: string, apiCall: ApiCall, configuration: any);
    /**
     * Access the search-only documents resource for this collection.
     *
     * @example
     * await searchClient.collections("products").documents().search({ q: "*", query_by: "title" })
     *
     * @see https://typesense.org/docs/latest/api/search.html
     */
    documents(): SearchableDocuments<T>;
}
