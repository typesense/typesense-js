import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { Client as TypesenseClient } from "../../src/Typesense";
import { ObjectNotFound } from "../../src/Typesense/Errors";

describe("Synonyms", function () {
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

  const testCollectionName = "test_companies_synonyms";
  const testSynonymId = "synonym-set-1";
  const synonymData = {
    synonyms: ["car", "automobile", "vehicle"],
  };

  beforeEach(async function () {
    try {
      await typesense.collections(testCollectionName).delete();
    } catch (error) {
      // Ignore if collection doesn't exist
    }

    await typesense.collections().create({
      name: testCollectionName,
      fields: [
        {
          name: "title",
          type: "string" as const,
        },
      ],
    });
  });

  afterEach(async function () {
    try {
      await typesense.collections(testCollectionName).delete();
    } catch (error) {
      if (!(error instanceof ObjectNotFound)) {
        console.warn("Failed to cleanup test collection:", error);
      }
    }
  });

  describe(".create", function () {
    it("creates the synonym in the collection", async function () {
      const createResult = await typesense
        .collections(testCollectionName)
        .synonyms()
        .upsert(testSynonymId, synonymData);

      expect(createResult).toBeDefined();

      const retrievedSynonym = await typesense
        .collections(testCollectionName)
        .synonyms(testSynonymId)
        .retrieve();

      expect(retrievedSynonym.synonyms).toEqual(synonymData.synonyms);
    });
  });

  describe(".retrieve", function () {
    it("retrieves all synonyms", async function () {
      await typesense
        .collections(testCollectionName)
        .synonyms()
        .upsert(testSynonymId, synonymData);

      const allSynonyms = await typesense
        .collections(testCollectionName)
        .synonyms()
        .retrieve();

      expect(allSynonyms).toBeDefined();
      expect(Array.isArray(allSynonyms.synonyms)).toBe(true);
      expect(allSynonyms.synonyms.length).toBeGreaterThan(0);

      const createdSynonym = allSynonyms.synonyms.find((synonym) => {
        return synonym.id === testSynonymId;
      });
      expect(createdSynonym).toBeDefined();
      expect(createdSynonym?.synonyms).toEqual(synonymData.synonyms);
    });
  });
});
