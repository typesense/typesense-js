import { SearchParams, arrayableParams } from "./Documents";

export function normalizeArrayableParams(params: SearchParams): SearchParams {
  const normalizedParams = { ...params };
  
  const arrayableKeys = Object.keys(arrayableParams)
    .filter(key => key in normalizedParams && Array.isArray(normalizedParams[key]));
  
  arrayableKeys.forEach(key => {
    normalizedParams[key] = normalizedParams[key].join(",");
  });
  
  return normalizedParams;
}
