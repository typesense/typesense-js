import ApiCall from "./ApiCall";

const RESOURCEPATH = "/nl_search_models";

// Base schema with all possible fields
export interface NLSearchModelBase {
  model_name: string;
  api_key?: string;
  api_url?: string;
  max_bytes?: number;
  temperature?: number;
  system_prompt?: string;
  // Google-specific parameters
  top_p?: number;
  top_k?: number;
  stop_sequences?: string[];
  api_version?: string;
  // GCP Vertex AI specific
  project_id?: string;
  access_token?: string;
  refresh_token?: string;
  client_id?: string;
  client_secret?: string;
  region?: string;
  max_output_tokens?: number;
  // Cloudflare specific
  account_id?: string;
}

export interface NLSearchModelCreateSchema extends NLSearchModelBase {
  id?: string;
}

export interface NLSearchModelSchema extends NLSearchModelBase {
  id: string;
}

export type NLSearchModelsRetrieveSchema = NLSearchModelSchema[];

export default class NLSearchModels {
  constructor(private apiCall: ApiCall) {}

  async create(
    schema: NLSearchModelCreateSchema,
  ): Promise<NLSearchModelSchema> {
    return this.apiCall.post<NLSearchModelSchema>(this.endpointPath(), schema);
  }

  async retrieve(): Promise<NLSearchModelsRetrieveSchema> {
    return this.apiCall.get<NLSearchModelsRetrieveSchema>(this.endpointPath());
  }

  private endpointPath(): string {
    return NLSearchModels.RESOURCEPATH;
  }

  static get RESOURCEPATH() {
    return RESOURCEPATH;
  }
}

