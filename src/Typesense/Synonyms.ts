import ApiCall from './ApiCall'
import Collections from './Collections'

const RESOURCEPATH = '/synonyms'

export default class Synonyms {
  constructor(private collectionName: string, private apiCall: ApiCall) {}

  upsert(synonymId, params) {
    return this.apiCall.put(this.endpointPath(synonymId), params)
  }

  retrieve() {
    return this.apiCall.get(this.endpointPath())
  }

  private endpointPath(operation?: string) {
    return `${Collections.RESOURCEPATH}/${this.collectionName}${Synonyms.RESOURCEPATH}${
      operation === undefined ? '' : '/' + operation
    }`
  }

  static get RESOURCEPATH() {
    return RESOURCEPATH
  }
}
