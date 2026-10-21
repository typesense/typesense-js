import { afterEach, describe, expect, it, vi } from "vitest";

// Edge bundles replace Undici with an empty module, while runtimes such as
// Cloudflare's nodejs_compat still report a Node version
vi.mock("undici", () => ({ fetch: undefined, getGlobalDispatcher: undefined }));

const { default: Transport } = await import("../src/Typesense/Transport");

const request = {
  method: "post" as const,
  url: "http://localhost/collections/books/documents/import",
  headers: {},
  queryParameters: {},
  bodyParameters: '{"id":"1"}',
};

describe("Transport with Undici stubbed out", () => {
  afterEach(() => vi.restoreAllMocks());

  it("sends imports through the global fetch without a dispatcher", async () => {
    const globalFetch = vi
      .spyOn(globalThis, "fetch")
      .mockResolvedValue(Response.json({ success: true }));
    const transport = new Transport({ connectionTimeoutSeconds: 1 });

    const response = await transport.perform(request, {
      requestNumber: 1,
      attemptNumber: 1,
      nodeIndex: 0,
      skipConnectionTimeout: true,
    });

    expect(response.data).toEqual({ success: true });
    expect(globalFetch).toHaveBeenCalledOnce();
    expect(globalFetch.mock.calls[0][1]).not.toHaveProperty("dispatcher");
  });
});
