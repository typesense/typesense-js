import type { ExtractBaseTypes, SearchParams } from "./Documents";
export declare function normalizeArrayableParams<T extends SearchParams>(params: T): Prettify<ExtractBaseTypes<T>>;
type Prettify<T> = {
    [K in keyof T]: T[K];
} & {};
export {};
