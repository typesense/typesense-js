import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { Client as TypesenseClient } from "../../src/Typesense";
import {
  ObjectNotFound,
  ObjectAlreadyExists,
} from "../../src/Typesense/Errors";

describe("Aliases", function () {
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

  const aliases = typesense.aliases();
  const testCollectionName = "test_collection_for_aliases";
  const testAliasName = "test_alias_books";
  const testAliasNameEncoded = "abc123 /:=-_~&?#";

  let createdAliases: string[] = [];

  beforeEach(async function () {
    try {
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
    } catch (error) {
      if (!(error instanceof ObjectAlreadyExists)) {
        throw error;
      }
    }
  });

  afterEach(async function () {
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

    try {
      await typesense.collections(testCollectionName).delete();
    } catch (error) {
      if (!(error instanceof ObjectNotFound)) {
        console.warn("Failed to cleanup test collection:", error);
      }
    }
  });

  describe(".upsert", function () {
    it("upserts an alias", async function () {
      const aliasData = await aliases.upsert(testAliasName, {
        collection_name: testCollectionName,
      });
      createdAliases.push(testAliasName);

      expect(aliasData).toBeDefined();
      expect(aliasData.name).toBe(testAliasName);
      expect(aliasData.collection_name).toBe(testCollectionName);
    });

    it("upserts an alias with URL encoded name", async function () {
      const aliasData = await aliases.upsert(testAliasNameEncoded, {
        collection_name: testCollectionName,
      });
      createdAliases.push(testAliasNameEncoded);

      expect(aliasData).toBeDefined();
      expect(aliasData.name).toBe(testAliasNameEncoded);
      expect(aliasData.collection_name).toBe(testCollectionName);
    });
  });

  describe(".retrieve", function () {
    it("retrieves all aliases", async function () {
      await aliases.upsert(testAliasName, {
        collection_name: testCollectionName,
      });
      createdAliases.push(testAliasName);

      const aliasesData = await aliases.retrieve();

      expect(aliasesData).toBeDefined();
      expect(aliasesData.aliases).toBeDefined();
      expect(Array.isArray(aliasesData.aliases)).toBe(true);

      const testAlias = aliasesData.aliases.find(
        (alias) => alias.name === testAliasName,
      );
      expect(testAlias).toBeDefined();
      expect(testAlias!.collection_name).toBe(testCollectionName);
    });
  });
});
