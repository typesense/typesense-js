import ApiCall from "./ApiCall";
import SynonymSets, { SynonymItemSchema } from "./SynonymSets";

export default class SynonymSetItems {
  constructor(
    private synonymSetName: string,
    private apiCall: ApiCall,
  ) {}

  /**
   * Create or update a synonym set item with the given id
   *
   * @example
   * await client.synonymSets("my-set").items().upsert("syn-1", { synonyms: ["nyc", "new york"] })
   *
   * @see https://typesense.org/docs/latest/api/synonyms.html
   */
  async upsert(
    itemId: string,
    params: Omit<SynonymItemSchema, "id">,
  ): Promise<SynonymItemSchema> {
    return this.apiCall.put<SynonymItemSchema>(
      this.endpointPath(itemId),
      params,
    );
  }

  /**
   * Retrieve all synonym items in a set
   *
   * @example
   * await client.synonymSets("my-set").items().retrieve()
   *
   * @see https://typesense.org/docs/latest/api/synonyms.html
   */
  async retrieve(): Promise<SynonymItemSchema[]> {
    return this.apiCall.get<SynonymItemSchema[]>(this.endpointPath());
  }

  private endpointPath(operation?: string): string {
    return `${SynonymSets.RESOURCEPATH}/${encodeURIComponent(this.synonymSetName)}/items${
      operation === undefined ? "" : "/" + encodeURIComponent(operation)
    }`;
  }
}


