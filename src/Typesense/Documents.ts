import ApiCall from "./ApiCall";
import Collections from "./Collections";
import Configuration from "./Configuration";
import RequestWithCache from "./RequestWithCache";

const RESOURCEPATH = "/documents";

export default class Documents {
    private requestWithCache: RequestWithCache;

    constructor(private collectionName: string, private apiCall: ApiCall, private configuration: Configuration) {
        this.requestWithCache = new RequestWithCache();
    }

    create(document, options = {}) {
        return this.apiCall.post(this.endpointPath(), document, options);
    }

    upsert(document, options = {}) {
        return this.apiCall.post(this.endpointPath(), document, Object.assign({}, options, { action: "upsert" }));
    }

    update(document, options = {}) {
        return this.apiCall.post(this.endpointPath(), document, Object.assign({}, options, { action: "update" }));
    }

    delete(queryParameters = {}) {
        return this.apiCall.delete(this.endpointPath(), queryParameters);
    }

    async createMany(documents, options = {}) {
        this.configuration.logger.warn(
            "createMany is deprecated and will be removed in a future version. Use import instead, which now takes both an array of documents or a JSONL string of documents"
        );
        return this.import(documents, options);
    }

    /**
     * Import a set of documents in a batch.
     * @param {string|Array} documents - Can be a JSONL string of documents or an array of document objects.
     * @return {string|Array} Returns a JSONL string if the input was a JSONL string, otherwise it returns an array of results.
     */
    async import(documents: any, options = {}) {
        let documentsInJSONLFormat;
        if (Array.isArray(documents)) {
            documentsInJSONLFormat = documents.map((document) => JSON.stringify(document)).join("\n");
        } else {
            documentsInJSONLFormat = documents;
        }

        const resultsInJSONLFormat = await this.apiCall.performRequest<string>("post", this.endpointPath("import"), {
            queryParameters: options,
            bodyParameters: documentsInJSONLFormat,
            additionalHeaders: { "Content-Type": "text/plain" },
        });

        if (Array.isArray(documents)) {
            return resultsInJSONLFormat.split("\n").map((r) => JSON.parse(r));
        } else {
            return resultsInJSONLFormat;
        }
    }

    export() {
        return this.apiCall.get(this.endpointPath("export"));
    }

    search(searchParameters, { cacheSearchResultsForSeconds = this.configuration.cacheSearchResultsForSeconds } = {}) {
        let additionalQueryParams = {};
        if (this.configuration.useServerSideSearchCache === true) {
            additionalQueryParams["usecache"] = true;
        }
        const queryParams = Object.assign({}, searchParameters, additionalQueryParams);

        return this.requestWithCache.perform(
            this.apiCall,
            this.apiCall.get,
            [this.endpointPath("search"), queryParams],
            { cacheResponseForSeconds: cacheSearchResultsForSeconds }
        );
    }

    private endpointPath(operation?: string) {
        return `${Collections.RESOURCEPATH}/${this.collectionName}${Documents.RESOURCEPATH}${
            operation === undefined ? "" : "/" + operation
        }`;
    }

    static get RESOURCEPATH() {
        return RESOURCEPATH;
    }
}
