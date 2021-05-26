import ApiCall from './ApiCall'
import Collections from './Collections'
import Synonyms from './Synonyms'

export default class Synonym {
  // Todo: synonymId string or number?
  constructor(private collectionName: string, private synonymId: string, private apiCall: ApiCall) {}

  retrieve() {
    return this.apiCall.get(this._endpointPath())
  }

  delete() {
    return this.apiCall.delete(this._endpointPath())
  }

  _endpointPath() {
    return `${Collections.RESOURCEPATH}/${this.collectionName}${Synonyms.RESOURCEPATH}/${this.synonymId}`
  }
}
