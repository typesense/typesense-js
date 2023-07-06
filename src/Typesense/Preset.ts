import ApiCall from "./ApiCall";
import Presets, { PresetCreateSchema } from "./Presets";

export interface PresetSchema extends PresetCreateSchema {
  id: string;
}

export interface PresetDeleteSchema {
  id: string;
}

export default class Preset {
  constructor(private presetId: string, private apiCall: ApiCall) {}

  async retrieve(): Promise<PresetSchema> {
    return this.apiCall.get<PresetSchema>(this.endpointPath());
  }

  async delete(): Promise<PresetDeleteSchema> {
    return this.apiCall.delete<PresetDeleteSchema>(this.endpointPath());
  }

  private endpointPath(): string {
    return `${Presets.RESOURCEPATH}/${this.presetId}`;
  }
}
