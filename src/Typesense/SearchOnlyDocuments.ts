import RequestWithCache from "./RequestWithCache";
import ApiCall from "./ApiCall";
import Configuration from "./Configuration";
import Collections from "./Collections";
import type {
  DocumentSchema,
  SearchableDocuments,
  SearchOptions,
  SearchParams,
  SearchParamsWithPreset,
  SearchResponse,
} from "./Documents";

const RESOURCEPATH = "/documents";

export class SearchOnlyDocuments<T extends DocumentSchema>
  implements SearchableDocuments<T>
{
  protected requestWithCache: RequestWithCache = new RequestWithCache();

  constructor(
    protected collectionName: string,
    protected apiCall: ApiCall,
    protected configuration: Configuration
  ) {}

  clearCache() {
    this.requestWithCache.clearCache();
  }

  async search(
    searchParameters: SearchParams | SearchParamsWithPreset,
    {
      cacheSearchResultsForSeconds = this.configuration
        .cacheSearchResultsForSeconds,
      abortSignal = null,
    }: SearchOptions = {}
  ): Promise<SearchResponse<T>> {
    const additionalQueryParams = {};
    if (this.configuration.useServerSideSearchCache === true) {
      additionalQueryParams["use_cache"] = true;
    }
    for (const key in searchParameters) {
      if (Array.isArray(searchParameters[key])) {
        additionalQueryParams[key] = searchParameters[key].join(",");
      }
    }
    const queryParams = Object.assign(
      {},
      searchParameters,
      additionalQueryParams
    );

    return this.requestWithCache.perform(
      this.apiCall,
      this.apiCall.get,
      [this.endpointPath("search"), queryParams, { abortSignal }],
      {
        cacheResponseForSeconds: cacheSearchResultsForSeconds,
      }
    ) as Promise<SearchResponse<T>>;
  }

  protected endpointPath(operation?: string) {
    return `${Collections.RESOURCEPATH}/${this.collectionName}${RESOURCEPATH}${
      operation === undefined ? "" : "/" + operation
    }`;
  }

  static get RESOURCEPATH() {
    return RESOURCEPATH;
  }
}
