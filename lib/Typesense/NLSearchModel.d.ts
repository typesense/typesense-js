import ApiCall from "./ApiCall";
import type { NLSearchModelBase, NLSearchModelSchema } from "./NLSearchModels";
type NLSearchModelUpdateSchema = NLSearchModelBase;
export interface NLSearchModelDeleteSchema {
    id: string;
}
export default class NLSearchModel {
    private id;
    private apiCall;
    constructor(id: string, apiCall: ApiCall);
    retrieve(): Promise<NLSearchModelSchema>;
    update(schema: NLSearchModelUpdateSchema): Promise<NLSearchModelSchema>;
    delete(): Promise<NLSearchModelDeleteSchema>;
    private endpointPath;
}
export {};
