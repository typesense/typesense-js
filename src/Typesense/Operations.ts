import ApiCall from "./ApiCall";

const RESOURCEPATH = "/operations";

export default class Operations {
  constructor(private apiCall: ApiCall) {}

  async perform(
    // eslint-disable-next-line @typescript-eslint/ban-types -- Can't use `object` here, it needs to intersect with `{}`
    operationName: "vote" | "snapshot" | "cache/clear" | (string & {}),
    queryParameters: Record<string, any> = {},
  ): Promise<any> {
    return this.apiCall.post(
      `${RESOURCEPATH}/${operationName}`,
      {},
      queryParameters
    );
  }
}
