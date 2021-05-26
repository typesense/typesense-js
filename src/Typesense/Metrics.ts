import ApiCall from "./ApiCall";

const RESOURCEPATH = "/metrics.json";

export default class Metrics {
    constructor(private apiCall: ApiCall) {}

    retrieve() {
        return this.apiCall.get(RESOURCEPATH);
    }
}
