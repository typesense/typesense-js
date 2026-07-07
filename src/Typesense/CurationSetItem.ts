import ApiCall from "./ApiCall";
import CurationSets from "./CurationSets";
import type { CurationObjectSchema } from "./CurationSets";

export type CurationItemUpsertSchema = Omit<CurationObjectSchema, "id">;

export interface CurationItemDeleteResponseSchema {
  id: string;
}

export default class CurationSetItem {
  constructor(
    private name: string,
    private itemId: string,
    private apiCall: ApiCall,
  ) {}

  /**
   * Retrieve a specific curation item by its id
   *
   * @example
   * await client.curationSets("my-set").items("promote-hat").retrieve()
   *
   * @see https://typesense.org/docs/latest/api/curation.html
   */
  async retrieve(): Promise<CurationObjectSchema> {
    return this.apiCall.get<CurationObjectSchema>(this.endpointPath());
  }

  /**
   * Create or update a curation set item with the given id
   *
   * @example
   * await client.curationSets("my-set").items("promote-hat").upsert({ rule: { query: "hat", match: "exact" }, includes: [] })
   *
   * @see https://typesense.org/docs/latest/api/curation.html
   */
  async upsert(
    params: CurationItemUpsertSchema,
  ): Promise<CurationObjectSchema> {
    return this.apiCall.put<CurationObjectSchema>(this.endpointPath(), params);
  }

  /**
   * Delete a specific curation item by its id
   *
   * @example
   * await client.curationSets("my-set").items("promote-hat").delete()
   *
   * @see https://typesense.org/docs/latest/api/curation.html
   */
  async delete(): Promise<CurationItemDeleteResponseSchema> {
    return this.apiCall.delete<CurationItemDeleteResponseSchema>(
      this.endpointPath(),
    );
  }

  private endpointPath(): string {
    return `${CurationSets.RESOURCEPATH}/${encodeURIComponent(
      this.name,
    )}/items/${encodeURIComponent(this.itemId)}`;
  }
}
