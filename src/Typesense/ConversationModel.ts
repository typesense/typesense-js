import ApiCall from "./ApiCall";
import ConversationModels from "./ConversationModels";

export interface ConversationModelCreateSchema {
  id?: string;
  model_name: string;
  api_key?: string;
  system_prompt?: string;
  max_bytes: number;
  history_collection?: string;
  account_id?: string;
  url?: string;
  ttl?: number;
  vllm_url?: string;
  openai_url?: string;
  openai_path?: string;
}

export interface ConversationModelDeleteSchema {
  id: string;
}

export interface ConversationModelSchema extends ConversationModelCreateSchema {
  id: string;
}

export default class ConversationModel {
  constructor(
    private id: string,
    private apiCall: ApiCall,
  ) {}

  /**
   * Update a conversation model
   *
   * @example
   * await client.conversations().models("model-1").update({ model_name: "openai/gpt-4", max_bytes: 16384 })
   *
   * @see https://typesense.org/docs/latest/api/conversational-search-rag.html
   */
  async update(
    params: ConversationModelCreateSchema,
  ): Promise<ConversationModelCreateSchema> {
    return this.apiCall.put<ConversationModelCreateSchema>(
      this.endpointPath(),
      params,
    );
  }

  /**
   * Retrieve a conversation model
   *
   * @example
   * await client.conversations().models("model-1").retrieve()
   *
   * @see https://typesense.org/docs/latest/api/conversational-search-rag.html
   */
  async retrieve(): Promise<ConversationModelSchema> {
    return this.apiCall.get<ConversationModelSchema>(this.endpointPath());
  }

  /**
   * Delete a conversation model
   *
   * @example
   * await client.conversations().models("model-1").delete()
   *
   * @see https://typesense.org/docs/latest/api/conversational-search-rag.html
   */
  async delete(): Promise<ConversationModelDeleteSchema> {
    return this.apiCall.delete<ConversationModelDeleteSchema>(
      this.endpointPath(),
    );
  }

  private endpointPath(): string {
    return `${ConversationModels.RESOURCEPATH}/${encodeURIComponent(this.id)}`;
  }
}
