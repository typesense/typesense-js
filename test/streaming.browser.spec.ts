import { describe, it, expect, vi } from "vitest";
import "dotenv/config";
import { Essay } from "./essays";
import { StreamConfig } from "../src/Typesense/Configuration";
import { client, collection, model } from "./setup";

describe("Streaming responses in Browser", () => {
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

  it("should handle streaming responses for multisearch ", async () => {
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
});
