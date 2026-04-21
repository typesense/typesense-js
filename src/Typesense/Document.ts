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

  async retrieve(options?: DocumentsRetrieveParameters): Promise<T> {
    const queryParams = normalizeArrayableParams(options ?? {})
    
    return this.apiCall.get<T>(this.endpointPath(), queryParams);
  }

  async delete(options?: DeleteQuery): Promise<T> {
    return this.apiCall.delete<T>(this.endpointPath(), options);
  }

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
