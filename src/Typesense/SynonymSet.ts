import ApiCall from "./ApiCall";
import SynonymSets from "./SynonymSets";
import type { SynonymSetCreateSchema, SynonymSetSchema } from "./SynonymSets";
import SynonymSetItems from "./SynonymSetItems";
import SynonymSetItem from "./SynonymSetItem";

export interface SynonymSetDeleteSchema {
  name: string;
}

export type SynonymSetRetrieveSchema = SynonymSetCreateSchema;

export default class SynonymSet {
  private readonly _items: SynonymSetItems;
  private individualItems: Record<string, SynonymSetItem> = {};
  constructor(
    private synonymSetName: string,
    private apiCall: ApiCall,
  ) {
    this._items = new SynonymSetItems(this.synonymSetName, apiCall);
  }

  /**
   * Create or update a synonym set with the given name
   *
   * @example
   * await client.synonymSets("my-set").upsert({ items: [{ id: "syn-1", synonyms: ["nyc", "new york"] }] })
   *
   * @see https://typesense.org/docs/latest/api/synonyms.html
   */
  async upsert(
    params: SynonymSetCreateSchema,
  ): Promise<SynonymSetCreateSchema> {
    return this.apiCall.put<SynonymSetSchema>(this.endpointPath(), params);
  }

  /**
   * Retrieve a specific synonym set by its name
   *
   * @example
   * await client.synonymSets("my-set").retrieve()
   *
   * @see https://typesense.org/docs/latest/api/synonyms.html
   */
  async retrieve(): Promise<SynonymSetRetrieveSchema> {
    return this.apiCall.get<SynonymSetRetrieveSchema>(this.endpointPath());
  }

  /**
   * Delete a specific synonym set by its name
   *
   * @example
   * await client.synonymSets("my-set").delete()
   *
   * @see https://typesense.org/docs/latest/api/synonyms.html
   */
  async delete(): Promise<SynonymSetDeleteSchema> {
    return this.apiCall.delete<SynonymSetDeleteSchema>(this.endpointPath());
  }

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
  items(itemId?: string): SynonymSetItems | SynonymSetItem {
    if (itemId === undefined) {
      return this._items;
    } else {
      if (this.individualItems[itemId] === undefined) {
        this.individualItems[itemId] = new SynonymSetItem(
          this.synonymSetName,
          itemId,
          this.apiCall,
        );
      }
      return this.individualItems[itemId];
    }
  }

  private endpointPath(): string {
    return `${SynonymSets.RESOURCEPATH}/${encodeURIComponent(this.synonymSetName)}`;
  }
}
