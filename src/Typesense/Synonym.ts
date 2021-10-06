import ApiCall from './ApiCall'
import Collections from './Collections'
import Synonyms, { SynonymCreateSchema } from './Synonyms'

export interface SynonymSchema extends SynonymCreateSchema {
  id: string
}

export interface SynonymDeleteSchema {
  id: string
}

export default class Synonym {
  constructor(private collectionName: string, private synonymId: string, private apiCall: ApiCall) {}

  async retrieve(): Promise<SynonymSchema> {
    return await this.apiCall.get<SynonymSchema>(this._endpointPath())
  }

  async delete(): Promise<SynonymDeleteSchema> {
    return await this.apiCall.delete<SynonymDeleteSchema>(this._endpointPath())
  }

  _endpointPath() {
    return `${Collections.RESOURCEPATH}/${this.collectionName}${Synonyms.RESOURCEPATH}/${this.synonymId}`
  }
}
