'use strict'

import Collections from './Collections'

const RESOURCEPATH = '/synonyms'

export default class Synonyms {
  constructor (collectionName, apiCall) {
    this._collectionName = collectionName
    this._apiCall = apiCall
  }

  upsert (synonymId, params) {
    return this._apiCall.put(this._endpointPath(synonymId), params)
  }

  retrieve () {
    return this._apiCall.get(this._endpointPath())
  }

  _endpointPath (operation) {
    return `${Collections.RESOURCEPATH}/${this._collectionName}${Synonyms.RESOURCEPATH}${operation === undefined ? '' : '/' + operation}`
  }

  static get RESOURCEPATH () {
    return RESOURCEPATH
  }
}
