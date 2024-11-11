import ApiCall from "./ApiCall";
import { PresetSchema } from "./Preset";
import { SearchParams } from "./Documents";
import { MultiSearchRequestsSchema } from "./MultiSearch";
import { normalizeArrayableParams } from "./Utils";

const RESOURCEPATH = "/presets";

export interface PresetCreateSchema {
  value: SearchParams | MultiSearchRequestsSchema;
}

export interface PresetsRetrieveSchema {
  presets: PresetSchema[];
}

export default class Presets {
  constructor(private apiCall: ApiCall) {}

  async upsert(
    presetId: string,
    params: PresetCreateSchema,
  ): Promise<PresetSchema> {
    if (typeof params.value === "object" && "searches" in params.value) {
      const normalizedParams = params.value.searches.map((search) =>
        normalizeArrayableParams(search),
      );

      return this.apiCall.put<PresetSchema>(this.endpointPath(presetId), {
        value: { searches: normalizedParams },
      });
    }
    const normalizedParams = normalizeArrayableParams(params.value);

    return this.apiCall.put<PresetSchema>(this.endpointPath(presetId), {
      value: normalizedParams,
    });
  }

  async retrieve(): Promise<PresetsRetrieveSchema> {
    return this.apiCall.get<PresetsRetrieveSchema>(this.endpointPath());
  }

  private endpointPath(operation?: string): string {
    return `${Presets.RESOURCEPATH}${
      operation === undefined ? "" : "/" + encodeURIComponent(operation)
    }`;
  }

  static get RESOURCEPATH(): string {
    return RESOURCEPATH;
  }
}
