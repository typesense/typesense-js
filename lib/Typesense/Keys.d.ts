import ApiCall from "./ApiCall";
import { KeyCreateSchema, KeySchema } from "./Key";
import { SearchParams } from "./Documents";
export interface KeysRetrieveSchema {
    keys: KeySchema[];
}
export interface GenerateScopedSearchKeyParams extends Partial<SearchParams> {
    expires_at?: number;
    cache_ttl?: number;
    limit_multi_searches?: number;
}
export default class Keys {
    private apiCall;
    constructor(apiCall: ApiCall);
    create(params: KeyCreateSchema): Promise<KeySchema>;
    retrieve(): Promise<KeysRetrieveSchema>;
    generateScopedSearchKey(searchKey: string, parameters: GenerateScopedSearchKeyParams): string;
    static get RESOURCEPATH(): string;
}
