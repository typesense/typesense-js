import ApiCall from "./ApiCall";
import Stopwords from "./Stopwords";

export interface StopwordSchema {
  id: string;
  stopwords: string[] | { id: string; stopwords: string[] };
  locale?: string;
}

export interface StopwordDeleteSchema {
  id: string;
}

export default class Stopword {
  constructor(
    private stopwordId: string,
    private apiCall: ApiCall,
  ) {}

  /**
   * Retrieve the details of a stopwords set, given it's name.
   *
   * @example
   * await client.stopwords("en").retrieve()
   *
   * @see https://typesense.org/docs/latest/api/stopwords.html
   */
  async retrieve(): Promise<StopwordSchema> {
    return this.apiCall.get<StopwordSchema>(this.endpointPath());
  }

  /**
   * Permanently deletes a stopwords set, given it's name.
   *
   * @example
   * await client.stopwords("en").delete()
   *
   * @see https://typesense.org/docs/latest/api/stopwords.html
   */
  async delete(): Promise<StopwordDeleteSchema> {
    return this.apiCall.delete<StopwordDeleteSchema>(this.endpointPath());
  }

  private endpointPath(): string {
    return `${Stopwords.RESOURCEPATH}/${encodeURIComponent(this.stopwordId)}`;
  }
}
