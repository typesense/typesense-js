import ApiCall from "./ApiCall";
import { CurationObjectSchema } from "./CurationSets";
export default class CurationSetItems {
    private name;
    private apiCall;
    constructor(name: string, apiCall: ApiCall);
    /**
     * Retrieve all curation items in a set
     *
     * @example
     * await client.curationSets("my-set").items().retrieve()
     *
     * @see https://typesense.org/docs/latest/api/curation.html
     */
    retrieve(): Promise<CurationObjectSchema[]>;
    private endpointPath;
}
