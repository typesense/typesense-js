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
    upsert(stopwordId: string, params: StopwordCreateSchema): Promise<StopwordSchema>;
    retrieve(): Promise<StopwordsRetrieveSchema>;
    private endpointPath;
    static get RESOURCEPATH(): string;
}
