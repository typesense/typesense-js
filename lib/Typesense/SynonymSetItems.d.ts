import ApiCall from "./ApiCall";
import { SynonymItemSchema } from "./SynonymSets";
import type { SynonymItemUpsertSchema } from "./SynonymSetItem";
export default class SynonymSetItems {
    private synonymSetName;
    private apiCall;
    constructor(synonymSetName: string, apiCall: ApiCall);
    upsert(itemId: string, params: SynonymItemUpsertSchema): Promise<SynonymItemSchema>;
    retrieve(): Promise<SynonymItemSchema[]>;
    private endpointPath;
}
