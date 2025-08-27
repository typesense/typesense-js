import ApiCall from "./ApiCall";
import { SynonymCreateSchema } from "./Synonyms";
export interface SynonymSchema extends SynonymCreateSchema {
    id: string;
}
export interface SynonymDeleteSchema {
    id: string;
}
/**
 * @deprecated Deprecated starting with Typesense Server v30. Please migrate to `client.synonymSets` (new Synonym Sets APIs).
 */
export default class Synonym {
    private collectionName;
    private synonymId;
    private apiCall;
    private static hasWarnedDeprecation;
    constructor(collectionName: string, synonymId: string, apiCall: ApiCall);
    retrieve(): Promise<SynonymSchema>;
    delete(): Promise<SynonymDeleteSchema>;
    private endpointPath;
}
