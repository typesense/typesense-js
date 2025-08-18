import ApiCall from "./ApiCall";
import SynonymSets from "./SynonymSets";
import type { SynonymSetCreateSchema, SynonymSetSchema } from "./SynonymSets";

export interface SynonymSetDeleteSchema {
  name: string;
}

export type SynonymSetRetrieveSchema = SynonymSetCreateSchema;

export default class SynonymSet {
  constructor(
    private synonymSetName: string,
    private apiCall: ApiCall,
  ) {}

  async upsert(
    params: SynonymSetCreateSchema,
  ): Promise<SynonymSetCreateSchema> {
    return this.apiCall.put<SynonymSetSchema>(this.endpointPath(), params);
  }

  async retrieve(): Promise<SynonymSetRetrieveSchema> {
    return this.apiCall.get<SynonymSetRetrieveSchema>(this.endpointPath());
  }

  async delete(): Promise<SynonymSetDeleteSchema> {
    return this.apiCall.delete<SynonymSetDeleteSchema>(this.endpointPath());
  }

  private endpointPath(): string {
    return `${SynonymSets.RESOURCEPATH}/${encodeURIComponent(this.synonymSetName)}`;
  }
}
