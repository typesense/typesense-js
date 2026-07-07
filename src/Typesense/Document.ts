import ApiCall from "./ApiCall";
import Collections from "./Collections";
import Documents, {
  DeleteQuery,
  DocumentSchema,
  DocumentWriteParameters,
} from "./Documents";
import { normalizeArrayableParams } from "./Utils";

export interface DocumentsRetrieveParameters {
  include_fields?: string | string[];
  exclude_fields?: string | string[];
}

export class Document<T extends DocumentSchema = object> {
  constructor(
    private collectionName: string,
    private documentId: string,
    private apiCall: ApiCall
  ) {}

  /**
   * Fetch an individual document from a collection by using its ID.
   *
   * @example
   * await client.collections("products").documents("1").retrieve()
   *
   * @see https://typesense.org/docs/latest/api/documents.html#retrieve-a-document
   */
  async retrieve(options?: DocumentsRetrieveParameters): Promise<T> {
    const queryParams = normalizeArrayableParams(options ?? {})

    return this.apiCall.get<T>(this.endpointPath(), queryParams);
  }

  /**
   * Delete an individual document from a collection by using its ID.
   *
   * @example
   * await client.collections("products").documents("1").delete()
   *
   * @see https://typesense.org/docs/latest/api/documents.html#delete-a-document
   */
  async delete(options?: DeleteQuery): Promise<T> {
    return this.apiCall.delete<T>(this.endpointPath(), options);
  }

  /**
   * Update an individual document by ID by merging the provided fields.
   *
   * @example
   * await client.collections("products").documents("1").update({ in_stock: true })
   *
   * @see https://typesense.org/docs/latest/api/documents.html#update-a-document
   */
  async update(
    partialDocument: Partial<T>,
    options: DocumentWriteParameters = {}
  ): Promise<T> {
    return this.apiCall.patch<T>(this.endpointPath(), partialDocument, options);
  }

  private endpointPath(): string {
    return `${Collections.RESOURCEPATH}/${encodeURIComponent(this.collectionName)}${Documents.RESOURCEPATH}/${encodeURIComponent(this.documentId)}`;
  }
}
