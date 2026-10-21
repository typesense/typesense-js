import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { Client as TypesenseClient } from "../src/Typesense";
import { createFetchMock, FetchMock } from "./fetchMock";

function streamFromText(text: string): ReadableStream<Uint8Array> {
  const encoder = new TextEncoder();
  return new ReadableStream({
    start(controller) {
      controller.enqueue(encoder.encode(text));
      controller.close();
    },
  });
}

describe("MultiSearch Abort Signal Tests", () => {
  let typesense: TypesenseClient;
  let mockFetch: FetchMock;

  beforeEach(() => {
    vi.clearAllMocks();

    mockFetch = createFetchMock();
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
    });

    mockFetch.onAny().reply(200, { results: [{ hits: [] }] });
  });

  afterEach(() => {
    mockFetch.restore();
  });

  it("should reject immediately if AbortSignal is already aborted", async () => {
    const abortController = new AbortController();
    abortController.abort();

    const searchRequests = {
      searches: [{ q: "test query", collection: "documents" }],
    };

    await expect(
      typesense.multiSearch.perform(
        searchRequests,
        {},
        {
          abortSignal: abortController.signal,
        },
      ),
    ).rejects.toThrow("Request aborted by caller.");

    expect(mockFetch.mock).not.toHaveBeenCalled();
  });

  it("should add abort event listener", async () => {
    const abortController = new AbortController();
    const addEventListenerSpy = vi.spyOn(
      abortController.signal,
      "addEventListener",
    );

    const searchRequests = {
      searches: [{ q: "test query", collection: "documents" }],
    };

    await typesense.multiSearch.perform(
      searchRequests,
      {},
      {
        abortSignal: abortController.signal,
      },
    );

    expect(addEventListenerSpy).toHaveBeenCalledWith(
      "abort",
      expect.any(Function),
    );
  });

  it("should remove abort event listener after completion", async () => {
    const abortController = new AbortController();
    const removeEventListenerSpy = vi.spyOn(
      abortController.signal,
      "removeEventListener",
    );

    const searchRequests = {
      searches: [{ q: "test query", collection: "documents" }],
    };

    await typesense.multiSearch.perform(
      searchRequests,
      {},
      {
        abortSignal: abortController.signal,
      },
    );

    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      "abort",
      expect.any(Function),
    );
  });

  it("should work correctly without abort signal", async () => {
    const searchRequests = {
      searches: [{ q: "test query", collection: "documents" }],
    };

    const result = await typesense.multiSearch.perform(searchRequests, {});

    expect(mockFetch.mock).toHaveBeenCalledOnce();
    expect(result).toEqual({ results: [{ hits: [] }] });
  });

  it("should handle streaming requests with abort signal", async () => {
    const abortController = new AbortController();
    mockFetch.reset();
    mockFetch
      .onAny()
      .reply(
        200,
        streamFromText(
          'data: {"conversation_id":"123","message":"chunk"}\n\n{"results":[{"hits":[]}]}',
        ),
        { "content-type": "text/event-stream" },
      );

    const searchRequests = {
      searches: [{ q: "test query", collection: "documents" }],
    };

    const commonParams = {
      conversation: true,
      conversation_stream: true,
      streamConfig: {
        onChunk: vi.fn(),
        onComplete: vi.fn(),
        onError: vi.fn(),
      },
    };

    const result = await typesense.multiSearch.perform(
      searchRequests,
      commonParams,
      { abortSignal: abortController.signal },
    );

    expect(mockFetch.history.post[0].headers.accept).toBe("text/event-stream");
    expect(result).toBeDefined();
  });

  it("should handle error responses with abort signal", async () => {
    const abortController = new AbortController();
    mockFetch.reset();
    mockFetch.onAny().reply(400, { message: "Bad request" });

    const searchRequests = {
      searches: [{ q: "test query", collection: "documents" }],
    };

    await expect(
      typesense.multiSearch.perform(
        searchRequests,
        {},
        {
          abortSignal: abortController.signal,
        },
      ),
    ).rejects.toThrow("Request failed with HTTP code 400");

    expect(mockFetch.mock).toHaveBeenCalledOnce();
  });
});
