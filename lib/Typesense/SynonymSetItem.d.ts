import ApiCall from "./ApiCall";
import { SynonymItemSchema } from "./SynonymSets";
export interface SynonymSetItemDeleteSchema {
    id: string;
}
export default class SynonymSetItem {
    private synonymSetName;
    private itemId;
    private apiCall;
    constructor(synonymSetName: string, itemId: string, apiCall: ApiCall);
    /**
     * Retrieve a specific synonym item by its id
     *
     * @example
     * await client.synonymSets("my-set").items("syn-1").retrieve()
     *
     * @see https://typesense.org/docs/latest/api/synonyms.html
     */
    retrieve(): Promise<SynonymItemSchema>;
    /**
     * Delete a specific synonym item by its id
     *
     * @example
     * await client.synonymSets("my-set").items("syn-1").delete()
     *
     * @see https://typesense.org/docs/latest/api/synonyms.html
     */
    delete(): Promise<SynonymSetItemDeleteSchema>;
    private endpointPath;
}
