import { createReadStream } from "fs";
import { fileURLToPath } from "url";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { Client as TypesenseClient } from "../src/Typesense";
import type { WriteableDocuments } from "../src/Typesense/Types";

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

describe("Documents Import Abort Signal Tests", () => {
  let typesense: TypesenseClient;

  const documents = [
    { id: "1", company_name: "Stark Industries" },
    { id: "2", company_name: "Acme Corp" },
  ];

  beforeEach(() => {
    vi.clearAllMocks();

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
    });

    mockAxios.mockResolvedValue({
      status: 200,
      data: '{"success":true}\n{"success":true}',
    });
  });

  afterEach(() => {
    vi.resetAllMocks();
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

    expect(mockAxios).not.toHaveBeenCalled();
  });

  it("should create cancel token and keep the signal out of the query parameters", async () => {
    const abortController = new AbortController();

    const result = await typesense
      .collections("companies")
      .documents()
      .import(
        documents,
        { action: "upsert" },
        { abortSignal: abortController.signal },
      );

    expect(mockAxios.CancelToken.source).toHaveBeenCalled();

    expect(mockAxios).toHaveBeenCalledWith(
      expect.objectContaining({
        cancelToken: "mock-cancel-token",
        params: expect.objectContaining({ action: "upsert" }),
      }),
    );
    expect(mockAxios.mock.calls[0][0].params).not.toHaveProperty("abortSignal");

    expect(result).toEqual([{ success: true }, { success: true }]);
  });

  it("should cancel a request in flight and not retry it", async () => {
    mockAxios.mockImplementationOnce(
      () =>
        new Promise((_resolve, reject) => {
          mockCancelFn.mockImplementationOnce(() =>
            reject(new Error("canceled")),
          );
        }),
    );
    const abortController = new AbortController();

    const importing = typesense
      .collections("companies")
      .documents()
      .import(documents, {}, { abortSignal: abortController.signal });

    await vi.waitFor(() => expect(mockAxios).toHaveBeenCalledTimes(1));
    abortController.abort();

    await expect(importing).rejects.toThrow("Request aborted by caller.");
    expect(mockCancelFn).toHaveBeenCalledTimes(1);
    expect(mockAxios).toHaveBeenCalledTimes(1);
  });

  it("should not retry a failed request once aborted", async () => {
    const abortController = new AbortController();
    mockAxios.mockImplementationOnce(async () => {
      // Fires during the wait before the retry
      setTimeout(() => abortController.abort(), 0);
      return { status: 503, data: { message: "Not Ready or Lagging" } };
    });

    await expect(
      typesense
        .collections("companies")
        .documents()
        .import(documents, {}, { abortSignal: abortController.signal }),
    ).rejects.toThrow("Request aborted by caller.");

    expect(mockAxios).toHaveBeenCalledTimes(1);
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

    expect(mockAxios).toHaveBeenCalledWith(
      expect.objectContaining({
        cancelToken: "mock-cancel-token",
      }),
    );
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

    expect(mockAxios).toHaveBeenCalledWith(
      expect.objectContaining({
        cancelToken: "mock-cancel-token",
      }),
    );
  });

  it("should work correctly without abort signal", async () => {
    const result = await typesense
      .collections("companies")
      .documents()
      .import(documents);

    expect(mockAxios.CancelToken.source).not.toHaveBeenCalled();

    expect(mockAxios).toHaveBeenCalledWith(
      expect.not.objectContaining({
        cancelToken: expect.anything(),
      }),
    );

    expect(result).toEqual([{ success: true }, { success: true }]);
  });
});
