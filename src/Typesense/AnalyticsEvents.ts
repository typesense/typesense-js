import ApiCall from "./ApiCall";
import { AnalyticsEventCreateSchema } from "./AnalyticsEvent";

const RESOURCEPATH = "/analytics/events";

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
  constructor(private readonly apiCall: ApiCall) {
    this.apiCall = apiCall;
  }

  async create(
    params: AnalyticsEventCreateSchema,
  ): Promise<AnalyticsEventCreateSchema> {
    return this.apiCall.post<AnalyticsEventCreateSchema>(
      this.endpointPath(),
      params,
    );
  }

  async retrieve(params: {
    user_id: string;
    name: string;
    n: number;
  }): Promise<AnalyticsEventsRetrieveSchema> {
    return this.apiCall.get<AnalyticsEventsRetrieveSchema>(
      this.endpointPath(),
      params,
    );
  }

  private endpointPath(operation?: string): string {
    return `${AnalyticsEvents.RESOURCEPATH}${
      operation === undefined ? "" : "/" + encodeURIComponent(operation)
    }`;
  }

  static get RESOURCEPATH() {
    return RESOURCEPATH;
  }
}
