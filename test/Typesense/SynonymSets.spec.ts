import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { Client as TypesenseClient } from "../../src/Typesense";
import { ObjectNotFound } from "../../src/Typesense/Errors";
import { isV30OrAbove } from "../utils";

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

describe.skipIf(!(await isV30OrAbove(typesense)))("SynonymSets", function () {
  const testSynonymSetName = "test-synonym-set";
  const synonymSetData = {
    synonyms: [
      {
        id: "dummy",
        synonyms: ["foo", "bar", "baz"],
      },
    ],
  };

  beforeEach(async function () {
    try {
      await typesense.synonymSets(testSynonymSetName).delete();
    } catch (error) {
      // Ignore if synonym set doesn't exist
    }
  });

  afterEach(async function () {
    try {
      await typesense.synonymSets(testSynonymSetName).delete();
    } catch (error) {
      if (!(error instanceof ObjectNotFound)) {
        console.warn("Failed to cleanup test synonym set:", error);
      }
    }
  });

  describe(".upsert", function () {
    it("creates the synonym set", async function () {
      const createResult = await typesense
        .synonymSets(testSynonymSetName)
        .upsert(synonymSetData);

      expect(createResult).toBeDefined();
      expect(createResult.synonyms[0].id).toBe("dummy");
      expect(createResult.synonyms).toMatchObject(synonymSetData.synonyms);
    });
  });

  describe(".retrieve", function () {
    it("retrieves all synonym sets", async function () {
      await typesense.synonymSets(testSynonymSetName).upsert(synonymSetData);

      const allSynonymSets = await typesense.synonymSets().retrieve();

      expect(allSynonymSets).toBeDefined();
      expect(Array.isArray(allSynonymSets)).toBe(true);
      expect(allSynonymSets.length).toBeGreaterThan(0);

      const createdSynonymSet = allSynonymSets.find(
        (synonymSet) => synonymSet.name === testSynonymSetName,
      );

      expect(createdSynonymSet).toBeDefined();
      expect(createdSynonymSet?.synonyms).toMatchObject(
        synonymSetData.synonyms,
      );
    });
  });

  describe("individual synonym set operations", function () {
    it("retrieves a specific synonym set", async function () {
      await typesense.synonymSets(testSynonymSetName).upsert(synonymSetData);

      const retrievedSynonymSet = await typesense
        .synonymSets(testSynonymSetName)
        .retrieve();

      expect(retrievedSynonymSet).toBeDefined();
      expect(retrievedSynonymSet.synonyms[0].id).toBe("dummy");
      expect(retrievedSynonymSet.synonyms).toMatchObject(
        synonymSetData.synonyms,
      );
    });

    it("deletes a specific synonym set", async function () {
      await typesense.synonymSets(testSynonymSetName).upsert(synonymSetData);

      const deleteResult = await typesense
        .synonymSets(testSynonymSetName)
        .delete();

      expect(deleteResult).toBeDefined();
      expect(deleteResult.name).toBe(testSynonymSetName);

      await expect(
        typesense.synonymSets(testSynonymSetName).retrieve(),
      ).rejects.toThrow(ObjectNotFound);
    });
  });
});
