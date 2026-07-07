import ApiCall from "./ApiCall";
import { SynonymCreateSchema } from "./Synonyms";
export interface SynonymSchema extends SynonymCreateSchema {
    id: string;
}
export interface SynonymDeleteSchema {
    id: string;
}
/**
 * @deprecated Deprecated starting with Typesense Server v30. Please migrate to `client.synonymSets` (new Synonym Sets APIs).
 */
export default class Synonym {
    private collectionName;
    private synonymId;
    private apiCall;
    private static hasWarnedDeprecation;
    constructor(collectionName: string, synonymId: string, apiCall: ApiCall);
    /**
     * Retrieve a synonym (legacy v1) by ID on this collection.
     *
     * @example
     * await client.collections("products").synonyms("syn-1").retrieve()
     *
     * @see https://typesense.org/docs/29.0/api/synonyms.html
     */
    retrieve(): Promise<SynonymSchema>;
    /**
     * Delete a synonym (legacy v1) by ID on this collection.
     *
     * @example
     * await client.collections("products").synonyms("syn-1").delete()
     *
     * @see https://typesense.org/docs/29.0/api/synonyms.html
     */
    delete(): Promise<SynonymDeleteSchema>;
    private endpointPath;
}
