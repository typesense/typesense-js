import ApiCall from './ApiCall'

const RESOURCEPATH = '/health'

export default class Health {
  constructor(private apiCall: ApiCall) {}

  retrieve() {
    return this.apiCall.get(RESOURCEPATH)
  }
}
