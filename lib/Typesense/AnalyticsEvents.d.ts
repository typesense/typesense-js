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
    /**
     * Submit a single analytics event. The event must correspond to an existing analytics rule by name.
     *
     * @example
     * await client.analytics.events().create({ type: "click", name: "products_click", data: {} })
     *
     * @see https://typesense.org/docs/latest/api/analytics-query-suggestions.html
     */
    create(params: AnalyticsEventCreateSchema): Promise<AnalyticsEventCreateSchema>;
    /**
     * Retrieve the most recent events for a user and rule.
     *
     * @example
     * await client.analytics.events().retrieve({ user_id: "u1", name: "products_click", n: 10 })
     *
     * @see https://typesense.org/docs/latest/api/analytics-query-suggestions.html
     */
    retrieve(params: {
        user_id: string;
        name: string;
        n: number;
    }): Promise<AnalyticsEventsRetrieveSchema>;
    private endpointPath;
    static get RESOURCEPATH(): string;
}
