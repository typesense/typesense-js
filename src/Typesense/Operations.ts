import ApiCall from "./ApiCall";

const RESOURCEPATH = "/operations";

export default class Operations {
  constructor(private apiCall: ApiCall) {}

  async perform(
    queryParameters: Record<string, any> = {},
    // eslint-disable-next-line @typescript-eslint/ban-types -- Can't use `object` here, it needs to intersect with `{}`
    operationName: "vote" | "snapshot" | "cache/clear" | (string & {}),
  ): Promise<any> {
    return this.apiCall.post(
      `${RESOURCEPATH}/${operationName}`,
      {},
      queryParameters
    );
  }
}
