import ApiCall from "./ApiCall";
import { ConversationModelCreateSchema, ConversationModelSchema } from "./ConversationModel";
export default class ConversationModels {
    private readonly apiCall;
    constructor(apiCall: ApiCall);
    /**
     * Create a Conversation Model
     *
     * @example
     * await client.conversations().models().create({ model_name: "openai/gpt-4", api_key: "..." })
     *
     * @see https://typesense.org/docs/latest/api/conversational-search-rag.html
     */
    create(params: ConversationModelCreateSchema): Promise<ConversationModelCreateSchema>;
    /**
     * Retrieve all conversation models
     *
     * @example
     * await client.conversations().models().retrieve()
     *
     * @see https://typesense.org/docs/latest/api/conversational-search-rag.html
     */
    retrieve(): Promise<ConversationModelSchema[]>;
    private endpointPath;
    static get RESOURCEPATH(): string;
}
