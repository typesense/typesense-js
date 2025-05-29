import ApiCall from "./ApiCall";
import { DeleteQuery, DocumentSchema, DocumentWriteParameters } from "./Documents";
export declare class Document<T extends DocumentSchema = object> {
    private collectionName;
    private documentId;
    private apiCall;
    constructor(collectionName: string, documentId: string, apiCall: ApiCall);
    retrieve(): Promise<T>;
    delete(options?: DeleteQuery): Promise<T>;
    update(partialDocument: Partial<T>, options?: DocumentWriteParameters): Promise<T>;
    private endpointPath;
}
