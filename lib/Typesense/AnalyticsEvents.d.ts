import ApiCall from "./ApiCall";
import { AnalyticsEventCreateSchema } from "./AnalyticsEvent";
export interface AnalyticsEventsRetrieveSchema {
    events: {
        name: string;
        event_type: string;
        collection: string;
        timestamp: number;
        user_id: string;
        doc_id?: string;
        doc_ids?: string[];
        query?: string;
    }[];
}
export default class AnalyticsEvents {
    private readonly apiCall;
    constructor(apiCall: ApiCall);
    create(params: AnalyticsEventCreateSchema): Promise<AnalyticsEventCreateSchema>;
    retrieve(params: {
        user_id: string;
        name: string;
        n: number;
    }): Promise<AnalyticsEventsRetrieveSchema>;
    private endpointPath;
    static get RESOURCEPATH(): string;
}
