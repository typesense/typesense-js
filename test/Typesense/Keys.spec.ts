import { describe, it, expect, afterEach } from "vitest";
import { Client as TypesenseClient } from "../../src/Typesense";
import { ObjectNotFound } from "../../src/Typesense/Errors";
import { KeyCreateSchema } from "../../src/Typesense/Key";

describe("Keys", function () {
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

  const keys = typesense.keys();
  const testKeyData = {
    description: "Search-only key.",
    actions: ["documents:search"],
    collections: ["*"],
  } as const satisfies KeyCreateSchema;

  let createdKeyIds: number[] = [];

  afterEach(async function () {
    for (const keyId of createdKeyIds) {
      try {
        await typesense.keys(keyId).delete();
      } catch (error) {
        if (!(error instanceof ObjectNotFound)) {
          console.warn("Failed to cleanup test key:", error);
        }
      }
    }
    createdKeyIds = [];
  });

  describe(".create", function () {
    it("creates a key", async function () {
      const keyResponse = await keys.create(testKeyData);

      expect(keyResponse).toBeDefined();
      expect(keyResponse.id).toBeDefined();
      expect(typeof keyResponse.id).toBe("number");
      expect(keyResponse.description).toBe(testKeyData.description);
      expect(keyResponse.actions).toEqual(testKeyData.actions);
      expect(keyResponse.collections).toEqual(testKeyData.collections);

      createdKeyIds.push(keyResponse.id);
    });
  });

  describe(".retrieve", function () {
    it("retrieves all keys", async function () {
      const keysResponse = await keys.retrieve();

      expect(keysResponse).toBeDefined();
      expect(keysResponse.keys).toBeDefined();
      expect(Array.isArray(keysResponse.keys)).toBe(true);

      for (const key of keysResponse.keys) {
        expect(key.id).toBeDefined();
        expect(typeof key.id).toBe("number");
        expect(key.actions).toBeDefined();
        expect(Array.isArray(key.actions)).toBe(true);
        expect(key.collections).toBeDefined();
        expect(Array.isArray(key.collections)).toBe(true);
      }
    });
  });

  describe(".generateScopedSearchKey", function () {
    it("returns a scoped search key", function () {
      // The following keys were generated and verified to work with an actual Typesense server
      // We're only verifying that the algorithm works as expected client-side
      const searchKey = "RN23GFr1s6jQ9kgSNg2O7fYcAUXU7127";
      const expectedScopedSearchKey =
        "SC9sT0hncHFwTHNFc3U3d3psRDZBUGNXQUViQUdDNmRHSmJFQnNnczJ4VT1STjIzeyJmaWx0ZXJfYnkiOiJjb21wYW55X2lkOjEyNCJ9";

      const result = keys.generateScopedSearchKey(searchKey, {
        filter_by: "company_id:124",
      });

      expect(result).toBe(expectedScopedSearchKey);
    });
  });
});
