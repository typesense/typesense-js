import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { Client as TypesenseClient } from "../../src/Typesense";
import { ObjectNotFound } from "../../src/Typesense/Errors";
import { OverrideCreateSchema } from "../../src/Typesense/Overrides";

describe("Override", function () {
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

  const testCollectionName = "test_companies_override";
  const testOverrideId = "lex-exact";
  const overrideData: OverrideCreateSchema = {
    rule: {
      query: "lex luthor",
      match: "exact",
    },
    includes: [{ id: "125", position: 1 }],
    excludes: [{ id: "124" }],
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
          type: "string",
        },
      ],
    });

    await typesense
      .collections(testCollectionName)
      .overrides()
      .upsert(testOverrideId, overrideData);
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
    it("retrieves the override with the given ID", async function () {
      const retrievedOverride = await typesense
        .collections(testCollectionName)
        .overrides(testOverrideId)
        .retrieve();

      expect(retrievedOverride).toBeDefined();
      expect(retrievedOverride.id).toBe(testOverrideId);
      expect(retrievedOverride.rule).toEqual(overrideData.rule);
      expect(retrievedOverride.includes).toEqual(overrideData.includes);
      expect(retrievedOverride.excludes).toEqual(overrideData.excludes);
    });
  });

  describe(".delete", function () {
    it("deletes the override with the given ID", async function () {
      const deleteResult = await typesense
        .collections(testCollectionName)
        .overrides(testOverrideId)
        .delete();

      expect(deleteResult).toBeDefined();
      expect(deleteResult.id).toBe(testOverrideId);

      await expect(
        typesense
          .collections(testCollectionName)
          .overrides(testOverrideId)
          .retrieve(),
      ).rejects.toThrow(ObjectNotFound);
    });
  });
});
