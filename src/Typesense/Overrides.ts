import ApiCall from './ApiCall'
import Collections from './Collections'
import { OverrideSchema } from './Override'

const RESOURCEPATH = '/overrides'

export interface OverrideCreateSchema {
  rule: {
    query: string
    match: 'exact' | 'contains'
  }
  includes?: [
    {
      id: string
      position: number
    }
  ]
  excludes?: [id: string]
}

export interface OverridesRetrieveSchema {
  overrides: OverrideSchema[]
}

export default class Overrides {
  constructor(private collectionName: string, private apiCall: ApiCall) {}

  async upsert(overrideId: string, params: OverrideCreateSchema): Promise<OverrideSchema> {
    return await this.apiCall.put<OverrideSchema>(this.endpointPath(overrideId), params)
  }

  async retrieve(): Promise<OverridesRetrieveSchema> {
    return await this.apiCall.get<OverridesRetrieveSchema>(this.endpointPath())
  }

  private endpointPath(operation?: string) {
    return `${Collections.RESOURCEPATH}/${this.collectionName}${Overrides.RESOURCEPATH}${
      operation === undefined ? '' : '/' + operation
    }`
  }

  static get RESOURCEPATH() {
    return RESOURCEPATH
  }
}
