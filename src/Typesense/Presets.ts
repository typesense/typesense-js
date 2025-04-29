import ApiCall from "./ApiCall";
import { PresetSchema } from "./Preset";
import type { DocumentSchema, SearchParams } from "./Documents";
import { MultiSearchRequestsSchema } from "./MultiSearch";
import { normalizeArrayableParams } from "./Utils";

const RESOURCEPATH = "/presets";

export interface PresetCreateSchema<T extends DocumentSchema> {
  value: SearchParams<T> | MultiSearchRequestsSchema<T>;
}

export interface PresetsRetrieveSchema<T extends DocumentSchema> {
  presets: PresetSchema<T>[];
}

export default class Presets {
  constructor(private apiCall: ApiCall) {}

  async upsert<T extends DocumentSchema>(
    presetId: string,
    params: PresetCreateSchema<T>,
  ): Promise<PresetSchema<T>> {
    if (typeof params.value === "object" && "searches" in params.value) {
      const normalizedParams = params.value.searches.map((search) =>
        normalizeArrayableParams<T, SearchParams<T>>(search),
      );

      return this.apiCall.put<PresetSchema<T>>(this.endpointPath(presetId), {
        value: { searches: normalizedParams },
      });
    }
    const normalizedParams = normalizeArrayableParams<T, SearchParams<T>>(
      params.value,
    );

    return this.apiCall.put<PresetSchema<T>>(this.endpointPath(presetId), {
      value: normalizedParams,
    });
  }

  async retrieve<T extends DocumentSchema>(): Promise<
    PresetsRetrieveSchema<T>
  > {
    return this.apiCall.get<PresetsRetrieveSchema<T>>(this.endpointPath());
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
