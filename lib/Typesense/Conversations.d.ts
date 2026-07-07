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
    /**
     * Retrieve all conversations.
     *
     * @example
     * await client.conversations().retrieve()
     *
     * @see https://typesense.org/docs/latest/api/conversational-search-rag.html
     */
    retrieve(): Promise<ConversationsRetrieveSchema>;
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
    static get RESOURCEPATH(): string;
}
