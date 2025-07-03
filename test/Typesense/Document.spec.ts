import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { Client as TypesenseClient } from "../../src/Typesense";
import type { Document } from "../../src/Typesense/Document";
import { ObjectNotFound } from "../../src/Typesense/Errors";

describe("Document", function () {
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

  const testCollectionName = "test_companies_document";
  const testDocumentId = "124";
  const documentData = {
    id: testDocumentId,
    company_name: "Stark Industries",
    num_employees: 5215,
    country: "USA",
  };

  let document: Document<typeof documentData>;

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
          name: "company_name",
          type: "string" as const,
        },
        {
          name: "num_employees",
          type: "int32" as const,
        },
        {
          name: "country",
          type: "string" as const,
        },
      ],
    });

    await typesense
      .collections(testCollectionName)
      .documents()
      .create(documentData);
    document = typesense
      .collections<typeof documentData>(testCollectionName)
      .documents(testDocumentId);
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
    it("retrieves a document", async function () {
      const retrievedDocument = await document.retrieve();

      expect(retrievedDocument).toBeDefined();
      expect(retrievedDocument.id).toBe(testDocumentId);
      expect(retrievedDocument.company_name).toBe(documentData.company_name);
      expect(retrievedDocument.num_employees).toBe(documentData.num_employees);
      expect(retrievedDocument.country).toBe(documentData.country);
    });
  });

  describe(".update", function () {
    it("updates a document", async function () {
      const partialDocument = {
        company_name: "Stark Industries Inc",
        num_employees: 6000,
      };

      const updateResult = await document.update(partialDocument, {
        dirty_values: "coerce_or_reject",
      });

      expect(updateResult).toBeDefined();
      expect(updateResult.id).toBe(testDocumentId);
      expect(updateResult.company_name).toBe(partialDocument.company_name);
      expect(updateResult.num_employees).toBe(partialDocument.num_employees);

      const updatedDocument = await document.retrieve();
      expect(updatedDocument.company_name).toBe(partialDocument.company_name);
      expect(updatedDocument.num_employees).toBe(partialDocument.num_employees);
      expect(updatedDocument.country).toBe(documentData.country);
    });
  });

  describe(".delete", function () {
    it("deletes a document", async function () {
      const deleteResult = await document.delete();

      expect(deleteResult).toBeDefined();
      expect(deleteResult.id).toBe(testDocumentId);

      await expect(document.retrieve()).rejects.toThrow(ObjectNotFound);
    });

    it("passes query params to delete", async function () {
      const queryParams = { ignore_not_found: true };

      const deleteResult = await document.delete(queryParams);

      expect(deleteResult).toBeDefined();
      expect(deleteResult.id).toBe(testDocumentId);

      await expect(document.retrieve()).rejects.toThrow(ObjectNotFound);
    });
  });
});
