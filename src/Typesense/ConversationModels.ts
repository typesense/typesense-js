import ApiCall from "./ApiCall";
import {
  ConversationModelCreateSchema,
  ConversationModelSchema,
} from "./ConversationModel";

const RESOURCEPATH = "/conversations/models";

export default class ConversationModels {
  constructor(private readonly apiCall: ApiCall) {
    this.apiCall = apiCall;
  }

  /**
   * Create a Conversation Model
   *
   * @example
   * await client.conversations().models().create({ model_name: "openai/gpt-4", api_key: "..." })
   *
   * @see https://typesense.org/docs/latest/api/conversational-search-rag.html
   */
  async create(
    params: ConversationModelCreateSchema,
  ): Promise<ConversationModelCreateSchema> {
    return this.apiCall.post<ConversationModelCreateSchema>(
      this.endpointPath(),
      params,
    );
  }

  /**
   * Retrieve all conversation models
   *
   * @example
   * await client.conversations().models().retrieve()
   *
   * @see https://typesense.org/docs/latest/api/conversational-search-rag.html
   */
  async retrieve(): Promise<ConversationModelSchema[]> {
    return this.apiCall.get<ConversationModelSchema[]>(
      this.endpointPath(),
    );
  }

  private endpointPath(operation?: string): string {
    return `${ConversationModels.RESOURCEPATH}${
      operation === undefined ? "" : "/" + encodeURIComponent(operation)
    }`;
  }

  static get RESOURCEPATH() {
    return RESOURCEPATH;
  }
}
