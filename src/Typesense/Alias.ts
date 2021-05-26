import Aliases from './Aliases'
import ApiCall from './ApiCall'

export default class Alias {
  constructor(private name: string, private apiCall: ApiCall) {}

  retrieve() {
    return this.apiCall.get(this.endpointPath())
  }

  delete() {
    return this.apiCall.delete(this.endpointPath())
  }

  private endpointPath() {
    return `${Aliases.RESOURCEPATH}/${this.name}`
  }
}
