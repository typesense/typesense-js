import ApiCall from "./ApiCall";
import CurationSets from "./CurationSets";
import type {
  CurationSetDeleteResponseSchema,
  CurationSetSchema,
  CurationSetUpsertSchema,
} from "./CurationSets";
import CurationSetItems from "./CurationSetItems";
import CurationSetItem from "./CurationSetItem";

export default class CurationSet {
  private readonly _items: CurationSetItems;
  private individualItems: Record<string, CurationSetItem> = {};

  constructor(
    private name: string,
    private apiCall: ApiCall,
  ) {
    this._items = new CurationSetItems(this.name, apiCall);
  }

  /**
   * Create or update a curation set with the given name
   *
   * @example
   * await client.curationSets("my-set").upsert({ items: [{ id: "promote-hat", rule: { query: "hat", match: "exact" } }] })
   *
   * @see https://typesense.org/docs/latest/api/curation.html
   */
  async upsert(params: CurationSetUpsertSchema): Promise<CurationSetSchema> {
    return this.apiCall.put<CurationSetSchema>(this.endpointPath(), params);
  }

  /**
   * Retrieve a specific curation set by its name
   *
   * @example
   * await client.curationSets("my-set").retrieve()
   *
   * @see https://typesense.org/docs/latest/api/curation.html
   */
  async retrieve(): Promise<CurationSetSchema> {
    return this.apiCall.get<CurationSetSchema>(this.endpointPath());
  }

  /**
   * Delete a specific curation set by its name
   *
   * @example
   * await client.curationSets("my-set").delete()
   *
   * @see https://typesense.org/docs/latest/api/curation.html
   */
  async delete(): Promise<CurationSetDeleteResponseSchema> {
    return this.apiCall.delete<CurationSetDeleteResponseSchema>(
      this.endpointPath(),
    );
  }

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
  items(itemId?: string): CurationSetItems | CurationSetItem {
    if (itemId === undefined) {
      return this._items;
    } else {
      if (this.individualItems[itemId] === undefined) {
        this.individualItems[itemId] = new CurationSetItem(
          this.name,
          itemId,
          this.apiCall,
        );
      }
      return this.individualItems[itemId];
    }
  }

  private endpointPath(): string {
    return `${CurationSets.RESOURCEPATH}/${encodeURIComponent(this.name)}`;
  }
}
