import ApiCall from "./ApiCall";
import { OverrideCreateSchema } from "./Overrides";
export interface OverrideSchema extends OverrideCreateSchema {
    id: string;
}
export interface OverrideDeleteSchema {
    id: string;
}
export default class Override {
    private collectionName;
    private overrideId;
    private apiCall;
    constructor(collectionName: string, overrideId: string, apiCall: ApiCall);
    /**
     * Retrieve an override (curation rule) by ID on this collection.
     *
     * @example
     * await client.collections("products").overrides("promote-hat").retrieve()
     *
     * @see https://typesense.org/docs/latest/api/curation.html
     */
    retrieve(): Promise<OverrideSchema>;
    /**
     * Delete an override (curation rule) by ID on this collection.
     *
     * @example
     * await client.collections("products").overrides("promote-hat").delete()
     *
     * @see https://typesense.org/docs/latest/api/curation.html
     */
    delete(): Promise<OverrideDeleteSchema>;
    private endpointPath;
}
