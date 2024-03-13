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
    retrieve(): Promise<ConversationSchema[]>;
    update(params: ConversationUpdateSchema): Promise<ConversationUpdateSchema>;
    delete(): Promise<ConversationDeleteSchema>;
    private endpointPath;
}
