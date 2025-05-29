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

  async retrieve<T extends DocumentSchema>(): Promise<PresetSchema<T>> {
    return this.apiCall.get<PresetSchema<T>>(this.endpointPath());
  }

  async delete(): Promise<PresetDeleteSchema> {
    return this.apiCall.delete<PresetDeleteSchema>(this.endpointPath());
  }

  private endpointPath(): string {
    return `${Presets.RESOURCEPATH}/${encodeURIComponent(this.presetId)}`;
  }
}
