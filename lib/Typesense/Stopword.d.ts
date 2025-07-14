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
    retrieve(): Promise<StopwordSchema>;
    delete(): Promise<StopwordDeleteSchema>;
    private endpointPath;
}
