import ApiCall from "./ApiCall";

const RESOURCEPATH = "/aliases";

export default class Aliases {
    constructor(private apiCall: ApiCall) {}

    upsert(name, mapping) {
        return this.apiCall.put(this.endpointPath(name), mapping);
    }

    retrieve(schema) {
        return this.apiCall.get(RESOURCEPATH);
    }

    private endpointPath(aliasName) {
        return `${Aliases.RESOURCEPATH}/${aliasName}`;
    }

    static get RESOURCEPATH() {
        return RESOURCEPATH;
    }
}
