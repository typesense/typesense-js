import ApiCall from "./ApiCall";
export interface SynonymItemSchema {
    id: string;
    synonyms: string[];
    root?: string;
    locale?: string;
    symbols_to_index?: string[];
}
export interface SynonymSetCreateSchema {
    items: SynonymItemSchema[];
}
export interface SynonymSetSchema extends SynonymSetCreateSchema {
    name: string;
}
export interface SynonymSetsRetrieveSchema {
    synonym_sets: SynonymSetSchema[];
}
export default class SynonymSets {
    private apiCall;
    constructor(apiCall: ApiCall);
    static readonly RESOURCEPATH = "/synonym_sets";
    /**
     * Retrieve all synonym sets
     *
     * @example
     * await client.synonymSets().retrieve()
     *
     * @see https://typesense.org/docs/latest/api/synonyms.html
     */
    retrieve(): Promise<SynonymSetSchema[]>;
}
