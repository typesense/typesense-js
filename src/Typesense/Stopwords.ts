import ApiCall from "./ApiCall";
import { StopwordSchema } from "./Stopword";

const RESOURCEPATH = "/stopwords";

export interface StopwordCreateSchema {
  stopwords: string[];
  locale?: string;
}

export interface StopwordsRetrieveSchema {
  stopwords: StopwordSchema[];
}

export default class Stopwords {
  constructor(private apiCall: ApiCall) {}

  /**
   * Upserts a stopwords set.
   *
   * @example
   * await client.stopwords().upsert("en", { stopwords: ["a", "the"] })
   *
   * @see https://typesense.org/docs/latest/api/stopwords.html
   */
  async upsert(
    stopwordId: string,
    params: StopwordCreateSchema,
  ): Promise<StopwordSchema> {
    return this.apiCall.put<StopwordSchema>(
      this.endpointPath(stopwordId),
      params,
    );
  }

  /**
   * Retrieve the details of all stopwords sets
   *
   * @example
   * await client.stopwords().retrieve()
   *
   * @see https://typesense.org/docs/latest/api/stopwords.html
   */
  async retrieve(): Promise<StopwordsRetrieveSchema> {
    return this.apiCall.get<StopwordsRetrieveSchema>(this.endpointPath());
  }

  private endpointPath(operation?: string): string {
    return `${Stopwords.RESOURCEPATH}${
      operation === undefined ? "" : "/" + encodeURIComponent(operation)
    }`;
  }

  static get RESOURCEPATH(): string {
    return RESOURCEPATH;
  }
}
