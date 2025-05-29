import ApiCall from "./ApiCall";
import { DocumentSchema } from "./Documents";
import { PresetCreateSchema } from "./Presets";
export interface PresetSchema<T extends DocumentSchema> extends PresetCreateSchema<T, string> {
    name: string;
}
export interface PresetDeleteSchema {
    name: string;
}
export default class Preset {
    private presetId;
    private apiCall;
    constructor(presetId: string, apiCall: ApiCall);
    retrieve<T extends DocumentSchema>(): Promise<PresetSchema<T>>;
    delete(): Promise<PresetDeleteSchema>;
    private endpointPath;
}
