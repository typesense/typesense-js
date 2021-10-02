import TypesenseError from './TypesenseError'

export default class ImportError extends TypesenseError {
  importResults: any;
  constructor (message, importResults) {
    super()
    this.importResults = importResults
  }
}
