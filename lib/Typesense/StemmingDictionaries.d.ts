import ApiCall from "./ApiCall";
import type { StemmingDictionaryCreateSchema } from "./StemmingDictionary";
export interface StemmingDictionariesRetrieveSchema {
    dictionaries: string[];
}
export default class StemmingDictionaries {
    private readonly apiCall;
    constructor(apiCall: ApiCall);
    upsert(id: string, wordRootCombinations: StemmingDictionaryCreateSchema[] | string): Promise<StemmingDictionaryCreateSchema[] | string>;
    retrieve(): Promise<StemmingDictionariesRetrieveSchema>;
    private endpointPath;
    static get RESOURCEPATH(): string;
}
