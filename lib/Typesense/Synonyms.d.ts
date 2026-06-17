import ApiCall from "./ApiCall";
import { SynonymSchema } from "./Synonym";
export interface SynonymCreateSchema {
    synonyms: string[];
    root?: string;
    locale?: string;
    symbols_to_index?: string[];
}
export interface SynonymsRetrieveSchema {
    synonyms: SynonymSchema[];
}
/**
 * @deprecated Deprecated starting with Typesense Server v30. Please migrate to `client.synonymSets` (new Synonym Sets APIs).
 */
export default class Synonyms {
    private collectionName;
    private apiCall;
    private static hasWarnedDeprecation;
    constructor(collectionName: string, apiCall: ApiCall);
    /**
     * Create or update a synonym (legacy v1) on this collection.
     *
     * @example
     * await client.collections("products").synonyms().upsert("syn-1", { synonyms: ["nyc", "new york"] })
     *
     * @see https://typesense.org/docs/29.0/api/synonyms.html
     */
    upsert(synonymId: string, params: SynonymCreateSchema): Promise<SynonymSchema>;
    /**
     * Retrieve all synonyms (legacy v1) on this collection.
     *
     * @example
     * await client.collections("products").synonyms().retrieve()
     *
     * @see https://typesense.org/docs/29.0/api/synonyms.html
     */
    retrieve(): Promise<SynonymsRetrieveSchema>;
    private endpointPath;
    static get RESOURCEPATH(): string;
}
