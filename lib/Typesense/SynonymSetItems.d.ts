import ApiCall from "./ApiCall";
import { SynonymItemSchema } from "./SynonymSets";
export interface SynonymSetItemDeleteSchema {
    id: string;
}
export default class SynonymSetItems {
    private synonymSetName;
    private apiCall;
    constructor(synonymSetName: string, apiCall: ApiCall);
    upsert(itemId: string, params: Omit<SynonymItemSchema, "id">): Promise<SynonymItemSchema>;
    retrieve(): Promise<SynonymItemSchema[]>;
    private endpointPath;
}
