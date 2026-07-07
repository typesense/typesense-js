import ApiCall from "./ApiCall";
import Conversations from "./Conversations";

export interface ConversationDeleteSchema {
  id: number;
}

export interface ConversationUpdateSchema {
  ttl: number;
}

export interface ConversationSchema {
  id: number;
  conversation: object[];
  last_updated: number;
  ttl: number;
}

export default class Conversation {
  constructor(
    private id: string,
    private apiCall: ApiCall,
  ) {}

  /**
   * Retrieve a conversation by ID.
   *
   * @example
   * await client.conversations("conv-1").retrieve()
   *
   * @see https://typesense.org/docs/latest/api/conversational-search-rag.html
   */
  async retrieve(): Promise<ConversationSchema[]> {
    return this.apiCall.get<ConversationSchema[]>(this.endpointPath());
  }

  /**
   * Update a conversation's TTL.
   *
   * @example
   * await client.conversations("conv-1").update({ ttl: 3600 })
   *
   * @see https://typesense.org/docs/latest/api/conversational-search-rag.html
   */
  async update(
    params: ConversationUpdateSchema,
  ): Promise<ConversationUpdateSchema> {
    return this.apiCall.put<ConversationUpdateSchema>(
      this.endpointPath(),
      params,
    );
  }

  /**
   * Delete a conversation by ID.
   *
   * @example
   * await client.conversations("conv-1").delete()
   *
   * @see https://typesense.org/docs/latest/api/conversational-search-rag.html
   */
  async delete(): Promise<ConversationDeleteSchema> {
    return this.apiCall.delete<ConversationDeleteSchema>(this.endpointPath());
  }

  private endpointPath(): string {
    return `${Conversations.RESOURCEPATH}/${encodeURIComponent(this.id)}`;
  }
}
