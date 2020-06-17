'use strict'

import { createHmac } from 'crypto'

const RESOURCEPATH = '/keys'

export default class Keys {
  constructor (apiCall) {
    this._apiCall = apiCall
  }

  create (params) {
    return this._apiCall.post(Keys.RESOURCEPATH, params)
  }

  retrieve () {
    return this._apiCall.get(RESOURCEPATH)
  }

  generateScopedSearchKey (searchKey, parameters) {
    // Note: only a key generated with the `documents:search` action will be
    // accepted by the server, when usined with the search endpoint.
    const paramsJSON = JSON.stringify(parameters)
    const digest = Buffer.from(
      createHmac('sha256', searchKey)
        .update(paramsJSON)
        .digest('base64'))
    const keyPrefix = searchKey.substr(0, 4)
    const rawScopedKey = `${digest}${keyPrefix}${paramsJSON}`

    return Buffer.from(rawScopedKey).toString('base64')
  }

  static get RESOURCEPATH () {
    return RESOURCEPATH
  }
}
