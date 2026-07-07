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
    /**
     * Retrieve a specific curation item by its id
     *
     * @example
     * await client.curationSets("my-set").items("promote-hat").retrieve()
     *
     * @see https://typesense.org/docs/latest/api/curation.html
     */
    retrieve(): Promise<CurationObjectSchema>;
    /**
     * Create or update a curation set item with the given id
     *
     * @example
     * await client.curationSets("my-set").items("promote-hat").upsert({ rule: { query: "hat", match: "exact" }, includes: [] })
     *
     * @see https://typesense.org/docs/latest/api/curation.html
     */
    upsert(params: CurationItemUpsertSchema): Promise<CurationObjectSchema>;
    /**
     * Delete a specific curation item by its id
     *
     * @example
     * await client.curationSets("my-set").items("promote-hat").delete()
     *
     * @see https://typesense.org/docs/latest/api/curation.html
     */
    delete(): Promise<CurationItemDeleteResponseSchema>;
    private endpointPath;
}
