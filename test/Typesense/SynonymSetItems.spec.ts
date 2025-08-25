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

describe.skipIf(!(await isV30OrAbove(typesense)))("SynonymSetItems", function () {
  const testSynonymSetName = "test-synonym-set-items";
  const synonymSetData = {
    items: [
      {
        id: "color-item",
        synonyms: ["red", "scarlet"],
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

  describe(".retrieve", function () {
    it("lists items in a synonym set", async function () {
      await typesense.synonymSets(testSynonymSetName).upsert(synonymSetData);

      const items = await typesense
        .synonymSets(testSynonymSetName)
        .items()
        .retrieve();

      expect(Array.isArray(items)).toBe(true);
      expect(items.length).toBeGreaterThan(0);
      expect(items[0].synonyms).toEqual(["red", "scarlet"]);
    });
  });

  describe(".upsert", function () {
    it("creates or updates a synonym set item", async function () {
      await typesense.synonymSets(testSynonymSetName).upsert(synonymSetData);

      const upserted = await typesense
        .synonymSets(testSynonymSetName)
        .items()
        .upsert("color-item", { synonyms: ["blue", "azure"] });

      expect(upserted.id).toBe("color-item");
      expect(upserted.synonyms).toEqual(["blue", "azure"]);
    });
  });
});


