import ApiCall from "./ApiCall";
export interface StopwordSchema {
    id: string;
    stopwords: string[] | {
        id: string;
        stopwords: string[];
    };
    locale?: string;
}
export interface StopwordDeleteSchema {
    id: string;
}
export default class Stopword {
    private stopwordId;
    private apiCall;
    constructor(stopwordId: string, apiCall: ApiCall);
    /**
     * Retrieve the details of a stopwords set, given it's name.
     *
     * @example
     * await client.stopwords("en").retrieve()
     *
     * @see https://typesense.org/docs/latest/api/stopwords.html
     */
    retrieve(): Promise<StopwordSchema>;
    /**
     * Permanently deletes a stopwords set, given it's name.
     *
     * @example
     * await client.stopwords("en").delete()
     *
     * @see https://typesense.org/docs/latest/api/stopwords.html
     */
    delete(): Promise<StopwordDeleteSchema>;
    private endpointPath;
}
