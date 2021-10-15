import { DocumentSchema, SearchableDocuments } from './Documents'
import ApiCall from './ApiCall'
import { ObjectNotFound } from './Errors'
import Collections from './Collections'
import { CollectionSchema } from './Collection'
import { SearchOnlyDocuments } from './SearchOnlyDocuments'
import { ReadOnlyDocument } from './ReadOnlyDocument'

export class SearchOnlyCollection<T extends DocumentSchema = {}> {
  private readonly _documents: SearchableDocuments<T>
  private individualDocuments: Record<string, ReadOnlyDocument<T>> = {}

  constructor(private readonly name: string, private readonly apiCall: ApiCall, private readonly configuration: any) {
    this._documents = new SearchOnlyDocuments(this.name, this.apiCall, this.configuration)
  }

  async retrieve(): Promise<CollectionSchema> {
    return await this.apiCall.get<CollectionSchema>(this.endpointPath())
  }

  async exists(): Promise<boolean> {
    try {
      await this.retrieve()
      return true
    } catch (e) {
      if (e instanceof ObjectNotFound) return false
      throw e
    }
  }

  documents(): SearchableDocuments<T>
  documents(documentId: string): SearchableDocuments<T>
  documents(documentId?: string): ReadOnlyDocument<T> | SearchableDocuments<T> {
    if (!documentId) {
      return this._documents
    } else {
      if (this.individualDocuments[documentId] === undefined) {
        this.individualDocuments[documentId] = new ReadOnlyDocument(this.name, documentId, this.apiCall)
      }
      return this.individualDocuments[documentId]
    }
  }

  private endpointPath(): string {
    return `${Collections.RESOURCEPATH}/${this.name}`
  }
}
