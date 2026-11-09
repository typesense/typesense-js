import ApiCall from "./ApiCall";
import SynonymSets, { SynonymItemSchema } from "./SynonymSets";

export type SynonymItemUpsertSchema = Omit<SynonymItemSchema, "id">;

export interface SynonymSetItemDeleteSchema {
  id: string;
}

export default class SynonymSetItem {
  constructor(
    private synonymSetName: string,
    private itemId: string,
    private apiCall: ApiCall,
  ) {}

  async retrieve(): Promise<SynonymItemSchema> {
    return this.apiCall.get<SynonymItemSchema>(this.endpointPath());
  }

  async upsert(params: SynonymItemUpsertSchema): Promise<SynonymItemSchema> {
    return this.apiCall.put<SynonymItemSchema>(this.endpointPath(), params);
  }

  async delete(): Promise<SynonymSetItemDeleteSchema> {
    return this.apiCall.delete<SynonymSetItemDeleteSchema>(this.endpointPath());
  }

  private endpointPath(): string {
    return `${SynonymSets.RESOURCEPATH}/${encodeURIComponent(this.synonymSetName)}/items/${encodeURIComponent(this.itemId)}`;
  }
}


