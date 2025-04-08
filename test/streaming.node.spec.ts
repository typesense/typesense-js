import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import "dotenv/config";
import { Essay } from "./essays";
import { StreamConfig } from "../src/Typesense/Configuration";
import { client, collection, model } from "./setup";
import { EventEmitter } from "events";

class MockReadableWithError extends EventEmitter {
  pipe() {
    return this;
  }
  on(event, handler) {
    super.on(event, handler);
    return this;
  }
}

const axiosMock = vi.hoisted(() => {
  const mockFn = vi.fn();
  return {
    mockFn,
    request: vi.fn(),
    isAxiosError: vi.fn(),
    create: vi.fn(),
  };
});

vi.mock("axios", () => {
  return {
    default: axiosMock.mockFn,
    __esModule: true,
  };
});

describe("Streaming responses in Node.js", () => {
  beforeEach(async () => {
    vi.clearAllMocks();

    const realAxios = (await vi.importActual("axios")) as { default: any };

    axiosMock.mockFn.mockImplementation((config) => {
      return realAxios.default(config);
    });
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it("should handle streaming responses for search", async () => {
    const onChunk = vi.fn();
    const onComplete = vi.fn();
    const onError = vi.fn();

    const streamConfig: StreamConfig<Essay> = {
      onChunk,
      onComplete,
      onError,
    };

    const response = await client
      .collections<Essay>(collection.name)
      .documents()
      .search({
        q: "What is the maker schedule?",
        query_by: "embedding",
        conversation: true,
        conversation_stream: true,
        conversation_model_id: model.id,
        include_fields: "title",
        streamConfig,
      });

    expect(onChunk.mock.calls.length).toBeGreaterThan(1);
    expect(onComplete).toHaveBeenCalledOnce();
    expect(onError).not.toHaveBeenCalled();
    expect(response).toBeDefined();
    expect(response.hits?.length).toBeGreaterThan(0);
  });

  it("should handle streaming responses for multisearch", async () => {
    const onChunk = vi.fn();
    const onComplete = vi.fn();
    const onError = vi.fn();

    const response = await client.multiSearch.perform<[Essay]>(
      {
        searches: [
          {
            collection: collection.name,
            include_fields: "title",
          },
        ],
      },
      {
        conversation_stream: true,
        conversation: true,
        conversation_model_id: model.id,
        query_by: "embedding",
        q: "What are the advantages and disadvantages of a startup being located in Silicon Valley?",
        streamConfig: {
          onChunk,
          onComplete,
          onError,
        },
      },
    );

    expect(onChunk.mock.calls.length).toBeGreaterThan(1);
    expect(onComplete).toHaveBeenCalledOnce();
    expect(onError).not.toHaveBeenCalled();
    expect(response).toBeDefined();
    expect(response.results[0].hits?.length).toBeGreaterThan(0);
  });

  it("should invoke onError callback when an error occurs during stream processing", async () => {
    const onChunk = vi.fn();
    const onComplete = vi.fn();
    const onError = vi.fn();

    const streamConfig: StreamConfig<Essay> = {
      onChunk,
      onComplete,
      onError,
    };

    const mockStream = new MockReadableWithError();

    axiosMock.mockFn.mockResolvedValueOnce({
      status: 200,
      data: mockStream,
    });

    const requestPromise = client
      .collections<Essay>(collection.name)
      .documents()
      .search({
        q: "What is the maker schedule?",
        query_by: "embedding",
        conversation: true,
        conversation_stream: true,
        conversation_model_id: model.id,
        include_fields: "title",
        streamConfig,
      });

    // Add a small delay to ensure search processing has started
    await new Promise((resolve) => setTimeout(resolve, 50));

    mockStream.emit(
      "data",
      Buffer.from(
        'data: {"conversation_id":"123","message":"This is test data"}\n\n',
      ),
    );

    await new Promise((resolve) => setTimeout(resolve, 50));

    mockStream.emit("error", new Error("Stream error during processing"));

    try {
      await requestPromise;

      // If it doesn't fail, that's a problem
      expect(true).toBe(false);
    } catch (error) {
      expect(onChunk).toHaveBeenCalled();
      expect(onChunk.mock.calls[0][0]).toHaveProperty("conversation_id", "123");

      expect(onError).toHaveBeenCalledTimes(1);
      expect(onError.mock.calls[0][0]).toBeInstanceOf(Error);
      expect(onError.mock.calls[0][0].message).toBe(
        "Stream error during processing",
      );

      expect(onComplete).not.toHaveBeenCalled();
    }
  });
});
