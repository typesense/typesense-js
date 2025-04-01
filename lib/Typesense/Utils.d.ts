import { DocumentSchema } from "./Documents";
import type { ExtractBaseTypes, SearchParams } from "./Types";
export declare function normalizeArrayableParams<TDoc extends DocumentSchema, T extends SearchParams<TDoc>>(params: T): Prettify<ExtractBaseTypes<T>>;
type Prettify<T> = {
    [K in keyof T]: T[K];
} & {};
interface ErrorWithMessage extends Error {
    message: string;
}
export declare function toErrorWithMessage(couldBeError: unknown): ErrorWithMessage;
export {};
