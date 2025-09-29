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

  constructor(private name: string, private apiCall: ApiCall) {
    this._items = new CurationSetItems(this.name, apiCall);
  }

  async upsert(params: CurationSetUpsertSchema): Promise<CurationSetSchema> {
    return this.apiCall.put<CurationSetSchema>(this.endpointPath(), params);
  }

  async retrieve(): Promise<CurationSetSchema> {
    return this.apiCall.get<CurationSetSchema>(this.endpointPath());
  }

  async delete(): Promise<CurationSetDeleteResponseSchema> {
    return this.apiCall.delete<CurationSetDeleteResponseSchema>(
      this.endpointPath(),
    );
  }

  items(): CurationSetItems;
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


