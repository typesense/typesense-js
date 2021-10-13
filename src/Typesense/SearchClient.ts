import Configuration, { ConfigurationOptions } from './Configuration'
import ApiCall from './ApiCall'
import Collection from './Collection'
import MultiSearch from './MultiSearch'
import { DocumentSchema } from './Documents';

export default class SearchClient<TDocumentSchema extends DocumentSchema = {}> {
  private readonly configuration: Configuration
  private readonly apiCall: ApiCall
  private readonly multiSearch: MultiSearch
  private readonly individualCollections: Record<string, Collection<TDocumentSchema>>

  constructor(options: ConfigurationOptions) {
    // In v0.20.0 we restrict query params to 2000 in length
    // But sometimes scoped API keys can be over this limit, so we send long keys as headers instead.
    // The tradeoff is that using a header to send the API key will trigger the browser to send an OPTIONS request though.
    if ((options['apiKey'] || '').length < 2000) {
      options['sendApiKeyAsQueryParam'] = true
    }

    this.configuration = new Configuration(options)
    this.apiCall = new ApiCall(this.configuration)
    this.multiSearch = new MultiSearch(this.apiCall, this.configuration, true)
    this.individualCollections = {}
  }

  collections(collectionName: string): Collection<TDocumentSchema> {
    // Nick: changed to less strict check, as null or an empty string would fail this statement
    if (!collectionName) {
      throw new Error(
        'Typesense.SearchClient only supports search operations, so the collectionName that needs to ' +
          'be searched must be specified. Use Typesense.Client if you need to access the collection object.'
      )
    } else {
      if (this.individualCollections[collectionName] === undefined) {
        this.individualCollections[collectionName] = new Collection<TDocumentSchema>(collectionName, this.apiCall, this.configuration)
      }
      return this.individualCollections[collectionName]
    }
  }
}
