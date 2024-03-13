import ApiCall from "./ApiCall";
import { ConversationModelCreateSchema, ConversationModelSchema } from "./ConversationModel";
export interface ConversationModelsRetrieveSchema {
    models: ConversationModelSchema[];
}
export default class ConversationModels {
    private readonly apiCall;
    constructor(apiCall: ApiCall);
    create(params: ConversationModelCreateSchema): Promise<ConversationModelCreateSchema>;
    retrieve(): Promise<ConversationModelsRetrieveSchema>;
    private endpointPath;
    static get RESOURCEPATH(): string;
}
