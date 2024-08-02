import TypesenseError from "./TypesenseError";
import { ImportResponse } from "../Documents";

export default class ImportError extends TypesenseError {
  importResults: ImportResponse[];
  constructor(message: string, importResults: ImportResponse[]) {
    super(message);
    this.importResults = importResults;
  }
}
