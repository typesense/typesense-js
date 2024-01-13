import TypesenseError from "./TypesenseError";
import { ImportResponseFail, ImportResponse } from "../Documents";

export default class ImportError extends TypesenseError {
  importResults: ImportResponseFail | ImportResponse[];
  constructor(message: string, importResults: ImportResponseFail | ImportResponse[]) {
    super(message);
    this.importResults = importResults;
  }
}
