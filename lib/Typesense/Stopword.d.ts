import ApiCall from "./ApiCall";
import { StopwordCreateSchema } from "./Stopwords";
export interface StopwordSchema extends StopwordCreateSchema {
    id: string;
    stopwords: string[];
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
