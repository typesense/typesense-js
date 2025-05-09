import type { DocumentSchema } from "./Documents";
import ApiCall from "./ApiCall";
import type { SearchableDocuments } from "./Types";
export declare class SearchOnlyCollection<T extends DocumentSchema> {
    private readonly name;
    private readonly apiCall;
    private readonly configuration;
    private readonly _documents;
    constructor(name: string, apiCall: ApiCall, configuration: any);
    documents(): SearchableDocuments<T>;
}
