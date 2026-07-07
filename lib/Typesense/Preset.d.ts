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
    /**
     * Retrieve the details of a preset, given it's name.
     *
     * @example
     * await client.presets("listing_view").retrieve()
     *
     * @see https://typesense.org/docs/latest/api/search.html#presets
     */
    retrieve<T extends DocumentSchema>(): Promise<PresetSchema<T>>;
    /**
     * Permanently deletes a preset, given it's name.
     *
     * @example
     * await client.presets("listing_view").delete()
     *
     * @see https://typesense.org/docs/latest/api/search.html#presets
     */
    delete(): Promise<PresetDeleteSchema>;
    private endpointPath;
}
