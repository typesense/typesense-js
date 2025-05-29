import ApiCall from "./ApiCall";
import Keys from "./Keys";

export interface KeyCreateSchema {
  // eslint-disable-next-line @typescript-eslint/ban-types
  actions: Actions[] | (string & {})[];
  collections: string[];
  description?: string;
  value?: string;
  value_prefix?: string;
  expires_at?: number;
  autodelete?: boolean;
}

type CRUDActions = "create" | "delete" | "get" | "list" | "*";
type DocumentActionTypes =
  | "search"
  | "get"
  | "create"
  | "upsert"
  | "update"
  | "delete"
  | "import"
  | "export"
  | "*";

type CRUDFeatures =
  | "collections"
  | "aliases"
  | "synonyms"
  | "overrides"
  | "stopwords"
  | "keys"
  | "analytics"
  | "analytics/rules";

type FeatureActions = `${CRUDFeatures}:${CRUDActions}`;
type DocumentActions = `documents:${DocumentActionTypes}`;
type AnalyticsEventActions = "analytics/events:create";
type MiscActions = `${`metrics.json` | `stats.json` | `debug`}.list` | "*";

export type Actions =
  | FeatureActions
  | DocumentActions
  | AnalyticsEventActions
  | MiscActions;

export interface KeyDeleteSchema {
  id: number;
}

export interface KeySchema extends KeyCreateSchema {
  id: number;
}

export default class Key {
  constructor(
    private id: number,
    private apiCall: ApiCall,
  ) {}

  async retrieve(): Promise<KeySchema> {
    return this.apiCall.get<KeySchema>(this.endpointPath());
  }

  async delete(): Promise<KeyDeleteSchema> {
    return this.apiCall.delete<KeyDeleteSchema>(this.endpointPath());
  }

  private endpointPath(): string {
    return `${Keys.RESOURCEPATH}/${encodeURIComponent(this.id)}`;
  }
}
