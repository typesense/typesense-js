import ApiCall from "./ApiCall";
import Collections from "./Collections";

const RESOURCEPATH = "/overrides";

export default class Overrides {
    constructor(private collectionName: string, private apiCall: ApiCall) {}

    upsert(overrideId: string, params: {}) {
        return this.apiCall.put(this.endpointPath(overrideId), params);
    }

    retrieve() {
        return this.apiCall.get(this.endpointPath());
    }

    private endpointPath(operation?: string) {
        return `${Collections.RESOURCEPATH}/${this.collectionName}${Overrides.RESOURCEPATH}${
            operation === undefined ? "" : "/" + operation
        }`;
    }

    static get RESOURCEPATH() {
        return RESOURCEPATH;
    }
}
