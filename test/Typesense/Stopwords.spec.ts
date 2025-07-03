import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { Client as TypesenseClient } from "../../src/Typesense";
import { ObjectNotFound } from "../../src/Typesense/Errors";

describe("Stopwords", function () {
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

  const testStopwordId = "test-stopword-1";
  const stopwordData = {
    stopwords: ["a", "the"],
  };

  beforeEach(async function () {
    try {
      await typesense.stopwords(testStopwordId).delete();
    } catch (error) {
      // Ignore if stopword doesn't exist
    }
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

  describe(".upsert", function () {
    it("upserts a stopword", async function () {
      const upsertResult = await typesense
        .stopwords()
        .upsert(testStopwordId, stopwordData);

      expect(upsertResult).toBeDefined();
      expect(upsertResult.stopwords).toEqual(stopwordData.stopwords);
    });
  });

  describe(".retrieve", function () {
    it("retrieves all stopwords", async function () {
      await typesense.stopwords().upsert(testStopwordId, stopwordData);

      const allStopwords = await typesense.stopwords().retrieve();

      expect(allStopwords).toBeDefined();
      expect(Array.isArray(allStopwords.stopwords)).toBe(true);
      expect(allStopwords.stopwords.length).toBeGreaterThan(0);

      const createdStopword = allStopwords.stopwords.find(
        (stopword) => stopword.id === testStopwordId,
      );
      expect(createdStopword).toBeDefined();
    });
  });
});
