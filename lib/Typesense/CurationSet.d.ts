import ApiCall from "./ApiCall";
import type { CurationSetDeleteResponseSchema, CurationSetSchema, CurationSetUpsertSchema } from "./CurationSets";
import CurationSetItems from "./CurationSetItems";
import CurationSetItem from "./CurationSetItem";
export default class CurationSet {
    private name;
    private apiCall;
    private readonly _items;
    private individualItems;
    constructor(name: string, apiCall: ApiCall);
    /**
     * Create or update a curation set with the given name
     *
     * @example
     * await client.curationSets("my-set").upsert({ items: [{ id: "promote-hat", rule: { query: "hat", match: "exact" } }] })
     *
     * @see https://typesense.org/docs/latest/api/curation.html
     */
    upsert(params: CurationSetUpsertSchema): Promise<CurationSetSchema>;
    /**
     * Retrieve a specific curation set by its name
     *
     * @example
     * await client.curationSets("my-set").retrieve()
     *
     * @see https://typesense.org/docs/latest/api/curation.html
     */
    retrieve(): Promise<CurationSetSchema>;
    /**
     * Delete a specific curation set by its name
     *
     * @example
     * await client.curationSets("my-set").delete()
     *
     * @see https://typesense.org/docs/latest/api/curation.html
     */
    delete(): Promise<CurationSetDeleteResponseSchema>;
    /**
     * Access the items in this curation set. Call without arguments to list items, or pass an item ID to access a single item.
     *
     * @example
     * await client.curationSets("my-set").items().retrieve()
     * @example
     * await client.curationSets("my-set").items("promote-hat").retrieve()
     *
     * @see https://typesense.org/docs/latest/api/curation.html
     */
    items(): CurationSetItems;
    /**
     * Access an individual curation item by ID within this curation set.
     *
     * @example
     * await client.curationSets("my-set").items("promote-hat").retrieve()
     *
     * @see https://typesense.org/docs/latest/api/curation.html
     */
    items(itemId: string): CurationSetItem;
    private endpointPath;
}
