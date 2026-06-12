import { createRequire } from "node:module";
import { describe, expect, it, vi } from "vitest";
import Transport, { FetchTransportError } from "../src/Typesense/Transport";

// Use Node's loader so Vitest cannot transpile away ES5 subclassing bugs.
const require = createRequire(import.meta.url);
const compiledTransport = require("../lib/Typesense/Transport");

const request = {
  method: "get" as const,
  url: "http://localhost/health",
  headers: {},
  queryParameters: {},
};
const requestOptions = { requestNumber: 1, attemptNumber: 1, nodeIndex: 0 };

describe.each([
  ["source", Transport, FetchTransportError],
  [
    "compiled package",
    compiledTransport.default,
    compiledTransport.FetchTransportError,
  ],
] as const)("Transport (%s)", (_name, TransportClass, ErrorClass) => {
  it("preserves the error prototype", () => {
    expect(new ErrorClass("abort", "cancelled")).toBeInstanceOf(ErrorClass);
  });

  it("preserves bracketed array parameters and supports serializer objects", async () => {
    const customFetch = vi.fn<typeof fetch>(async () => new Response("ok"));
    const transport = new TransportClass({
      fetch: customFetch,
      connectionTimeoutSeconds: 1,
    });
    await transport.perform(
      {
        ...request,
        queryParameters: {
          key: ["a", "b", null],
          q: "hello world",
          omitted: undefined,
        },
      },
      requestOptions,
    );
    const query = new URL(String(customFetch.mock.calls[0][0])).searchParams;
    expect(query.getAll("key[]")).toEqual(["a", "b"]);
    expect(query.get("q")).toBe("hello world");
    expect(query.has("omitted")).toBe(false);

    const serialize = vi.fn(() => "key[0]=a&key[1]=b");
    const custom = new TransportClass({
      fetch: customFetch,
      paramsSerializer: { serialize },
      connectionTimeoutSeconds: 1,
    });
    await custom.perform(
      { ...request, queryParameters: { key: ["a", "b"] } },
      requestOptions,
    );
    expect(customFetch.mock.calls[1][0]).toBe(
      "http://localhost/health?key[0]=a&key[1]=b",
    );
    expect(serialize).toHaveBeenCalledWith({ key: ["a", "b"] });
  });
});
