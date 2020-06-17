'use strict'

import Collections from './Collections'

const RESOURCEPATH = '/overrides'

export default class Overrides {
  constructor (collectionName, apiCall) {
    this._collectionName = collectionName
    this._apiCall = apiCall
  }

  create (params) {
    return this._apiCall.put(this._endpointPath(), params)
  }

  retrieve () {
    return this._apiCall.get(this._endpointPath())
  }

  _endpointPath (operation) {
    return `${Collections.RESOURCEPATH}/${this._collectionName}${Overrides.RESOURCEPATH}`
  }

  static get RESOURCEPATH () {
    return RESOURCEPATH
  }
}
