import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { Client as TypesenseClient } from "../../src/Typesense";
import { ObjectNotFound } from "../../src/Typesense/Errors";
import { OverrideCreateSchema } from "../../src/Typesense/Overrides";

describe("Overrides", function () {
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

  const testCollectionName = "test_companies_overrides";
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
    it("creates the override in the collection", async function () {
      const createResult = await typesense
        .collections(testCollectionName)
        .overrides()
        .upsert(testOverrideId, overrideData);

      expect(createResult).toBeDefined();
      expect(createResult.id).toBe(testOverrideId);

      // Verify the override was created by retrieving it
      const retrievedOverride = await typesense
        .collections(testCollectionName)
        .overrides(testOverrideId)
        .retrieve();

      expect(retrievedOverride.rule).toEqual(overrideData.rule);
      expect(retrievedOverride.includes).toEqual(overrideData.includes);
      expect(retrievedOverride.excludes).toEqual(overrideData.excludes);
    });
  });

  describe(".retrieve", function () {
    it("retrieves all overrides", async function () {
      // First create an override
      await typesense
        .collections(testCollectionName)
        .overrides()
        .upsert(testOverrideId, overrideData);

      const allOverrides = await typesense
        .collections(testCollectionName)
        .overrides()
        .retrieve();

      expect(allOverrides).toBeDefined();
      expect(Array.isArray(allOverrides.overrides)).toBe(true);
      expect(allOverrides.overrides.length).toBeGreaterThan(0);

      // Find our created override in the list
      const createdOverride = allOverrides.overrides.find(
        (override) => override.id === testOverrideId,
      );

      expect(createdOverride).toBeDefined();
      expect(createdOverride?.rule).toEqual(overrideData.rule);
      expect(createdOverride?.includes).toEqual(overrideData.includes);
      expect(createdOverride?.excludes).toEqual(overrideData.excludes);
    });
  });
});
