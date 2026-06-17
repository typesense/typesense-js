import ApiCall from "./ApiCall";
import { PresetSchema } from "./Preset";
import type { DocumentSchema, SearchParams } from "./Documents";
import { MultiSearchRequestsSchema } from "./MultiSearch";
export interface PresetCreateSchema<T extends DocumentSchema, Infix extends string> {
    value: SearchParams<T, Infix> | MultiSearchRequestsSchema<T, Infix>;
}
export interface PresetsRetrieveSchema<T extends DocumentSchema> {
    presets: PresetSchema<T>[];
}
export default class Presets {
    private apiCall;
    constructor(apiCall: ApiCall);
    /**
     * Create or update an existing preset.
     *
     * @example
     * await client.presets().upsert("listing_view", { value: { q: "*" } })
     *
     * @see https://typesense.org/docs/latest/api/search.html#presets
     */
    upsert<T extends DocumentSchema, const Infix extends string>(presetId: string, params: PresetCreateSchema<T, Infix>): Promise<PresetSchema<T>>;
    /**
     * Retrieve the details of all presets
     *
     * @example
     * await client.presets().retrieve()
     *
     * @see https://typesense.org/docs/latest/api/search.html#presets
     */
    retrieve<T extends DocumentSchema>(): Promise<PresetsRetrieveSchema<T>>;
    private endpointPath;
    static get RESOURCEPATH(): string;
}
