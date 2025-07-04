import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { Client as TypesenseClient } from "../../src/Typesense";
import { ObjectNotFound } from "../../src/Typesense/Errors";

describe("Alias", function () {
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

  const testCollectionName = "test_collection_for_alias";
  const testAliasName = "test_alias";
  const testAliasNameEncoded = "test alias with spaces";

  let createdAliases: string[] = [];

  beforeEach(async function () {
    // Clean up any existing collection first
    try {
      await typesense.collections(testCollectionName).delete();
    } catch (error) {
      // Ignore if collection doesn't exist
    }

    // Create a test collection to alias
    await typesense.collections().create({
      name: testCollectionName,
      fields: [
        {
          name: "title",
          type: "string",
        },
        {
          name: "content",
          type: "string",
        },
      ],
    });
  });

  afterEach(async function () {
    // Clean up created aliases
    for (const aliasName of createdAliases) {
      try {
        await typesense.aliases(aliasName).delete();
      } catch (error) {
        if (!(error instanceof ObjectNotFound)) {
          console.warn("Failed to cleanup test alias:", error);
        }
      }
    }
    createdAliases = [];

    // Clean up test collection
    try {
      await typesense.collections(testCollectionName).delete();
    } catch (error) {
      if (!(error instanceof ObjectNotFound)) {
        console.warn("Failed to cleanup test collection:", error);
      }
    }
  });

  describe(".retrieve", function () {
    it("retrieves the alias", async function () {
      // Create an alias first
      await typesense.aliases().upsert(testAliasName, {
        collection_name: testCollectionName,
      });
      createdAliases.push(testAliasName);

      const alias = typesense.aliases(testAliasName);
      const aliasData = await alias.retrieve();

      expect(aliasData).toBeDefined();
      expect(aliasData.name).toBe(testAliasName);
      expect(aliasData.collection_name).toBe(testCollectionName);
    });

    it("retrieves the alias with URL encoded name", async function () {
      // Create an alias with encoded name
      await typesense.aliases().upsert(testAliasNameEncoded, {
        collection_name: testCollectionName,
      });
      createdAliases.push(testAliasNameEncoded);

      const alias = typesense.aliases(testAliasNameEncoded);
      const aliasData = await alias.retrieve();

      expect(aliasData).toBeDefined();
      expect(aliasData.name).toBe(testAliasNameEncoded);
      expect(aliasData.collection_name).toBe(testCollectionName);
    });
  });

  describe(".delete", function () {
    it("deletes an alias", async function () {
      // Create an alias first
      await typesense.aliases().upsert(testAliasName, {
        collection_name: testCollectionName,
      });
      createdAliases.push(testAliasName);

      const alias = typesense.aliases(testAliasName);
      const deleteResponse = await alias.delete();

      expect(deleteResponse).toBeDefined();
      expect(deleteResponse.name).toBe(testAliasName);

      // Verify the alias was deleted
      await expect(alias.retrieve()).rejects.toThrow(ObjectNotFound);

      // Remove from cleanup list since it's already deleted
      createdAliases = createdAliases.filter((name) => name !== testAliasName);
    });
  });
});
