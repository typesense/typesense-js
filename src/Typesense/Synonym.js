'use strict'

import Collections from './Collections'
import Synonyms from './Synonyms'

export default class Synonym {
  constructor (collectionName, synonymId, apiCall) {
    this._collectionName = collectionName
    this._synonymId = synonymId
    this._apiCall = apiCall
  }

  retrieve () {
    return this._apiCall.get(this._endpointPath())
  }

  delete () {
    return this._apiCall.delete(this._endpointPath())
  }

  _endpointPath () {
    return `${Collections.RESOURCEPATH}/${this._collectionName}${Synonyms.RESOURCEPATH}/${this._synonymId}`
  }
}
