import ApiCall from "./ApiCall";
import CurationSets from "./CurationSets";
import type { CurationObjectSchema } from "./CurationSets";

export interface CurationItemDeleteResponseSchema {
  id: string;
}

export default class CurationSetItem {
  constructor(
    private name: string,
    private itemId: string,
    private apiCall: ApiCall,
  ) {}

  async retrieve(): Promise<CurationObjectSchema> {
    return this.apiCall.get<CurationObjectSchema>(this.endpointPath());
  }

  async upsert(params: CurationObjectSchema): Promise<CurationObjectSchema> {
    return this.apiCall.put<CurationObjectSchema>(this.endpointPath(), params);
  }

  async delete(): Promise<CurationItemDeleteResponseSchema> {
    return this.apiCall.delete<CurationItemDeleteResponseSchema>(
      this.endpointPath(),
    );
  }

  private endpointPath(): string {
    return `${CurationSets.RESOURCEPATH}/${encodeURIComponent(
      this.name,
    )}/items/${encodeURIComponent(this.itemId)}`;
  }
}
