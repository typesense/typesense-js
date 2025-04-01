import { DocumentSchema } from "./Documents";
import { arrayableParams } from "./Types";
import type { UnionArrayKeys, ExtractBaseTypes, SearchParams } from "./Types";

function hasNoArrayValues<
  TDoc extends DocumentSchema,
  T extends SearchParams<TDoc>,
>(params: T | ExtractBaseTypes<T>): params is ExtractBaseTypes<T> {
  return Object.keys(arrayableParams)
    .filter((key) => params[key] !== undefined)
    .every((key) => isNonArrayValue(params[key]));
}

export function normalizeArrayableParams<
  TDoc extends DocumentSchema,
  T extends SearchParams<TDoc>,
>(params: T): Prettify<ExtractBaseTypes<T>> {
  const result = { ...params };

  const transformedValues = Object.keys(arrayableParams)
    .filter((key) => Array.isArray(result[key]))
    .map((key) => {
      result[key] = result[key].join(",");
      return key;
    });

  if (!transformedValues.length && hasNoArrayValues<TDoc, T>(result)) {
    return result;
  }

  if (!hasNoArrayValues<TDoc, T>(result)) {
    throw new Error(
      `Failed to normalize arrayable params: ${JSON.stringify(result)}`,
    );
  }

  return result;
}

function isNonArrayValue<
  TDoc extends DocumentSchema,
  T extends SearchParams<TDoc>,
  K extends UnionArrayKeys<T>,
>(value: T[K] | ExtractBaseTypes<T>[K]): value is ExtractBaseTypes<T>[K] {
  return !Array.isArray(value);
}

type Prettify<T> = {
  [K in keyof T]: T[K];
  // eslint-disable-next-line @typescript-eslint/ban-types
} & {};
