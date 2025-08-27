import ApiCall from "./ApiCall";
import { SynonymSchema } from "./Synonym";
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
    private collectionName;
    private apiCall;
    private static hasWarnedDeprecation;
    constructor(collectionName: string, apiCall: ApiCall);
    upsert(synonymId: string, params: SynonymCreateSchema): Promise<SynonymSchema>;
    retrieve(): Promise<SynonymsRetrieveSchema>;
    private endpointPath;
    static get RESOURCEPATH(): string;
}
