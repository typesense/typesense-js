import ApiCall from "./ApiCall";
import ConversationModels from "./ConversationModels";
import ConversationModel from "./ConversationModel";
import { ConversationSchema } from "./Conversation";
export interface ConversationsRetrieveSchema {
    conversations: ConversationSchema[];
}
export default class Conversations {
    private readonly apiCall;
    private readonly _conversationsModels;
    private readonly individualConversationModels;
    constructor(apiCall: ApiCall);
    retrieve(): Promise<ConversationsRetrieveSchema>;
    models(id?: string): ConversationModels | ConversationModel;
    static get RESOURCEPATH(): string;
}
