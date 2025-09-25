import ApiCall from "./ApiCall";
import { CurationSetDeleteResponseSchema, CurationSetSchema, CurationSetUpsertSchema } from "./CurationSets";
import CurationSetItems from "./CurationSetItems";
import CurationSetItem from "./CurationSetItem";
export default class CurationSet {
    private name;
    private apiCall;
    private readonly _items;
    private individualItems;
    constructor(name: string, apiCall: ApiCall);
    upsert(params: CurationSetUpsertSchema): Promise<CurationSetSchema>;
    retrieve(): Promise<CurationSetSchema>;
    delete(): Promise<CurationSetDeleteResponseSchema>;
    items(): CurationSetItems;
    items(itemId: string): CurationSetItem;
    private endpointPath;
}
