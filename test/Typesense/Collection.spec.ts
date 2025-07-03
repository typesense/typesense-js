import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { Client as TypesenseClient } from "../../src/Typesense";
import { ObjectNotFound } from "../../src/Typesense/Errors";

describe("Collection", function () {
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

  const testCollectionName = "test_companies_collection_retrieve";
  const companySchema = {
    name: testCollectionName,
    fields: [
      {
        name: "company_name",
        type: "string" as const,
        facet: false,
      },
      {
        name: "num_employees",
        type: "int32" as const,
        facet: false,
      },
      {
        name: "country",
        type: "string" as const,
        facet: true,
      },
      {
        name: "address",
        type: "string" as const,
        locale: "el",
        infix: true,
      },
    ],
    default_sorting_field: "num_employees",
  };

  let collection: any;

  beforeEach(async function () {
    // Clean up any existing collection first
    try {
      await typesense.collections(testCollectionName).delete();
    } catch (error) {
      // Ignore if collection doesn't exist
    }

    // Create the test collection
    await typesense.collections().create(companySchema);
    collection = typesense.collections(testCollectionName);
  });

  afterEach(async function () {
    // Clean up the test collection
    try {
      await typesense.collections(testCollectionName).delete();
    } catch (error) {
      if (!(error instanceof ObjectNotFound)) {
        console.warn("Failed to cleanup test collection:", error);
      }
    }
  });

  describe(".retrieve", function () {
    it("retrieves a collection", async function () {
      const retrievedSchema = await collection.retrieve();

      expect(retrievedSchema).toBeDefined();
      expect(retrievedSchema.name).toBe(testCollectionName);
      expect(retrievedSchema.default_sorting_field).toBe(
        companySchema.default_sorting_field,
      );
      expect(retrievedSchema.num_documents).toBe(0);

      // Check that all our original fields are present with correct properties
      expect(retrievedSchema.fields).toHaveLength(companySchema.fields.length);

      for (let i = 0; i < companySchema.fields.length; i++) {
        const originalField = companySchema.fields[i];
        const retrievedField = retrievedSchema.fields[i];

        expect(retrievedField.name).toBe(originalField.name);
        expect(retrievedField.type).toBe(originalField.type);

        // Check optional properties that were explicitly set
        if (originalField.locale) {
          expect(retrievedField.locale).toBe(originalField.locale);
        }
        if (originalField.infix) {
          expect(retrievedField.infix).toBe(originalField.infix);
        }
      }
    });
  });

  describe(".update", function () {
    it("updates a collection", async function () {
      const updateSchema = {
        fields: [{ name: "new_field", type: "string" as const }],
      };

      const updateResult = await collection.update(updateSchema);

      expect(updateResult).toBeDefined();
      expect(updateResult.fields).toHaveLength(1);
      expect(updateResult.fields[0].name).toBe("new_field");
      expect(updateResult.fields[0].type).toBe("string");

      // Verify the update by retrieving the collection
      const updatedCollection = await collection.retrieve();
      const newField = updatedCollection.fields.find(
        (f: any) => f.name === "new_field",
      );
      expect(newField).toBeDefined();
      expect(newField.type).toBe("string");
    });
  });

  describe(".delete", function () {
    it("deletes a collection", async function () {
      const deleteResult = await collection.delete();

      expect(deleteResult).toBeDefined();
      expect(deleteResult.name).toBe(testCollectionName);

      // Verify the collection was deleted
      await expect(collection.retrieve()).rejects.toThrow(ObjectNotFound);
    });
  });
});
