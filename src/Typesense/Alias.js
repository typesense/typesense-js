'use strict'

import Aliases from './Aliases'
import ApiCall from './ApiCall'

class Alias {
  constructor (configuration, name) {
    this._configuration = configuration
    this._name = name
  }

  retrieve () {
    return new ApiCall(this._configuration).get(this._endpointPath())
  }

  delete () {
    return new ApiCall(this._configuration).delete(this._endpointPath())
  }

  _endpointPath () {
    return `${Aliases.RESOURCEPATH}/${this._name}`
  }
}

module.exports = Alias
