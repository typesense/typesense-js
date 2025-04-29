import ApiCall from "./ApiCall";
import { PresetSchema } from "./Preset";
import type { DocumentSchema, SearchParams } from "./Documents";
import { MultiSearchRequestsSchema } from "./MultiSearch";
export interface PresetCreateSchema<T extends DocumentSchema> {
    value: SearchParams<T> | MultiSearchRequestsSchema<T>;
}
export interface PresetsRetrieveSchema<T extends DocumentSchema> {
    presets: PresetSchema<T>[];
}
export default class Presets {
    private apiCall;
    constructor(apiCall: ApiCall);
    upsert<T extends DocumentSchema>(presetId: string, params: PresetCreateSchema<T>): Promise<PresetSchema<T>>;
    retrieve<T extends DocumentSchema>(): Promise<PresetsRetrieveSchema<T>>;
    private endpointPath;
    static get RESOURCEPATH(): string;
}
