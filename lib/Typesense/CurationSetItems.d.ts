import ApiCall from "./ApiCall";
import { CurationObjectSchema } from "./CurationSets";
export default class CurationSetItems {
    private name;
    private apiCall;
    constructor(name: string, apiCall: ApiCall);
    retrieve(): Promise<CurationObjectSchema[]>;
    private endpointPath;
}
