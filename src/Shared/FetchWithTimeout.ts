export async function fetchWithTimeout(
  url: string,
  options: RequestInit,
  timeout?: number,
): Promise<Response> {
  if (!timeout) {
    return fetch(url, options);
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    if (error instanceof Error) {
      if (error.name === "AbortError") {
        throw new Error(`Request timed out after ${timeout / 1000} seconds`);
      }
      throw error;
    } else {
      throw new Error("An unknown error occurred");
    }
  }
}
