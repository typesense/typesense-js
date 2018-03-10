'use strict'

import ApiCall from './ApiCall'
import Collections from './Collections'

class Documents {
  constructor (configuration) {
    this._configuration = configuration
    this._collections = new Collections(this._configuration)
  }

  search (collectionName, searchParameters) {
    return (new ApiCall(this._configuration)).get(`${this._collections.documentsPathFor(collectionName)}/search`, searchParameters)
  }
}

module.exports = Documents
