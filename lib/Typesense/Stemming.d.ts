import type ApiCall from "./ApiCall";
import StemmingDictionaries from "./StemmingDictionaries";
import StemmingDictionary from "./StemmingDictionary";
export default class Stemming {
    private readonly apiCall;
    private readonly _stemmingDictionaries;
    private readonly individualStemmingDictionaries;
    constructor(apiCall: ApiCall);
    /**
     * Access the stemming dictionaries resource. Call without arguments to list or import dictionaries, or pass an ID to access a single dictionary.
     *
     * @example
     * await client.stemming.dictionaries().retrieve()
     * @example
     * await client.stemming.dictionaries("en").retrieve()
     *
     * @see https://typesense.org/docs/latest/api/stemming.html
     */
    dictionaries(): StemmingDictionaries;
    /**
     * Access an individual stemming dictionary by ID.
     *
     * @example
     * await client.stemming.dictionaries("en").retrieve()
     *
     * @see https://typesense.org/docs/latest/api/stemming.html
     */
    dictionaries(id: string): StemmingDictionary;
    static get RESOURCEPATH(): string;
}
