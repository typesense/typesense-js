import ApiCall from "./ApiCall";
import Keys from "./Keys";

export default class Key {
    constructor(private id: string, private apiCall: ApiCall) {}

    retrieve() {
        return this.apiCall.get(this._endpointPath());
    }

    delete() {
        return this.apiCall.delete(this._endpointPath());
    }

    _endpointPath() {
        return `${Keys.RESOURCEPATH}/${this.id}`;
    }
}
