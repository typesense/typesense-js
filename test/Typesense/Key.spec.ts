import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { Client as TypesenseClient } from "../../src/Typesense";
import { ObjectNotFound } from "../../src/Typesense/Errors";

describe("Key", function () {
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

  const testKeyData = {
    description: "Test key for vitest",
    actions: ["documents:search"],
    collections: ["*"],
  };

  let createdKeyId: number;

  beforeEach(async function () {
    const keyResponse = await typesense.keys().create(testKeyData);
    createdKeyId = keyResponse.id;
  });

  afterEach(async function () {
    if (createdKeyId) {
      try {
        await typesense.keys(createdKeyId).delete();
      } catch (error) {
        if (!(error instanceof ObjectNotFound)) {
          console.warn("Failed to cleanup test key:", error);
        }
      }
    }
  });

  describe(".retrieve", function () {
    it("retrieves the key", async function () {
      const key = typesense.keys(createdKeyId);
      const retrievedKey = await key.retrieve();

      expect(retrievedKey).toBeDefined();
      expect(retrievedKey.id).toBe(createdKeyId);
      expect(retrievedKey.description).toBe(testKeyData.description);
      expect(retrievedKey.actions).toEqual(testKeyData.actions);
      expect(retrievedKey.collections).toEqual(testKeyData.collections);
    });
  });

  describe(".delete", function () {
    it("deletes a key", async function () {
      const key = typesense.keys(createdKeyId);
      const deleteResponse = await key.delete();

      expect(deleteResponse).toBeDefined();
      expect(deleteResponse.id).toBe(createdKeyId);

      await expect(key.retrieve()).rejects.toThrow(ObjectNotFound);

      createdKeyId = 0;
    });
  });
});
