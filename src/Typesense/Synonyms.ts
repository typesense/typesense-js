import ApiCall from "./ApiCall";
import Collections from "./Collections";
import { SynonymSchema } from "./Synonym";

const RESOURCEPATH = "/synonyms";

export interface SynonymCreateSchema {
  synonyms: string[];
  root?: string;
  locale?: string;
  symbols_to_index?: string[];
}

export interface SynonymsRetrieveSchema {
  synonyms: SynonymSchema[];
}

/**
 * @deprecated Deprecated starting with Typesense Server v30. Please migrate to `client.synonymSets` (new Synonym Sets APIs).
 */
export default class Synonyms {
  private static hasWarnedDeprecation = false;
  constructor(private collectionName: string, private apiCall: ApiCall) {}

  async upsert(
    synonymId: string,
    params: SynonymCreateSchema
  ): Promise<SynonymSchema> {
    return this.apiCall.put<SynonymSchema>(
      this.endpointPath(synonymId),
      params
    );
  }

  async retrieve(): Promise<SynonymsRetrieveSchema> {
    return this.apiCall.get<SynonymsRetrieveSchema>(this.endpointPath());
  }

  private endpointPath(operation?: string) {
    if (!Synonyms.hasWarnedDeprecation) {
      // eslint-disable-next-line no-console
      console.warn(
        "[typesense] 'synonyms' APIs are deprecated starting with Typesense Server v30. Please migrate to synonym sets ('synonym_sets').",
      );
      Synonyms.hasWarnedDeprecation = true;
    }
    return `${Collections.RESOURCEPATH}/${encodeURIComponent(this.collectionName)}${
      Synonyms.RESOURCEPATH
    }${operation === undefined ? "" : "/" + encodeURIComponent(operation)}`;
  }

  static get RESOURCEPATH(): string {
    return RESOURCEPATH;
  }
}
