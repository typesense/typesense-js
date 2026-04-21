import ApiCall from "./ApiCall";
import type { CurationObjectSchema } from "./CurationSets";
export type CurationItemUpsertSchema = Omit<CurationObjectSchema, "id">;
export interface CurationItemDeleteResponseSchema {
    id: string;
}
export default class CurationSetItem {
    private name;
    private itemId;
    private apiCall;
    constructor(name: string, itemId: string, apiCall: ApiCall);
    retrieve(): Promise<CurationObjectSchema>;
    upsert(params: CurationItemUpsertSchema): Promise<CurationObjectSchema>;
    delete(): Promise<CurationItemDeleteResponseSchema>;
    private endpointPath;
}
