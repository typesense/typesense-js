import ApiCall from "./ApiCall";
import type {
  StemmingDictionaryCreateSchema,
  StemmingDictionarySchema,
} from "./StemmingDictionary";

const RESOURCEPATH = "/stemming/dictionary";

export interface StemmingDictionariesRetrieveSchema {
  dictionaries: string[];
}

export default class StemmingDictionaries {
  constructor(private readonly apiCall: ApiCall) {
    this.apiCall = apiCall;
  }

  async upsert(
    id: string,
    params: StemmingDictionaryCreateSchema,
  ): Promise<StemmingDictionarySchema> {
    return this.apiCall.post<StemmingDictionarySchema>(
      this.endpointPath(id),
      params,
    );
  }

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
