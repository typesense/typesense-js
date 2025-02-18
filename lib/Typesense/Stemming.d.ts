import type ApiCall from "./ApiCall";
import StemmingDictionaries from "./StemmingDictionaries";
import StemmingDictionary from "./StemmingDictionary";
export default class Stemming {
    private readonly apiCall;
    private readonly _stemmingDictionaries;
    private readonly individualStemmingDictionaries;
    constructor(apiCall: ApiCall);
    dictionaries(): StemmingDictionaries;
    dictionaries(id: string): StemmingDictionary;
    static get RESOURCEPATH(): string;
}
