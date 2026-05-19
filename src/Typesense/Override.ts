import ApiCall from "./ApiCall";
import Collections from "./Collections";
import Overrides, { OverrideCreateSchema } from "./Overrides";

export interface OverrideSchema extends OverrideCreateSchema {
  id: string;
}

export interface OverrideDeleteSchema {
  id: string;
}

export default class Override {
  constructor(
    private collectionName: string,
    private overrideId: string,
    private apiCall: ApiCall
  ) {}

  /**
   * Retrieve an override (curation rule) by ID on this collection.
   *
   * @example
   * await client.collections("products").overrides("promote-hat").retrieve()
   *
   * @see https://typesense.org/docs/latest/api/curation.html
   */
  async retrieve(): Promise<OverrideSchema> {
    return this.apiCall.get<OverrideSchema>(this.endpointPath());
  }

  /**
   * Delete an override (curation rule) by ID on this collection.
   *
   * @example
   * await client.collections("products").overrides("promote-hat").delete()
   *
   * @see https://typesense.org/docs/latest/api/curation.html
   */
  async delete(): Promise<OverrideDeleteSchema> {
    return this.apiCall.delete<OverrideDeleteSchema>(this.endpointPath());
  }

  private endpointPath(): string {
    return `${Collections.RESOURCEPATH}/${encodeURIComponent(this.collectionName)}${Overrides.RESOURCEPATH}/${encodeURIComponent(this.overrideId)}`;
  }
}
