import ApiCall from "./ApiCall";

const RESOURCEPATH = "/debug";

export interface DebugResponseSchema {
  state: number;
  version: string;
}

export default class Debug {
  constructor(private apiCall: ApiCall) {}

  /**
   * Retrieve server version and state information.
   *
   * @example
   * await client.debug.retrieve()
   *
   * @see https://typesense.org/docs/latest/api/cluster-operations.html#debug
   */
  async retrieve(): Promise<DebugResponseSchema> {
    return this.apiCall.get<DebugResponseSchema>(RESOURCEPATH);
  }
}
