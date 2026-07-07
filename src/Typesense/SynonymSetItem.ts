import ApiCall from "./ApiCall";
import SynonymSets, { SynonymItemSchema } from "./SynonymSets";

export interface SynonymSetItemDeleteSchema {
  id: string;
}

export default class SynonymSetItem {
  constructor(
    private synonymSetName: string,
    private itemId: string,
    private apiCall: ApiCall,
  ) {}

  /**
   * Retrieve a specific synonym item by its id
   *
   * @example
   * await client.synonymSets("my-set").items("syn-1").retrieve()
   *
   * @see https://typesense.org/docs/latest/api/synonyms.html
   */
  async retrieve(): Promise<SynonymItemSchema> {
    return this.apiCall.get<SynonymItemSchema>(this.endpointPath());
  }

  /**
   * Delete a specific synonym item by its id
   *
   * @example
   * await client.synonymSets("my-set").items("syn-1").delete()
   *
   * @see https://typesense.org/docs/latest/api/synonyms.html
   */
  async delete(): Promise<SynonymSetItemDeleteSchema> {
    return this.apiCall.delete<SynonymSetItemDeleteSchema>(this.endpointPath());
  }

  private endpointPath(): string {
    return `${SynonymSets.RESOURCEPATH}/${encodeURIComponent(this.synonymSetName)}/items/${encodeURIComponent(this.itemId)}`;
  }
}


