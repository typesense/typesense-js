import ApiCall from "./ApiCall";
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
    private id;
    private apiCall;
    constructor(id: string, apiCall: ApiCall);
    /**
     * Update a conversation model
     *
     * @example
     * await client.conversations().models("model-1").update({ model_name: "openai/gpt-4", max_bytes: 16384 })
     *
     * @see https://typesense.org/docs/latest/api/conversational-search-rag.html
     */
    update(params: ConversationModelCreateSchema): Promise<ConversationModelCreateSchema>;
    /**
     * Retrieve a conversation model
     *
     * @example
     * await client.conversations().models("model-1").retrieve()
     *
     * @see https://typesense.org/docs/latest/api/conversational-search-rag.html
     */
    retrieve(): Promise<ConversationModelSchema>;
    /**
     * Delete a conversation model
     *
     * @example
     * await client.conversations().models("model-1").delete()
     *
     * @see https://typesense.org/docs/latest/api/conversational-search-rag.html
     */
    delete(): Promise<ConversationModelDeleteSchema>;
    private endpointPath;
}
