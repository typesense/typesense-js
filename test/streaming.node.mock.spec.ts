import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { Readable } from "stream";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";
import { client } from "./setup";
import { StreamConfig } from "../src/Typesense/Configuration";
import { Essay } from "./essays";
import { MultiSearchResultsStreamConfig } from "../src/Typesense/Types";

describe("Streaming responses with axios-mock-adapter", () => {
  let mock: MockAdapter;

  beforeEach(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.reset();
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

    const chunks = [
      '{"conversation_id":"123","message":"First chunk"}',
      '{"conversation_id":"123","message":"Second chunk"}',
      '{"conversation_id":"123","message":"Final chunk"}',
    ];

    const metadata = {
      found: 3,
      hits: [
        { document: { title: "Test 1" } },
        { document: { title: "Test 2" } },
        { document: { title: "Test 3" } },
      ],
      page: 1,
      search_time_ms: 123,
    };

    mock.onAny().reply(() => {
      const stream = new Readable({
        read() {
          chunks.forEach((chunk) => {
            this.push(`data: ${chunk}\n\n`);
          });
          this.push(JSON.stringify(metadata));
          this.push(null);
        },
      });

      return [200, stream, { "content-type": "text/event-stream" }];
    });

    const response = await client
      .collections<Essay>("test-collection")
      .documents()
      .search({
        q: "What is the maker schedule?",
        query_by: "embedding",
        conversation: true,
        conversation_stream: true,
        conversation_model_id: "test-model",
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

    const streamConfig: MultiSearchResultsStreamConfig<[Essay]> = {
      onChunk,
      onComplete,
      onError,
    };

    const chunks = [
      '{"conversation_id":"123","message":"First chunk"}',
      '{"conversation_id":"123","message":"Second chunk"}',
      '{"conversation_id":"123","message":"Final chunk"}',
    ];

    const metadata = {
      results: [
        {
          found: 3,
          hits: [
            { document: { title: "Test 1" } },
            { document: { title: "Test 2" } },
            { document: { title: "Test 3" } },
          ],
          page: 1,
          search_time_ms: 123,
        },
      ],
    };

    mock.onAny().reply(() => {
      const stream = new Readable({
        read() {
          chunks.forEach((chunk) => {
            this.push(`data: ${chunk}\n\n`);
          });
          this.push(JSON.stringify(metadata));
          this.push(null);
        },
      });

      return [200, stream, { "content-type": "text/event-stream" }];
    });

    const response = await client.multiSearch.perform<[Essay]>(
      {
        searches: [
          {
            collection: "test-collection",
            include_fields: "title",
          },
        ],
      },
      {
        conversation_stream: true,
        conversation: true,
        conversation_model_id: "test-model",
        query_by: "embedding",
        q: "What are the advantages and disadvantages of a startup being located in Silicon Valley?",
        streamConfig,
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

    mock.onAny().reply(() => {
      const stream = new Readable({
        read() {
          this.push(
            'data: {"conversation_id":"123","message":"Error chunk"}\n\n',
          );
          this.destroy(new Error("Stream error during processing"));
        },
      });

      return [200, stream, { "content-type": "text/event-stream" }];
    });

    try {
      await client.collections<Essay>("test-collection").documents().search({
        q: "What is the maker schedule?",
        query_by: "embedding",
        conversation: true,
        conversation_stream: true,
        conversation_model_id: "test-model",
        include_fields: "title",
        streamConfig,
      });

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
