import ApiCall from "./ApiCall";
import type { StemmingDictionaryCreateSchema } from "./StemmingDictionary";

const RESOURCEPATH = "/stemming/dictionaries";

export interface StemmingDictionariesRetrieveSchema {
  dictionaries: string[];
}

export default class StemmingDictionaries {
  constructor(private readonly apiCall: ApiCall) {
    this.apiCall = apiCall;
  }

  /**
   * Upload a JSONL file containing word mappings to create or update a stemming dictionary.
   *
   * @example
   * await client.stemming.dictionaries().upsert("irregular-plurals", [{ word: "people", root: "person" }])
   *
   * @see https://typesense.org/docs/latest/api/stemming.html
   */
  async upsert(
    id: string,
    wordRootCombinations: StemmingDictionaryCreateSchema[] | string,
  ): Promise<StemmingDictionaryCreateSchema[] | string> {
    const wordRootCombinationsInJSONLFormat = Array.isArray(
      wordRootCombinations,
    )
      ? wordRootCombinations.map((combo) => JSON.stringify(combo)).join("\n")
      : wordRootCombinations;

    const resultsInJSONLFormat = await this.apiCall.performRequest<string>(

      "post",
      this.endpointPath("import"),
      {
        queryParameters: {id},
        bodyParameters: wordRootCombinationsInJSONLFormat,
        additionalHeaders: {"Content-Type": "text/plain"},
        skipConnectionTimeout: true,
      }
    );

    return Array.isArray(wordRootCombinations)
      ? resultsInJSONLFormat
          .split("\n")
          .map((line) => JSON.parse(line) as StemmingDictionaryCreateSchema)
      : resultsInJSONLFormat;
  }

  /**
   * Retrieve a list of all available stemming dictionaries.
   *
   * @example
   * await client.stemming.dictionaries().retrieve()
   *
   * @see https://typesense.org/docs/latest/api/stemming.html
   */
  async retrieve(): Promise<StemmingDictionariesRetrieveSchema> {
    return this.apiCall.get<StemmingDictionariesRetrieveSchema>(
      this.endpointPath(),
    );
  }

  private endpointPath(operation?: string): string {
    return operation === undefined
      ? `${StemmingDictionaries.RESOURCEPATH}`
      : `${StemmingDictionaries.RESOURCEPATH}/${encodeURIComponent(operation)}`;
  }

  static get RESOURCEPATH() {
    return RESOURCEPATH;
  }
}
