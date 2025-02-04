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

export default class StemmingDictionary {
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
