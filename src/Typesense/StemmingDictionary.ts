import ApiCall from "./ApiCall";
import StemmingDictionaries from "./StemmingDictionaries";

export interface StemmingDictionaryCreateSchema {
  root: string;
  word: string;
}

export interface StemmingDictionarySchema {
  id: string;
  words: StemmingDictionaryCreateSchema[];
}

export interface StemmingDictionaryDeleteSchema {
  id: string;
}

export default class StemmingDictionary {
  constructor(
    private id: string,
    private apiCall: ApiCall,
  ) {}

  /**
   * Fetch details of a specific stemming dictionary.
   *
   * @example
   * await client.stemming.dictionaries("en").retrieve()
   *
   * @see https://typesense.org/docs/latest/api/stemming.html
   */
  async retrieve(): Promise<StemmingDictionarySchema> {
    return this.apiCall.get<StemmingDictionarySchema>(this.endpointPath());
  }

  /**
   * Delete a stemming dictionary by ID.
   *
   * @example
   * await client.stemming.dictionaries("en").delete()
   *
   * @see https://typesense.org/docs/latest/api/stemming.html
   */
  async delete(): Promise<StemmingDictionaryDeleteSchema> {
    return this.apiCall.delete<StemmingDictionaryDeleteSchema>(
      this.endpointPath(),
    );
  }

  private endpointPath(): string {
    return `${StemmingDictionaries.RESOURCEPATH}/${encodeURIComponent(this.id)}`;
  }
}
