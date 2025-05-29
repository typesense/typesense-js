import ApiCall from "./ApiCall";
export default class Operations {
    private apiCall;
    constructor(apiCall: ApiCall);
    perform(operationName: "vote" | "snapshot" | "cache/clear" | "schema_changes" | (string & {}), queryParameters?: Record<string, any>): Promise<any>;
}
