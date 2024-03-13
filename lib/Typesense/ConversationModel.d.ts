import ApiCall from "./ApiCall";
export interface ConversationModelCreateSchema {
    model_name: string;
    api_key: string;
    system_prompt?: string;
    max_bytes: number;
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
