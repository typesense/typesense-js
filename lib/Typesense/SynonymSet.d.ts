import ApiCall from "./ApiCall";
import type { SynonymSetCreateSchema } from "./SynonymSets";
export interface SynonymSetDeleteSchema {
    name: string;
}
export type SynonymSetRetrieveSchema = SynonymSetCreateSchema;
export default class SynonymSet {
    private synonymSetName;
    private apiCall;
    constructor(synonymSetName: string, apiCall: ApiCall);
    upsert(params: SynonymSetCreateSchema): Promise<SynonymSetCreateSchema>;
    retrieve(): Promise<SynonymSetRetrieveSchema>;
    delete(): Promise<SynonymSetDeleteSchema>;
    private endpointPath;
}
