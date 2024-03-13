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

  async retrieve(): Promise<ConversationsRetrieveSchema> {
    return this.apiCall.get<ConversationsRetrieveSchema>(RESOURCEPATH);
  }

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
