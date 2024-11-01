export interface AnalyticsEventCreateSchema {
  type: string;
  name: string;
  data: Record<string, unknown>;
}
