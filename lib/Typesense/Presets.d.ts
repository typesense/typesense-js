import ApiCall from "./ApiCall";
import { PresetSchema } from "./Preset";
import { SearchParams } from "./Documents";
import { MultiSearchRequestsSchema } from "./MultiSearch";
export interface PresetCreateSchema {
    value: SearchParams | MultiSearchRequestsSchema;
}
export interface PresetsRetrieveSchema {
    presets: PresetSchema[];
}
export default class Presets {
    private apiCall;
    constructor(apiCall: ApiCall);
    upsert(presetId: string, params: PresetCreateSchema): Promise<PresetSchema>;
    retrieve(): Promise<PresetsRetrieveSchema>;
    private endpointPath;
    static get RESOURCEPATH(): string;
}
