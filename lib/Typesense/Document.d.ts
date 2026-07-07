import ApiCall from "./ApiCall";
import { DeleteQuery, DocumentSchema, DocumentWriteParameters } from "./Documents";
export interface DocumentsRetrieveParameters {
    include_fields?: string | string[];
    exclude_fields?: string | string[];
}
export declare class Document<T extends DocumentSchema = object> {
    private collectionName;
    private documentId;
    private apiCall;
    constructor(collectionName: string, documentId: string, apiCall: ApiCall);
    /**
     * Fetch an individual document from a collection by using its ID.
     *
     * @example
     * await client.collections("products").documents("1").retrieve()
     *
     * @see https://typesense.org/docs/latest/api/documents.html#retrieve-a-document
     */
    retrieve(options?: DocumentsRetrieveParameters): Promise<T>;
    /**
     * Delete an individual document from a collection by using its ID.
     *
     * @example
     * await client.collections("products").documents("1").delete()
     *
     * @see https://typesense.org/docs/latest/api/documents.html#delete-a-document
     */
    delete(options?: DeleteQuery): Promise<T>;
    /**
     * Update an individual document by ID by merging the provided fields.
     *
     * @example
     * await client.collections("products").documents("1").update({ in_stock: true })
     *
     * @see https://typesense.org/docs/latest/api/documents.html#update-a-document
     */
    update(partialDocument: Partial<T>, options?: DocumentWriteParameters): Promise<T>;
    private endpointPath;
}
