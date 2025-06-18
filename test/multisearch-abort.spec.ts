import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { Client as TypesenseClient } from "../src/Typesense";

const { mockAxios, mockCancelFn } = vi.hoisted(() => {
  const mockCancelFn = vi.fn();
  const mockCancelSource = {
    token: "mock-cancel-token",
    cancel: mockCancelFn,
  };
  const mockAxios = vi.fn() as any;
  mockAxios.CancelToken = {
    source: vi.fn(() => mockCancelSource),
  };

  return { mockAxios, mockCancelFn };
});

vi.mock("axios", () => ({
  default: mockAxios,
  __esModule: true,
}));

describe("MultiSearch Abort Signal Tests", () => {
  let typesense: TypesenseClient;

  beforeEach(() => {
    vi.clearAllMocks();
    mockCancelFn.mockClear();

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

    mockAxios.mockResolvedValue({
      status: 200,
      data: { results: [{ hits: [] }] },
    });
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it("should reject immediately if AbortSignal is already aborted", async () => {
    const abortController = new AbortController();
    abortController.abort(); // Abort immediately

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

    // Verify axios was never called since request was aborted immediately
    expect(mockAxios).not.toHaveBeenCalled();
  });

  it("should create cancel token when AbortSignal is provided", async () => {
    const abortController = new AbortController();

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

    expect(mockAxios.CancelToken.source).toHaveBeenCalled();

    expect(mockAxios).toHaveBeenCalledWith(
      expect.objectContaining({
        cancelToken: "mock-cancel-token",
      }),
    );
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

    expect(mockAxios.CancelToken.source).not.toHaveBeenCalled();

    expect(mockAxios).toHaveBeenCalledWith(
      expect.not.objectContaining({
        cancelToken: expect.anything(),
      }),
    );

    expect(result).toEqual({ results: [{ hits: [] }] });
  });

  it("should handle streaming requests with abort signal", async () => {
    const abortController = new AbortController();

    const mockStream = {
      on: vi.fn((event, callback) => {
        if (event === "data") {
          setTimeout(() => callback('data: {"hits":[]}\n\n'), 1);
        }
        if (event === "end") {
          setTimeout(() => callback(), 2);
        }
        return mockStream;
      }),
      pipe: vi.fn(() => mockStream),
    };

    mockAxios.mockResolvedValueOnce({
      status: 200,
      data: mockStream,
    });

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

    expect(mockAxios.CancelToken.source).toHaveBeenCalled();

    expect(mockAxios).toHaveBeenCalledWith(
      expect.objectContaining({
        responseType: "stream",
        cancelToken: "mock-cancel-token",
      }),
    );

    expect(result).toBeDefined();
  });

  it("should handle error responses with abort signal", async () => {
    const abortController = new AbortController();

    mockAxios.mockResolvedValueOnce({
      status: 400,
      data: { message: "Bad request" },
    });

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
    ).rejects.toThrow();

    expect(mockAxios.CancelToken.source).toHaveBeenCalled();

    expect(mockAxios).toHaveBeenCalledWith(
      expect.objectContaining({
        cancelToken: "mock-cancel-token",
      }),
    );
  });
});
