'use strict'

import TypesenseError from './TypesenseError'

export default class ImportError extends TypesenseError {
  constructor (message, importResults) {
    super(message)
    this.importResults = importResults
  }
}
