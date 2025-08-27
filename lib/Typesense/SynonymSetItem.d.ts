import ApiCall from "./ApiCall";
import { SynonymItemSchema } from "./SynonymSets";
export interface SynonymSetItemDeleteSchema {
    id: string;
}
export default class SynonymSetItem {
    private synonymSetName;
    private itemId;
    private apiCall;
    constructor(synonymSetName: string, itemId: string, apiCall: ApiCall);
    retrieve(): Promise<SynonymItemSchema>;
    delete(): Promise<SynonymSetItemDeleteSchema>;
    private endpointPath;
}
