import ApiCall from "./ApiCall";
import type { SynonymSetCreateSchema } from "./SynonymSets";
import SynonymSetItems from "./SynonymSetItems";
import SynonymSetItem from "./SynonymSetItem";
export interface SynonymSetDeleteSchema {
    name: string;
}
export type SynonymSetRetrieveSchema = SynonymSetCreateSchema;
export default class SynonymSet {
    private synonymSetName;
    private apiCall;
    private readonly _items;
    private individualItems;
    constructor(synonymSetName: string, apiCall: ApiCall);
    upsert(params: SynonymSetCreateSchema): Promise<SynonymSetCreateSchema>;
    retrieve(): Promise<SynonymSetRetrieveSchema>;
    delete(): Promise<SynonymSetDeleteSchema>;
    items(): SynonymSetItems;
    items(itemId: string): SynonymSetItem;
    private endpointPath;
}
