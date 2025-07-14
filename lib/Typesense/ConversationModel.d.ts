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
    update(params: ConversationModelCreateSchema): Promise<ConversationModelCreateSchema>;
    retrieve(): Promise<ConversationModelSchema>;
    delete(): Promise<ConversationModelDeleteSchema>;
    private endpointPath;
}
