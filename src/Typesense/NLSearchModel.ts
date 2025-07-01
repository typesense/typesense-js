import ApiCall from "./ApiCall";
import NLSearchModels from "./NLSearchModels";
import type { NLSearchModelBase, NLSearchModelSchema } from "./NLSearchModels";

type NLSearchModelUpdateSchema = NLSearchModelBase;

export interface NLSearchModelDeleteSchema {
  id: string;
}

export default class NLSearchModel {
  constructor(
    private id: string,
    private apiCall: ApiCall,
  ) {}

  async retrieve(): Promise<NLSearchModelSchema> {
    return this.apiCall.get<NLSearchModelSchema>(this.endpointPath());
  }

  async update(
    schema: NLSearchModelUpdateSchema,
  ): Promise<NLSearchModelSchema> {
    return this.apiCall.put<NLSearchModelSchema>(this.endpointPath(), schema);
  }

  async delete(): Promise<NLSearchModelDeleteSchema> {
    return this.apiCall.delete<NLSearchModelDeleteSchema>(this.endpointPath());
  }

  private endpointPath(): string {
    return `${NLSearchModels.RESOURCEPATH}/${encodeURIComponent(this.id)}`;
  }
}

