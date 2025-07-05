import ApiCall from "./ApiCall";
export interface NLSearchModelBase {
    model_name: string;
    api_key?: string;
    api_url?: string;
    max_bytes?: number;
    temperature?: number;
    system_prompt?: string;
    top_p?: number;
    top_k?: number;
    stop_sequences?: string[];
    api_version?: string;
    project_id?: string;
    access_token?: string;
    refresh_token?: string;
    client_id?: string;
    client_secret?: string;
    region?: string;
    max_output_tokens?: number;
    account_id?: string;
}
export interface NLSearchModelCreateSchema extends NLSearchModelBase {
    id?: string;
}
export interface NLSearchModelSchema extends NLSearchModelBase {
    id: string;
}
export type NLSearchModelsRetrieveSchema = NLSearchModelSchema[];
export default class NLSearchModels {
    private apiCall;
    constructor(apiCall: ApiCall);
    create(schema: NLSearchModelCreateSchema): Promise<NLSearchModelSchema>;
    retrieve(): Promise<NLSearchModelsRetrieveSchema>;
    private endpointPath;
    static get RESOURCEPATH(): string;
}
