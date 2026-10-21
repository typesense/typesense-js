import { createReadStream } from "fs";
import { fileURLToPath } from "url";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { Client as TypesenseClient } from "../src/Typesense";
import type { WriteableDocuments } from "../src/Typesense/Types";
import { FetchMock } from "./fetchMock";

describe("Documents Import Abort Signal Tests", () => {
  let typesense: TypesenseClient;
  let mockFetch: FetchMock;

  const documents = [
    { id: "1", company_name: "Stark Industries" },
    { id: "2", company_name: "Acme Corp" },
  ];

  const fetchSignal = (call = 0): AbortSignal | null | undefined =>
    (mockFetch.mock.mock.calls[call][1] as RequestInit | undefined)?.signal;

  beforeEach(() => {
    vi.clearAllMocks();

    // Imports use Undici's fetch in Node, so pass the mock explicitly
    mockFetch = new FetchMock();
    typesense = new TypesenseClient({
      nodes: [
        {
          host: "node0",
          port: 8108,
          protocol: "http",
        },
      ],
      apiKey: "abcd",
      randomizeNodes: false,
      retryIntervalSeconds: 0.05,
      fetch: mockFetch.mock as typeof fetch,
    });

    mockFetch.onPost().reply(200, '{"success":true}\n{"success":true}');
  });

  it("should reject immediately if AbortSignal is already aborted", async () => {
    const abortController = new AbortController();
    abortController.abort();

    await expect(
      typesense
        .collections("companies")
        .documents()
        .import(documents, {}, { abortSignal: abortController.signal }),
    ).rejects.toThrow("Request aborted by caller.");

    expect(mockFetch.mock).not.toHaveBeenCalled();
  });

  it("should pass a signal to fetch and keep it out of the query parameters", async () => {
    const abortController = new AbortController();

    const result = await typesense
      .collections("companies")
      .documents()
      .import(
        documents,
        { action: "upsert" },
        { abortSignal: abortController.signal },
      );

    expect(fetchSignal()).toBeInstanceOf(AbortSignal);
    expect(mockFetch.history.post[0].params).toEqual(
      expect.objectContaining({ action: "upsert" }),
    );
    expect(mockFetch.history.post[0].params).not.toHaveProperty("abortSignal");

    expect(result).toEqual([{ success: true }, { success: true }]);
  });

  it("should cancel a request in flight and not retry it", async () => {
    mockFetch.mock.mockImplementationOnce(
      (_input, init) =>
        new Promise((_resolve, reject) => {
          init?.signal?.addEventListener("abort", () =>
            reject(init.signal?.reason),
          );
        }),
    );
    const abortController = new AbortController();

    const importing = typesense
      .collections("companies")
      .documents()
      .import(documents, {}, { abortSignal: abortController.signal });

    await vi.waitFor(() => expect(mockFetch.mock).toHaveBeenCalledTimes(1));
    abortController.abort();

    await expect(importing).rejects.toThrow("Request aborted by caller.");
    expect(fetchSignal()?.aborted).toBe(true);
    expect(mockFetch.mock).toHaveBeenCalledTimes(1);
  });

  it("should not retry a failed request once aborted", async () => {
    const abortController = new AbortController();
    mockFetch.resetHandlers();
    mockFetch.onPost().reply(() => {
      // Fires during the wait before the retry
      setTimeout(() => abortController.abort(), 0);
      return [503, { message: "Not Ready or Lagging" }];
    });

    await expect(
      typesense
        .collections("companies")
        .documents()
        .import(documents, {}, { abortSignal: abortController.signal }),
    ).rejects.toThrow("Request aborted by caller.");

    expect(mockFetch.mock).toHaveBeenCalledTimes(1);
  });

  it("should pass the abort signal for a stream import", async () => {
    const abortController = new AbortController();
    const stream = createReadStream(fileURLToPath(import.meta.url));

    try {
      await typesense
        .collections("companies")
        .documents()
        .importStream(stream, {}, { abortSignal: abortController.signal });
    } finally {
      stream.destroy();
    }

    expect(fetchSignal()).toBeInstanceOf(AbortSignal);
  });

  it("should accept the abort signal through WriteableDocuments", async () => {
    const abortController = new AbortController();
    const writeable: WriteableDocuments<(typeof documents)[number]> = typesense
      .collections<(typeof documents)[number]>("companies")
      .documents();

    await writeable.import(
      documents,
      {},
      { abortSignal: abortController.signal },
    );

    expect(fetchSignal()).toBeInstanceOf(AbortSignal);
  });

  it("should work correctly without abort signal", async () => {
    const result = await typesense
      .collections("companies")
      .documents()
      .import(documents);

    expect(mockFetch.mock).toHaveBeenCalledTimes(1);
    expect(fetchSignal()?.aborted).toBe(false);
    expect(result).toEqual([{ success: true }, { success: true }]);
  });
});
