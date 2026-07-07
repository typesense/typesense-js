import ApiCall from "./ApiCall";
import ConversationModels from "./ConversationModels";
import ConversationModel from "./ConversationModel";
import { ConversationSchema } from "./Conversation";

const RESOURCEPATH = "/conversations";

export interface ConversationsRetrieveSchema {
  conversations: ConversationSchema[];
}

export default class Conversations {
  private readonly _conversationsModels: ConversationModels;
  private readonly individualConversationModels: Record<
    string,
    ConversationModel
  > = {};

  constructor(private readonly apiCall: ApiCall) {
    this.apiCall = apiCall;
    this._conversationsModels = new ConversationModels(this.apiCall);
  }

  /**
   * Retrieve all conversations.
   *
   * @example
   * await client.conversations().retrieve()
   *
   * @see https://typesense.org/docs/latest/api/conversational-search-rag.html
   */
  async retrieve(): Promise<ConversationsRetrieveSchema> {
    return this.apiCall.get<ConversationsRetrieveSchema>(RESOURCEPATH);
  }

  /**
   * Access the conversation models resource. Call without arguments to list or create models, or pass an ID to access a single model.
   *
   * @example
   * await client.conversations().models().create({ model_name: "openai/gpt-4", api_key: "..." })
   * @example
   * await client.conversations().models("model-1").retrieve()
   *
   * @see https://typesense.org/docs/latest/api/conversational-search-rag.html
   */
  models(): ConversationModels;
  /**
   * Access an individual conversation model by ID.
   *
   * @example
   * await client.conversations().models("model-1").retrieve()
   *
   * @see https://typesense.org/docs/latest/api/conversational-search-rag.html
   */
  models(id: string): ConversationModel;
  models(id?: string): ConversationModels | ConversationModel {
    if (id === undefined) {
      return this._conversationsModels;
    } else {
      if (this.individualConversationModels[id] === undefined) {
        this.individualConversationModels[id] = new ConversationModel(
          id,
          this.apiCall,
        );
      }
      return this.individualConversationModels[id];
    }
  }

  static get RESOURCEPATH() {
    return RESOURCEPATH;
  }
}
