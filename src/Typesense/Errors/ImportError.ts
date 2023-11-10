import TypesenseError from "./TypesenseError";
import { ImportResponse } from "../Documents";

export default class ImportError extends TypesenseError {
  importResults: ImportResponse[];
  constructor(message, importResults) {
    super(message);
    this.importResults = importResults;
  }
}
