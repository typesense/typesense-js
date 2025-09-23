import ApiCall from "./ApiCall";
import CurationSets, { CurationObjectSchema } from "./CurationSets";

export default class CurationSetItems {
  constructor(private name: string, private apiCall: ApiCall) {}

  async retrieve(): Promise<CurationObjectSchema[]> {
    return this.apiCall.get<CurationObjectSchema[]>(this.endpointPath());
  }

  private endpointPath(operation?: string): string {
    return `${CurationSets.RESOURCEPATH}/${encodeURIComponent(this.name)}/items${
      operation === undefined ? "" : "/" + encodeURIComponent(operation)
    }`;
  }
}


