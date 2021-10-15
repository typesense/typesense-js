import Documents, { DocumentSchema } from './Documents'
import ApiCall from './ApiCall'
import Collections from './Collections'

export class ReadOnlyDocument<T extends DocumentSchema = {}> {
  constructor(private collectionName: string, private documentId: string, private apiCall: ApiCall) {}

  async retrieve(): Promise<T> {
    return await this.apiCall.get<T>(this.endpointPath())
  }

  private endpointPath(): string {
    return `${Collections.RESOURCEPATH}/${this.collectionName}${Documents.RESOURCEPATH}/${this.documentId}`
  }
}
