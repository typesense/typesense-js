import ApiCall from "./ApiCall";
import { DocumentSchema } from "./Documents";
import Presets, { PresetCreateSchema } from "./Presets";

export interface PresetSchema<T extends DocumentSchema>
  extends PresetCreateSchema<T, string> {
  name: string;
}

export interface PresetDeleteSchema {
  name: string;
}

export default class Preset {
  constructor(
    private presetId: string,
    private apiCall: ApiCall,
  ) {}

  /**
   * Retrieve the details of a preset, given it's name.
   *
   * @example
   * await client.presets("listing_view").retrieve()
   *
   * @see https://typesense.org/docs/latest/api/search.html#presets
   */
  async retrieve<T extends DocumentSchema>(): Promise<PresetSchema<T>> {
    return this.apiCall.get<PresetSchema<T>>(this.endpointPath());
  }

  /**
   * Permanently deletes a preset, given it's name.
   *
   * @example
   * await client.presets("listing_view").delete()
   *
   * @see https://typesense.org/docs/latest/api/search.html#presets
   */
  async delete(): Promise<PresetDeleteSchema> {
    return this.apiCall.delete<PresetDeleteSchema>(this.endpointPath());
  }

  private endpointPath(): string {
    return `${Presets.RESOURCEPATH}/${encodeURIComponent(this.presetId)}`;
  }
}
