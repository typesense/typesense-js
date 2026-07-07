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

  /**
   * Retrieve a specific NL search model by its ID.
   *
   * @example
   * await client.nlSearchModels("model-1").retrieve()
   *
   * @see https://typesense.org/docs/latest/api/natural-language-search.html
   */
  async retrieve(): Promise<NLSearchModelSchema> {
    return this.apiCall.get<NLSearchModelSchema>(this.endpointPath());
  }

  /**
   * Update an existing NL search model.
   *
   * @example
   * await client.nlSearchModels("model-1").update({ model_name: "openai/gpt-4" })
   *
   * @see https://typesense.org/docs/latest/api/natural-language-search.html
   */
  async update(
    schema: NLSearchModelUpdateSchema,
  ): Promise<NLSearchModelSchema> {
    return this.apiCall.put<NLSearchModelSchema>(this.endpointPath(), schema);
  }

  /**
   * Delete a specific NL search model by its ID.
   *
   * @example
   * await client.nlSearchModels("model-1").delete()
   *
   * @see https://typesense.org/docs/latest/api/natural-language-search.html
   */
  async delete(): Promise<NLSearchModelDeleteSchema> {
    return this.apiCall.delete<NLSearchModelDeleteSchema>(this.endpointPath());
  }

  private endpointPath(): string {
    return `${NLSearchModels.RESOURCEPATH}/${encodeURIComponent(this.id)}`;
  }
}

