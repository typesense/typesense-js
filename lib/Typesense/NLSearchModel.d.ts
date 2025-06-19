import ApiCall from "./ApiCall";
import { NLSearchModelCreateSchema } from "./NLSearchModels";
export type NLSearchModelUpdateSchema = Partial<Omit<NLSearchModelCreateSchema, "id">>;
export interface NLSearchModelDeleteSchema {
    id: string;
}
export default class NLSearchModel {
    private id;
    private apiCall;
    constructor(id: string, apiCall: ApiCall);
    retrieve(): Promise<any>;
    update(schema: NLSearchModelUpdateSchema): Promise<any>;
    delete(): Promise<NLSearchModelDeleteSchema>;
    private endpointPath;
}
