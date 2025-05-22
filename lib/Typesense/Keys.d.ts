import ApiCall from "./ApiCall";
import { KeyCreateSchema, KeySchema } from "./Key";
import type { DocumentSchema, SearchParams } from "./Documents";
export interface KeysRetrieveSchema {
    keys: KeySchema[];
}
export interface GenerateScopedSearchKeyParams<T extends DocumentSchema, Infix extends string> extends Partial<SearchParams<T, Infix>> {
    expires_at?: number;
    cache_ttl?: number;
    limit_multi_searches?: number;
}
export default class Keys {
    private apiCall;
    constructor(apiCall: ApiCall);
    create(params: KeyCreateSchema): Promise<KeySchema>;
    retrieve(): Promise<KeysRetrieveSchema>;
    generateScopedSearchKey<T extends DocumentSchema, const Infix extends string>(searchKey: string, parameters: GenerateScopedSearchKeyParams<T, Infix>): string;
    static get RESOURCEPATH(): string;
}
