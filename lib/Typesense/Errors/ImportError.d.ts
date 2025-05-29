/// <reference types="node" />
import TypesenseError from "./TypesenseError";
import type { DocumentImportParameters, ImportResponse } from "../Documents";
import { ReadStream } from "node:fs";
interface ImportErrorPayload {
    documentsInJSONLFormat: string | ReadStream;
    options: DocumentImportParameters;
    failedItems: ImportResponse[];
    successCount: number;
}
export default class ImportError extends TypesenseError {
    payload: ImportErrorPayload;
    importResults: ImportResponse[];
    constructor(message: string, importResults: ImportResponse[], payload: ImportErrorPayload);
}
export {};
