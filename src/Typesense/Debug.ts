import ApiCall from "./ApiCall";

const RESOURCEPATH = "/debug";

export default class Debug {
    constructor(private apiCall: ApiCall) {}

    retrieve() {
        return this.apiCall.get(RESOURCEPATH);
    }
}
