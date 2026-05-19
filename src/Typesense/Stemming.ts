import type ApiCall from "./ApiCall";
import StemmingDictionaries from "./StemmingDictionaries";
import StemmingDictionary from "./StemmingDictionary";

const RESOURCEPATH = "/stemming";

export default class Stemming {
  private readonly _stemmingDictionaries: StemmingDictionaries;
  private readonly individualStemmingDictionaries: Record<
    string,
    StemmingDictionary
  > = {};

  constructor(private readonly apiCall: ApiCall) {
    this.apiCall = apiCall;
    this._stemmingDictionaries = new StemmingDictionaries(this.apiCall);
  }

  /**
   * Access the stemming dictionaries resource. Call without arguments to list or import dictionaries, or pass an ID to access a single dictionary.
   *
   * @example
   * await client.stemming.dictionaries().retrieve()
   * @example
   * await client.stemming.dictionaries("en").retrieve()
   *
   * @see https://typesense.org/docs/latest/api/stemming.html
   */
  dictionaries(): StemmingDictionaries;
  /**
   * Access an individual stemming dictionary by ID.
   *
   * @example
   * await client.stemming.dictionaries("en").retrieve()
   *
   * @see https://typesense.org/docs/latest/api/stemming.html
   */
  dictionaries(id: string): StemmingDictionary;
  dictionaries(id?: string): StemmingDictionaries | StemmingDictionary {
    if (id === undefined) {
      return this._stemmingDictionaries;
    } else {
      if (this.individualStemmingDictionaries[id] === undefined) {
        this.individualStemmingDictionaries[id] = new StemmingDictionary(
          id,
          this.apiCall,
        );
      }
      return this.individualStemmingDictionaries[id];
    }
  }

  static get RESOURCEPATH() {
    return RESOURCEPATH;
  }
}
