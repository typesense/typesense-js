import ApiCall from "./ApiCall";
import StemmingDictionaries from "./StemmingDictionaries";

export interface StemmingDictionaryCreateSchema {
  words: { root: string; word: string }[];
}

export interface StemmingDictionarySchema
  extends StemmingDictionaryCreateSchema {
  id: string;
}

export default class StemmingDicitonary {
  constructor(
    private id: string,
    private apiCall: ApiCall,
  ) {}

  async retrieve(): Promise<StemmingDictionarySchema> {
    return this.apiCall.get<StemmingDictionarySchema>(this.endpointPath());
  }

  private endpointPath(): string {
    return `${StemmingDictionaries.RESOURCEPATH}/${encodeURIComponent(this.id)}`;
  }
}
