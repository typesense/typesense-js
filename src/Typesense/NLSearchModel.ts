import ApiCall from "./ApiCall";
import NLSearchModels from "./NLSearchModels";
import { NLSearchModelCreateSchema } from "./NLSearchModels";

export type NLSearchModelUpdateSchema = Partial<Omit<NLSearchModelCreateSchema, "id">>;

export interface NLSearchModelDeleteSchema {
  id: string;
}

export default class NLSearchModel {
  constructor(
    private id: string,
    private apiCall: ApiCall,
  ) {}

  async retrieve(): Promise<any> {
    return this.apiCall.get<any>(this.endpointPath());
  }

  async update(schema: NLSearchModelUpdateSchema): Promise<any> {
    return this.apiCall.put<any>(this.endpointPath(), schema);
  }

  async delete(): Promise<NLSearchModelDeleteSchema> {
    return this.apiCall.delete<NLSearchModelDeleteSchema>(this.endpointPath());
  }

  private endpointPath(): string {
    return `${NLSearchModels.RESOURCEPATH}/${encodeURIComponent(this.id)}`;
  }
}