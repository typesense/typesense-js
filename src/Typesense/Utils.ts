import { arrayableParams } from "./Documents";
import type {
  UnionArrayKeys,
  ExtractBaseTypes,
  SearchParams,
} from "./Documents";

function hasNoArrayValues<T extends SearchParams>(
  params: T | ExtractBaseTypes<T>,
): params is ExtractBaseTypes<T> {
  return Object.keys(arrayableParams)
    .filter((key) => params[key] !== undefined)
    .every((key) => isNonArrayValue(params[key]));
}

export function normalizeArrayableParams<T extends SearchParams>(
  params: T,
): Prettify<ExtractBaseTypes<T>> {
  const result = { ...params };

  const transformedValues = Object.keys(arrayableParams)
    .filter((key) => Array.isArray(result[key]))
    .map((key) => {
      result[key] = result[key].join(",");
      return key;
    });

  if (!transformedValues.length && hasNoArrayValues(result)) {
    return result;
  }

  if (!hasNoArrayValues(result)) {
    throw new Error(
      `Failed to normalize arrayable params: ${JSON.stringify(result)}`,
    );
  }

  return result;
}

function isNonArrayValue<T extends SearchParams, K extends UnionArrayKeys<T>>(
  value: T[K] | ExtractBaseTypes<T>[K],
): value is ExtractBaseTypes<T>[K] {
  return !Array.isArray(value);
}

type Prettify<T> = {
  [K in keyof T]: T[K];
  // eslint-disable-next-line @typescript-eslint/ban-types
} & {};
