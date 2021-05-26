import ApiCall from "./ApiCall";
import Configuration from "./Configuration";
import RequestWithCache from "./RequestWithCache";

const RESOURCEPATH = "/multisearch";

export default class MultiSearch {
    private requestWithCache: RequestWithCache;

    constructor(
        private apiCall: ApiCall,
        private configuration: Configuration,
        private useTextContentType: boolean = false
    ) {
        this.requestWithCache = new RequestWithCache();
    }

    perform(
        searchRequests,
        commonParams = {},
        { cacheSearchResultsForSeconds = this.configuration.cacheSearchResultsForSeconds } = {}
    ) {
        let additionalHeaders = {};
        if (this.useTextContentType) {
            additionalHeaders["content-type"] = "text/plain";
        }

        let additionalQueryParams = {};
        if (this.configuration.useServerSideSearchCache === true) {
            additionalQueryParams["usecache"] = true;
        }
        const queryParams = Object.assign({}, commonParams, additionalQueryParams);

        return this.requestWithCache.perform(
            this.apiCall,
            this.apiCall.post,
            [RESOURCEPATH, searchRequests, queryParams, additionalHeaders],
            { cacheResponseForSeconds: cacheSearchResultsForSeconds }
        );
    }
}
