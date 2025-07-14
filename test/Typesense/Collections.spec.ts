import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { Client as TypesenseClient } from "../../src/Typesense";
import { ObjectNotFound } from "../../src/Typesense/Errors";
import type { CollectionCreateSchema } from "../../src/Typesense/Collections";

describe("Collections", function () {
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

  const collections = typesense.collections();
  const testCollectionName = "test_companies_collection";
  const companySchema: CollectionCreateSchema = {
    name: testCollectionName,
    fields: [
      {
        name: "company_name",
        type: "string",
        facet: false,
      },
      {
        name: "num_employees",
        type: "int32",
        facet: false,
      },
      {
        name: "country",
        type: "string",
        facet: true,
      },
      {
        name: "address",
        type: "string",
        locale: "el",
        infix: true,
      },
    ],
    default_sorting_field: "num_employees",
  };

  const createdCollections: string[] = [];

  afterEach(async function () {
    for (const collectionName of createdCollections) {
      try {
        await typesense.collections(collectionName).delete();
      } catch (error) {
        if (!(error instanceof ObjectNotFound)) {
          console.warn("Failed to cleanup test collection:", error);
        }
      }
    }
    createdCollections.length = 0;
  });

  describe(".create", function () {
    it("creates a collection", async function () {
      const createdCollection = await collections.create(companySchema);
      createdCollections.push(testCollectionName);

      expect(createdCollection).toBeDefined();
      expect(createdCollection.name).toBe(testCollectionName);
      expect(createdCollection.default_sorting_field).toBe(
        companySchema.default_sorting_field,
      );
      expect(createdCollection.num_documents).toBe(0);

      expect(createdCollection.fields).toHaveLength(
        companySchema.fields.length,
      );

      for (let i = 0; i < companySchema.fields.length; i++) {
        const originalField = companySchema.fields[i];
        const createdField = createdCollection.fields[i];

        expect(createdField.name).toBe(originalField.name);
        expect(createdField.type).toBe(originalField.type);

        if (originalField.locale) {
          expect(createdField.locale).toBe(originalField.locale);
        }
        if (originalField.infix) {
          expect(createdField.infix).toBe(originalField.infix);
        }
      }
    });

    it("creates a collection with source name parameter", async function () {
      const sourceCollectionName = "source_collection";
      const targetCollectionName = "target_collection";

      const sourceSchema: CollectionCreateSchema = {
        name: sourceCollectionName,
        fields: [
          {
            name: "title",
            type: "string",
          },
        ],
      };

      await collections.create(sourceSchema);
      createdCollections.push(sourceCollectionName);

      const targetSchema: CollectionCreateSchema = {
        name: targetCollectionName,
        fields: [
          {
            name: "title",
            type: "string",
          },
          {
            name: "description",
            type: "string",
          },
        ],
      };

      const createdCollection = await collections.create(targetSchema, {
        src_name: sourceCollectionName,
      });
      createdCollections.push(targetCollectionName);

      expect(createdCollection).toBeDefined();
      expect(createdCollection.name).toBe(targetCollectionName);

      expect(createdCollection.fields).toHaveLength(1);
      expect(createdCollection.fields[0].name).toBe("title");
      expect(createdCollection.fields[0].type).toBe("string");
    });
  });

  describe(".retrieve", function () {
    beforeEach(async function () {
      await collections.create(companySchema);
      createdCollections.push(testCollectionName);
    });

    it("retrieves all collections", async function () {
      const retrievedCollections = await collections.retrieve();

      expect(retrievedCollections).toBeDefined();
      expect(Array.isArray(retrievedCollections)).toBe(true);
      expect(retrievedCollections.length).toBeGreaterThan(0);

      const testCollection = retrievedCollections.find(
        (collection) => collection.name === testCollectionName,
      );
      expect(testCollection).toBeDefined();
      expect(testCollection!.name).toBe(testCollectionName);
    });

    it("retrieves collections with exclude_fields parameter", async function () {
      const retrievedCollections = await collections.retrieve({
        exclude_fields: "fields",
      });

      expect(retrievedCollections).toBeDefined();
      expect(Array.isArray(retrievedCollections)).toBe(true);

      const testCollection = retrievedCollections.find(
        (collection) => collection.name === testCollectionName,
      );

      expect(testCollection).toBeDefined();
      expect(testCollection!.name).toBe(testCollectionName);
      expect(testCollection!.fields).toBeUndefined();
    });
  });
});
