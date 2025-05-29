import ApiCall from "./ApiCall";
import { ConversationModelCreateSchema, ConversationModelSchema } from "./ConversationModel";
export default class ConversationModels {
    private readonly apiCall;
    constructor(apiCall: ApiCall);
    create(params: ConversationModelCreateSchema): Promise<ConversationModelCreateSchema>;
    retrieve(): Promise<ConversationModelSchema[]>;
    private endpointPath;
    static get RESOURCEPATH(): string;
}
