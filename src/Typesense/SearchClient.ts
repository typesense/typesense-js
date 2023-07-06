import Configuration, { ConfigurationOptions } from "./Configuration";
import ApiCall from "./ApiCall";
import MultiSearch from "./MultiSearch";
import { DocumentSchema } from "./Documents";
import { SearchOnlyCollection } from "./SearchOnlyCollection";

export default class SearchClient {
  public readonly multiSearch: MultiSearch;
  private readonly configuration: Configuration;
  private readonly apiCall: ApiCall;
  private readonly individualCollections: Record<string, SearchOnlyCollection>;

  constructor(options: ConfigurationOptions) {
    options.sendApiKeyAsQueryParam = options.sendApiKeyAsQueryParam ?? true;
    if (
      options.sendApiKeyAsQueryParam === true &&
      (options.apiKey || "").length > 2000
    ) {
      console.warn(
        "[typesense] API Key is longer than 2000 characters which is over the allowed limit, so disabling sending it as a query parameter."
      );
      options.sendApiKeyAsQueryParam = false;
    }

    this.configuration = new Configuration(options);
    this.apiCall = new ApiCall(this.configuration);
    this.multiSearch = new MultiSearch(this.apiCall, this.configuration, true);
    this.individualCollections = {};
  }

  clearCache() {
    this.multiSearch.clearCache();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    Object.entries(this.individualCollections).forEach(([_, collection]) => {
      collection.documents().clearCache();
    });
  }

  collections<TDocumentSchema extends DocumentSchema = object>(
    collectionName: string
  ): SearchOnlyCollection<TDocumentSchema> | SearchOnlyCollection {
    if (!collectionName) {
      throw new Error(
        "Typesense.SearchClient only supports search operations, so the collectionName that needs to " +
          "be searched must be specified. Use Typesense.Client if you need to access the collection object."
      );
    } else {
      if (this.individualCollections[collectionName] === undefined) {
        this.individualCollections[collectionName] = new SearchOnlyCollection(
          collectionName,
          this.apiCall,
          this.configuration
        );
      }
      return this.individualCollections[collectionName];
    }
  }
}
