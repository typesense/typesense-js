import ApiCall from "./ApiCall";
import { SynonymItemSchema } from "./SynonymSets";
export default class SynonymSetItems {
    private synonymSetName;
    private apiCall;
    constructor(synonymSetName: string, apiCall: ApiCall);
    /**
     * Create or update a synonym set item with the given id
     *
     * @example
     * await client.synonymSets("my-set").items().upsert("syn-1", { synonyms: ["nyc", "new york"] })
     *
     * @see https://typesense.org/docs/latest/api/synonyms.html
     */
    upsert(itemId: string, params: Omit<SynonymItemSchema, "id">): Promise<SynonymItemSchema>;
    /**
     * Retrieve all synonym items in a set
     *
     * @example
     * await client.synonymSets("my-set").items().retrieve()
     *
     * @see https://typesense.org/docs/latest/api/synonyms.html
     */
    retrieve(): Promise<SynonymItemSchema[]>;
    private endpointPath;
}
