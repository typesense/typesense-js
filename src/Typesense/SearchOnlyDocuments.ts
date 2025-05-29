import RequestWithCache from "./RequestWithCache";
import ApiCall from "./ApiCall";
import Configuration from "./Configuration";
import Collections from "./Collections";
import type {
  DocumentSchema,
  SearchOptions,
  SearchParamsWithPreset,
  SearchResponse,
} from "./Documents";
import { normalizeArrayableParams } from "./Utils";
import { SearchableDocuments, SearchParams } from "./Types";

const RESOURCEPATH = "/documents";

export class SearchOnlyDocuments<T extends DocumentSchema>
  implements SearchableDocuments<T>
{
  protected requestWithCache: RequestWithCache = new RequestWithCache();

  constructor(
    protected collectionName: string,
    protected apiCall: ApiCall,
    protected configuration: Configuration,
  ) {}

  clearCache() {
    this.requestWithCache.clearCache();
  }

  async search<const Infix extends string>(
    searchParameters: SearchParams<T, Infix> | SearchParamsWithPreset<T, Infix>,
    {
      cacheSearchResultsForSeconds = this.configuration
        .cacheSearchResultsForSeconds,
      abortSignal = null,
    }: SearchOptions = {},
  ): Promise<SearchResponse<T>> {
    const additionalQueryParams = {};
    if (this.configuration.useServerSideSearchCache === true) {
      additionalQueryParams["use_cache"] = true;
    }

    const { streamConfig, ...rest } = normalizeArrayableParams<
      T,
      SearchParams<T, Infix>,
      Infix
    >(searchParameters);

    const queryParams = {
      ...additionalQueryParams,
      ...rest,
    };

    const isStreamingRequest = queryParams.conversation_stream === true;

    return this.requestWithCache.perform<
      ApiCall,
      "get",
      [T],
      SearchResponse<T>
    >(
      this.apiCall,
      "get",
      {
        path: this.endpointPath("search"),
        queryParams,
        streamConfig,
        abortSignal,
        isStreamingRequest,
      },
      {
        cacheResponseForSeconds: cacheSearchResultsForSeconds,
      },
    );
  }

  protected endpointPath(operation?: string) {
    return `${Collections.RESOURCEPATH}/${encodeURIComponent(this.collectionName)}${RESOURCEPATH}${
      operation === undefined ? "" : "/" + operation
    }`;
  }

  static get RESOURCEPATH() {
    return RESOURCEPATH;
  }
}
