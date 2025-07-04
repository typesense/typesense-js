import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { Client as TypesenseClient } from "../../src/Typesense";
import { ObjectNotFound } from "../../src/Typesense/Errors";

describe("Stopword", function () {
  const typesense = new TypesenseClient({
    nodes: [
      {
        host: "localhost",
        port: 8108,
        protocol: "http",
      },
    ],
    apiKey: "xyz",
    connectionTimeoutSeconds: 180,
  });

  const testStopwordId = "test-stopword-123";
  const stopwordData = {
    stopwords: ["a", "an", "the"],
  };

  beforeEach(async function () {
    try {
      await typesense.stopwords(testStopwordId).delete();
    } catch (error) {
      // Ignore if stopword doesn't exist
    }

    await typesense.stopwords().upsert(testStopwordId, stopwordData);
  });

  afterEach(async function () {
    try {
      await typesense.stopwords(testStopwordId).delete();
    } catch (error) {
      if (!(error instanceof ObjectNotFound)) {
        console.warn("Failed to cleanup test stopword:", error);
      }
    }
  });

  describe(".retrieve", function () {
    it("retrieves the stopword", async function () {
      const retrievedStopword = await typesense
        .stopwords(testStopwordId)
        .retrieve();

      expect(retrievedStopword).toBeDefined();
      expect(
        (retrievedStopword.stopwords as { stopwords: string[] }).stopwords,
      ).toHaveLength(stopwordData.stopwords.length);
    });
  });

  describe(".delete", function () {
    it("deletes a stopword", async function () {
      const deleteResult = await typesense.stopwords(testStopwordId).delete();

      expect(deleteResult).toBeDefined();

      await expect(
        typesense.stopwords(testStopwordId).retrieve(),
      ).rejects.toThrow(ObjectNotFound);
    });
  });
});
