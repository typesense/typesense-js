import ApiCall from './ApiCall';
import { KeyCreateSchema, KeySchema } from './Key';
import { SearchParams } from './Documents';
export interface KeysRetrieveSchema {
    keys: KeySchema[];
}
export default class Keys {
    private apiCall;
    constructor(apiCall: ApiCall);
    create(params: KeyCreateSchema): Promise<KeySchema>;
    retrieve(): Promise<KeysRetrieveSchema>;
    generateScopedSearchKey(searchKey: string, parameters: SearchParams<any>): string;
    static get RESOURCEPATH(): string;
}
