import ApiCall from './ApiCall'
import Collections from './Collections'
import Documents, { DocumentSchema } from './Documents'

export default class Document<T extends DocumentSchema = {}> {
  constructor(private collectionName: string, private documentId: string, private apiCall: ApiCall) {}

  async retrieve(): Promise<T> {
    return await this.apiCall.get<T>(this.endpointPath())
  }

  async delete() {
    return await this.apiCall.delete<T>(this.endpointPath())
  }

  async update(partialDocument: Partial<T>, options: Record<string, any> = {}) {
    return await this.apiCall.patch<T>(this.endpointPath(), partialDocument, options)
  }

  private endpointPath(): string {
    return `${Collections.RESOURCEPATH}/${this.collectionName}${Documents.RESOURCEPATH}/${this.documentId}`
  }
}
