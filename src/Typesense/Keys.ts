import { createHmac } from 'crypto';
import ApiCall from './ApiCall';
import { KeyCreateSchema, KeySchema } from './Key';
import { SearchParams } from './Documents';

const RESOURCEPATH = '/keys';

export interface KeysRetrieveSchema {
  keys: KeySchema[];
}

export interface GenerateScopedSearchKeyParams extends Partial<SearchParams> {
  expires_at?: number;
  cache_ttl?: number;
  limit_multi_searches?: number;
}

export default class Keys {
  constructor(private apiCall: ApiCall) {
    this.apiCall = apiCall;
  }

  async create(params: KeyCreateSchema): Promise<KeySchema> {
    return this.apiCall.post<KeySchema>(Keys.RESOURCEPATH, params);
  }

  async retrieve(): Promise<KeysRetrieveSchema> {
    return this.apiCall.get<KeysRetrieveSchema>(RESOURCEPATH);
  }

  generateScopedSearchKey(
    searchKey: string,
    parameters: GenerateScopedSearchKeyParams,
  ): string {
    // Note: only a key generated with the `documents:search` action will be
    // accepted by the server, when usined with the search endpoint.
    const paramsJSON = JSON.stringify(parameters);
    const digest = Buffer.from(
      createHmac('sha256', searchKey).update(paramsJSON).digest('base64'),
    );
    const keyPrefix = searchKey.substr(0, 4);
    const rawScopedKey = `${digest}${keyPrefix}${paramsJSON}`;

    return Buffer.from(rawScopedKey).toString('base64');
  }

  static get RESOURCEPATH() {
    return RESOURCEPATH;
  }
}
