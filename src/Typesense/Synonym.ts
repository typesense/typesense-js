import ApiCall from "./ApiCall";
import Collections from "./Collections";
import Synonyms, { SynonymCreateSchema } from "./Synonyms";

export interface SynonymSchema extends SynonymCreateSchema {
  id: string;
}

export interface SynonymDeleteSchema {
  id: string;
}

/**
 * @deprecated Deprecated starting with Typesense Server v30. Please migrate to `client.synonymSets` (new Synonym Sets APIs).
 */
export default class Synonym {
  private static hasWarnedDeprecation = false;
  constructor(
    private collectionName: string,
    private synonymId: string,
    private apiCall: ApiCall
  ) {}

  /**
   * Retrieve a synonym (legacy v1) by ID on this collection.
   *
   * @example
   * await client.collections("products").synonyms("syn-1").retrieve()
   *
   * @see https://typesense.org/docs/29.0/api/synonyms.html
   */
  async retrieve(): Promise<SynonymSchema> {
    return this.apiCall.get<SynonymSchema>(this.endpointPath());
  }

  /**
   * Delete a synonym (legacy v1) by ID on this collection.
   *
   * @example
   * await client.collections("products").synonyms("syn-1").delete()
   *
   * @see https://typesense.org/docs/29.0/api/synonyms.html
   */
  async delete(): Promise<SynonymDeleteSchema> {
    return this.apiCall.delete<SynonymDeleteSchema>(this.endpointPath());
  }

  private endpointPath(): string {
    if (!Synonym.hasWarnedDeprecation) {
      // eslint-disable-next-line no-console
      console.warn(
        "[typesense] 'synonym' APIs are deprecated starting with Typesense Server v30. Please migrate to synonym sets 'synonym_sets'.",
      );
      Synonym.hasWarnedDeprecation = true;
    }
    return `${Collections.RESOURCEPATH}/${encodeURIComponent(this.collectionName)}${Synonyms.RESOURCEPATH}/${encodeURIComponent(this.synonymId)}`;
  }
}
