import ApiCall from "./ApiCall";
import SynonymSets, { SynonymItemSchema } from "./SynonymSets";

export default class SynonymSetItems {
  constructor(
    private synonymSetName: string,
    private apiCall: ApiCall,
  ) {}

  async upsert(
    itemId: string,
    params: Omit<SynonymItemSchema, "id">,
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


