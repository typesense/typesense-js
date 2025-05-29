import ApiCall from "./ApiCall";
export interface KeyCreateSchema {
    actions: Actions[] | (string & {})[];
    collections: string[];
    description?: string;
    value?: string;
    value_prefix?: string;
    expires_at?: number;
    autodelete?: boolean;
}
type CRUDActions = "create" | "delete" | "get" | "list" | "*";
type DocumentActionTypes = "search" | "get" | "create" | "upsert" | "update" | "delete" | "import" | "export" | "*";
type CRUDFeatures = "collections" | "aliases" | "synonyms" | "overrides" | "stopwords" | "keys" | "analytics" | "analytics/rules";
type FeatureActions = `${CRUDFeatures}:${CRUDActions}`;
type DocumentActions = `documents:${DocumentActionTypes}`;
type AnalyticsEventActions = "analytics/events:create";
type MiscActions = `${`metrics.json` | `stats.json` | `debug`}.list` | "*";
export type Actions = FeatureActions | DocumentActions | AnalyticsEventActions | MiscActions;
export interface KeyDeleteSchema {
    id: number;
}
export interface KeySchema extends KeyCreateSchema {
    id: number;
}
export default class Key {
    private id;
    private apiCall;
    constructor(id: number, apiCall: ApiCall);
    retrieve(): Promise<KeySchema>;
    delete(): Promise<KeyDeleteSchema>;
    private endpointPath;
}
export {};
