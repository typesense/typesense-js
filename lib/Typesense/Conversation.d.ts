import ApiCall from "./ApiCall";
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
    private id;
    private apiCall;
    constructor(id: string, apiCall: ApiCall);
    /**
     * Retrieve a conversation by ID.
     *
     * @example
     * await client.conversations("conv-1").retrieve()
     *
     * @see https://typesense.org/docs/latest/api/conversational-search-rag.html
     */
    retrieve(): Promise<ConversationSchema[]>;
    /**
     * Update a conversation's TTL.
     *
     * @example
     * await client.conversations("conv-1").update({ ttl: 3600 })
     *
     * @see https://typesense.org/docs/latest/api/conversational-search-rag.html
     */
    update(params: ConversationUpdateSchema): Promise<ConversationUpdateSchema>;
    /**
     * Delete a conversation by ID.
     *
     * @example
     * await client.conversations("conv-1").delete()
     *
     * @see https://typesense.org/docs/latest/api/conversational-search-rag.html
     */
    delete(): Promise<ConversationDeleteSchema>;
    private endpointPath;
}
