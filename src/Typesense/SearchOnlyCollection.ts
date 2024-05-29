import { DocumentSchema, SearchableDocuments } from './Documents';
import ApiCall from './ApiCall';
import { SearchOnlyDocuments } from './SearchOnlyDocuments';

export class SearchOnlyCollection<T extends DocumentSchema = object> {
  private readonly _documents: SearchableDocuments<T>;

  constructor(
    private readonly name: string,
    private readonly apiCall: ApiCall,
    private readonly configuration: any,
  ) {
    this._documents = new SearchOnlyDocuments(
      this.name,
      this.apiCall,
      this.configuration,
    );
  }

  documents(): SearchableDocuments<T> {
    return this._documents;
  }
}
