import ApiCall from "./ApiCall";

const RESOURCEPATH = "/health";

export interface HealthResponse {
  ok: boolean;
}

export default class Health {
  constructor(private apiCall: ApiCall) {}

  /**
   * Checks if Typesense server is ready to accept requests.
   *
   * @example
   * await client.health.retrieve()
   *
   * @see https://typesense.org/docs/latest/api/cluster-operations.html#health
   */
  async retrieve(): Promise<HealthResponse> {
    return this.apiCall.get<HealthResponse>(RESOURCEPATH);
  }
}
