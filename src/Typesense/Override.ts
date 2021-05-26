import ApiCall from './ApiCall'
import Collections from './Collections'
import Overrides from './Overrides'

export default class Override {
  constructor(private collectionName: string, private overrideId: string, private apiCall: ApiCall) {}

  retrieve() {
    return this.apiCall.get(this.endpointPath())
  }

  delete() {
    return this.apiCall.delete(this.endpointPath())
  }

  private endpointPath() {
    return `${Collections.RESOURCEPATH}/${this.collectionName}${Overrides.RESOURCEPATH}/${this.overrideId}`
  }
}
