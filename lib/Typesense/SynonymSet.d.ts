import ApiCall from "./ApiCall";
import type { SynonymSetCreateSchema } from "./SynonymSets";
import SynonymSetItems from "./SynonymSetItems";
import SynonymSetItem from "./SynonymSetItem";
export interface SynonymSetDeleteSchema {
    name: string;
}
export type SynonymSetRetrieveSchema = SynonymSetCreateSchema;
export default class SynonymSet {
    private synonymSetName;
    private apiCall;
    private readonly _items;
    private individualItems;
    constructor(synonymSetName: string, apiCall: ApiCall);
    /**
     * Create or update a synonym set with the given name
     *
     * @example
     * await client.synonymSets("my-set").upsert({ items: [{ id: "syn-1", synonyms: ["nyc", "new york"] }] })
     *
     * @see https://typesense.org/docs/latest/api/synonyms.html
     */
    upsert(params: SynonymSetCreateSchema): Promise<SynonymSetCreateSchema>;
    /**
     * Retrieve a specific synonym set by its name
     *
     * @example
     * await client.synonymSets("my-set").retrieve()
     *
     * @see https://typesense.org/docs/latest/api/synonyms.html
     */
    retrieve(): Promise<SynonymSetRetrieveSchema>;
    /**
     * Delete a specific synonym set by its name
     *
     * @example
     * await client.synonymSets("my-set").delete()
     *
     * @see https://typesense.org/docs/latest/api/synonyms.html
     */
    delete(): Promise<SynonymSetDeleteSchema>;
    /**
     * Access the items in this synonym set. Call without arguments to list or upsert items, or pass an item ID to access a single item.
     *
     * @example
     * await client.synonymSets("my-set").items().retrieve()
     * @example
     * await client.synonymSets("my-set").items("syn-1").retrieve()
     *
     * @see https://typesense.org/docs/latest/api/synonyms.html
     */
    items(): SynonymSetItems;
    /**
     * Access an individual synonym item by ID within this synonym set.
     *
     * @example
     * await client.synonymSets("my-set").items("syn-1").retrieve()
     *
     * @see https://typesense.org/docs/latest/api/synonyms.html
     */
    items(itemId: string): SynonymSetItem;
    private endpointPath;
}
