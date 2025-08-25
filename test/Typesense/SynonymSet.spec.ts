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

describe.skipIf(!(await isV30OrAbove(typesense)))("SynonymSet", function () {
  const testSynonymSetName = "test-synonym-set";
  const synonymSetData = {
    items: [
      {
        id: "test-synonym-set-0",
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
      expect(createResult.items[0].id).toBe("test-synonym-set-0");
      expect(createResult.items).toMatchObject(synonymSetData.items);
    });
  });

  describe(".items", function () {
    it("upserts and retrieves individual items", async function () {
      await typesense.synonymSets(testSynonymSetName).upsert(synonymSetData);

      const item = await typesense
        .synonymSets(testSynonymSetName)
        .items()
        .upsert("custom-item", { synonyms: ["alpha", "beta"] });

      expect(item).toBeDefined();
      expect(item.id).toBe("custom-item");

      const retrieved = await typesense
        .synonymSets(testSynonymSetName)
        .items("custom-item")
        .retrieve();
      expect(retrieved.synonyms).toEqual(["alpha", "beta"]);
    });
  });

  describe(".retrieve", function () {
    it("retrieves a specific synonym set", async function () {
      await typesense.synonymSets(testSynonymSetName).upsert(synonymSetData);

      const retrievedSynonymSet = await typesense
        .synonymSets(testSynonymSetName)
        .retrieve();

      expect(retrievedSynonymSet).toBeDefined();
      expect(retrievedSynonymSet.items[0].id).toBe("test-synonym-set-0");
      expect(retrievedSynonymSet.items).toMatchObject(
        synonymSetData.items,
      );
    });
  });

  describe(".delete", function () {
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
