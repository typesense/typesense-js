import ApiCall from "./ApiCall";
import { PresetSchema } from "./Preset";
import type { DocumentSchema, SearchParams } from "./Documents";
import { MultiSearchRequestsSchema } from "./MultiSearch";
import { normalizeArrayableParams } from "./Utils";

const RESOURCEPATH = "/presets";

export interface PresetCreateSchema<
  T extends DocumentSchema,
  Infix extends string,
> {
  value: SearchParams<T, Infix> | MultiSearchRequestsSchema<T, Infix>;
}

export interface PresetsRetrieveSchema<T extends DocumentSchema> {
  presets: PresetSchema<T>[];
}

export default class Presets {
  constructor(private apiCall: ApiCall) {}

  async upsert<T extends DocumentSchema, const Infix extends string>(
    presetId: string,
    params: PresetCreateSchema<T, Infix>,
  ): Promise<PresetSchema<T>> {
    if (typeof params.value === "object" && "searches" in params.value) {
      const normalizedParams = params.value.searches.map((search) =>
        normalizeArrayableParams<T, SearchParams<T, Infix>, Infix>(search),
      );

      return this.apiCall.put<PresetSchema<T>>(this.endpointPath(presetId), {
        value: { searches: normalizedParams },
      });
    }
    const normalizedParams = normalizeArrayableParams<
      T,
      SearchParams<T, Infix>,
      Infix
    >(params.value);

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
