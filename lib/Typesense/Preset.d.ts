import ApiCall from "./ApiCall";
import { PresetCreateSchema } from "./Presets";
export interface PresetSchema extends PresetCreateSchema {
    id: string;
}
export interface PresetDeleteSchema {
    id: string;
}
export default class Preset {
    private presetId;
    private apiCall;
    constructor(presetId: string, apiCall: ApiCall);
    retrieve(): Promise<PresetSchema>;
    delete(): Promise<PresetDeleteSchema>;
    private endpointPath;
}
