import ApiCall from "./ApiCall";
import { AnalyticsEventCreateSchema } from "./AnalyticsEvent";
export default class AnalyticsEvents {
    private readonly apiCall;
    constructor(apiCall: ApiCall);
    create(params: AnalyticsEventCreateSchema): Promise<AnalyticsEventCreateSchema>;
    private endpointPath;
    static get RESOURCEPATH(): string;
}
