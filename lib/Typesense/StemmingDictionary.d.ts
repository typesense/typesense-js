import ApiCall from "./ApiCall";
export interface StemmingDictionaryCreateSchema {
    root: string;
    word: string;
}
export interface StemmingDictionarySchema {
    id: string;
    words: StemmingDictionaryCreateSchema[];
}
export interface StemmingDictionaryDeleteSchema {
    id: string;
}
export default class StemmingDictionary {
    private id;
    private apiCall;
    constructor(id: string, apiCall: ApiCall);
    /**
     * Fetch details of a specific stemming dictionary.
     *
     * @example
     * await client.stemming.dictionaries("en").retrieve()
     *
     * @see https://typesense.org/docs/latest/api/stemming.html
     */
    retrieve(): Promise<StemmingDictionarySchema>;
    /**
     * Delete a stemming dictionary by ID.
     *
     * @example
     * await client.stemming.dictionaries("en").delete()
     *
     * @see https://typesense.org/docs/latest/api/stemming.html
     */
    delete(): Promise<StemmingDictionaryDeleteSchema>;
    private endpointPath;
}
