import ApiCall from "./ApiCall";
import type { StemmingDictionaryCreateSchema } from "./StemmingDictionary";
export interface StemmingDictionariesRetrieveSchema {
    dictionaries: string[];
}
export default class StemmingDictionaries {
    private readonly apiCall;
    constructor(apiCall: ApiCall);
    /**
     * Upload a JSONL file containing word mappings to create or update a stemming dictionary.
     *
     * @example
     * await client.stemming.dictionaries().upsert("irregular-plurals", [{ word: "people", root: "person" }])
     *
     * @see https://typesense.org/docs/latest/api/stemming.html
     */
    upsert(id: string, wordRootCombinations: StemmingDictionaryCreateSchema[] | string): Promise<StemmingDictionaryCreateSchema[] | string>;
    /**
     * Retrieve a list of all available stemming dictionaries.
     *
     * @example
     * await client.stemming.dictionaries().retrieve()
     *
     * @see https://typesense.org/docs/latest/api/stemming.html
     */
    retrieve(): Promise<StemmingDictionariesRetrieveSchema>;
    private endpointPath;
    static get RESOURCEPATH(): string;
}
