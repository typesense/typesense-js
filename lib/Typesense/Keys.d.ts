import ApiCall from "./ApiCall";
import { KeyCreateSchema, KeySchema } from "./Key";
import type { DocumentSchema, SearchParams } from "./Documents";
export interface KeysRetrieveSchema {
    keys: KeySchema[];
}
export interface GenerateScopedSearchKeyParams<T extends DocumentSchema> extends Partial<SearchParams<T>> {
    expires_at?: number;
    cache_ttl?: number;
    limit_multi_searches?: number;
}
export default class Keys {
    private apiCall;
    constructor(apiCall: ApiCall);
    create(params: KeyCreateSchema): Promise<KeySchema>;
    retrieve(): Promise<KeysRetrieveSchema>;
    generateScopedSearchKey<T extends DocumentSchema>(searchKey: string, parameters: GenerateScopedSearchKeyParams<T>): string;
    static get RESOURCEPATH(): string;
}
