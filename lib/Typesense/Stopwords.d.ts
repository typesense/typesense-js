import ApiCall from "./ApiCall";
import { StopwordSchema } from "./Stopword";
export interface StopwordCreateSchema {
    stopwords: string[];
    locale?: string;
}
export interface StopwordsRetrieveSchema {
    stopwords: StopwordSchema[];
}
export default class Stopwords {
    private apiCall;
    constructor(apiCall: ApiCall);
    /**
     * Upserts a stopwords set.
     *
     * @example
     * await client.stopwords().upsert("en", { stopwords: ["a", "the"] })
     *
     * @see https://typesense.org/docs/latest/api/stopwords.html
     */
    upsert(stopwordId: string, params: StopwordCreateSchema): Promise<StopwordSchema>;
    /**
     * Retrieve the details of all stopwords sets
     *
     * @example
     * await client.stopwords().retrieve()
     *
     * @see https://typesense.org/docs/latest/api/stopwords.html
     */
    retrieve(): Promise<StopwordsRetrieveSchema>;
    private endpointPath;
    static get RESOURCEPATH(): string;
}
