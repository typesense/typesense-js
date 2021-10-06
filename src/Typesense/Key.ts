import ApiCall from './ApiCall'
import Keys from './Keys'

export interface KeyCreateSchema {
  actions: string[]
  collections: string[]
  description?: string
  value?: string
  expires_at?: number
}

export interface KeyDeleteSchema {
  id: number
}

export interface KeySchema extends KeyCreateSchema {
  id: number
}

export default class Key {
  constructor(private id: string, private apiCall: ApiCall) {}

  async retrieve(): Promise<KeySchema> {
    return await this.apiCall.get<KeySchema>(this._endpointPath())
  }

  async delete(): Promise<KeyDeleteSchema> {
    return await this.apiCall.delete<KeyDeleteSchema>(this._endpointPath())
  }

  _endpointPath() {
    return `${Keys.RESOURCEPATH}/${this.id}`
  }
}
