'use strict'

const ENDPOINTPATH = '/collections'

class Collections {
  constructor (configuration) {
    this._configuration = configuration
  }

  documentsPathFor (collectionName) {
    return `${ENDPOINTPATH}/${collectionName}/documents`
  }
}

module.exports = Collections
