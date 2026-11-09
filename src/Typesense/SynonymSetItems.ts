import ApiCall from "./ApiCall";
import SynonymSets, { SynonymItemSchema } from "./SynonymSets";
import type { SynonymItemUpsertSchema } from "./SynonymSetItem";

export default class SynonymSetItems {
  constructor(
    private synonymSetName: string,
    private apiCall: ApiCall,
  ) {}

  async upsert(
    itemId: string,
    params: SynonymItemUpsertSchema,
  ): Promise<SynonymItemSchema> {
    return this.apiCall.put<SynonymItemSchema>(
      this.endpointPath(itemId),
      params,
    );
  }

  async retrieve(): Promise<SynonymItemSchema[]> {
    return this.apiCall.get<SynonymItemSchema[]>(this.endpointPath());
  }

  private endpointPath(operation?: string): string {
    return `${SynonymSets.RESOURCEPATH}/${encodeURIComponent(this.synonymSetName)}/items${
      operation === undefined ? "" : "/" + encodeURIComponent(operation)
    }`;
  }
}


