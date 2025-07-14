import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { Client as TypesenseClient } from "../../src/Typesense";
import { ObjectNotFound } from "../../src/Typesense/Errors";

describe("Synonym", function () {
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

  const testCollectionName = "test_companies_synonym";
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

    await typesense
      .collections(testCollectionName)
      .synonyms()
      .upsert(testSynonymId, synonymData);
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

  describe(".retrieve", function () {
    it("retrieves the synonym with the given ID", async function () {
      const retrievedSynonym = await typesense
        .collections(testCollectionName)
        .synonyms(testSynonymId)
        .retrieve();

      expect(retrievedSynonym).toBeDefined();
      expect(retrievedSynonym.synonyms).toEqual(synonymData.synonyms);
    });
  });

  describe(".delete", function () {
    it("deletes the synonym with the given ID", async function () {
      const deleteResult = await typesense
        .collections(testCollectionName)
        .synonyms(testSynonymId)
        .delete();

      expect(deleteResult).toBeDefined();

      await expect(
        typesense
          .collections(testCollectionName)
          .synonyms(testSynonymId)
          .retrieve(),
      ).rejects.toThrow(ObjectNotFound);
    });
  });
});
