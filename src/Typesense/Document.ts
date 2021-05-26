import ApiCall from "./ApiCall";
import Collections from "./Collections";
import Documents from "./Documents";

export default class Document {
    constructor(private collectionName: string, private documentId: string, private apiCall: ApiCall) {}

    retrieve() {
        return this.apiCall.get(this.endpointPath());
    }

    delete() {
        return this.apiCall.delete(this.endpointPath());
    }

    update(partialDocument, options = {}) {
        return this.apiCall.patch(this.endpointPath(), partialDocument, options);
    }

    private endpointPath() {
        return `${Collections.RESOURCEPATH}/${this.collectionName}${Documents.RESOURCEPATH}/${this.documentId}`;
    }
}
