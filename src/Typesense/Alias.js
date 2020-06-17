'use strict'

import Aliases from './Aliases'

export default class Alias {
  constructor (name, apiCall) {
    this._apiCall = apiCall
    this._name = name
  }

  retrieve () {
    return this._apiCall.get(this._endpointPath())
  }

  delete () {
    return this._apiCall.delete(this._endpointPath())
  }

  _endpointPath () {
    return `${Aliases.RESOURCEPATH}/${this._name}`
  }
}
