import ApiCall from "./ApiCall";

const RESOURCEPATH = "/collections";

export default class Collections {
    constructor(private apiCall: ApiCall) {}

    create(schema) {
        return this.apiCall.post(RESOURCEPATH, schema);
    }

    retrieve(schema) {
        return this.apiCall.get(RESOURCEPATH);
    }

    static get RESOURCEPATH() {
        return RESOURCEPATH;
    }
}
