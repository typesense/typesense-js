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

  async upsert(
    params: SynonymSetCreateSchema,
  ): Promise<SynonymSetCreateSchema> {
    return this.apiCall.put<SynonymSetSchema>(this.endpointPath(), params);
  }

  async retrieve(): Promise<SynonymSetRetrieveSchema> {
    return this.apiCall.get<SynonymSetRetrieveSchema>(this.endpointPath());
  }

  async delete(): Promise<SynonymSetDeleteSchema> {
    return this.apiCall.delete<SynonymSetDeleteSchema>(this.endpointPath());
  }

  items(): SynonymSetItems;
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
