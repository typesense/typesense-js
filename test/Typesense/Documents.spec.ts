import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { Client as TypesenseClient } from "../../src/Typesense";
import { ObjectNotFound, RequestMalformed } from "../../src/Typesense/Errors";

describe("Documents", function () {
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

  const testCollectionName = "test_companies_documents_search";
  const documentData = {
    id: "124",
    company_name: "Stark Industries",
    num_employees: 5215,
    country: "USA",
  };

  const anotherDocumentData = {
    id: "125",
    company_name: "Acme Corp",
    num_employees: 231,
    country: "USA",
  };

  beforeEach(async function () {
    try {
      await typesense.collections(testCollectionName).delete();
    } catch (error) {}

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

  describe(".search", function () {
    beforeEach(async function () {
      await typesense
        .collections<typeof documentData>(testCollectionName)
        .documents()
        .create(documentData);
      await typesense
        .collections<typeof documentData>(testCollectionName)
        .documents()
        .create(anotherDocumentData);
    });

    it("searches the documents in a collection", async function () {
      const searchParameters = {
        q: "Stark",
        query_by: "company_name",
      };

      const searchResult = await typesense
        .collections<typeof documentData>(testCollectionName)
        .documents()
        .search(searchParameters);

      expect(searchResult).toBeDefined();
      expect(searchResult.found).toBeGreaterThan(0);
      expect(searchResult.hits).toBeDefined();
      expect(Array.isArray(searchResult.hits)).toBe(true);

      const starkHit = searchResult.hits?.find(
        (hit: any) => hit.document.company_name === "Stark Industries",
      );
      expect(starkHit).toBeDefined();
      expect(starkHit!.document.company_name).toBe("Stark Industries");
    });

    it("searches with and without cache", async function () {
      const cachedTypesense = new TypesenseClient({
        nodes: [
          {
            host: "localhost",
            port: 8108,
            protocol: "http",
          },
        ],
        apiKey: "xyz",
        connectionTimeoutSeconds: 180,
        cacheSearchResultsForSeconds: 2 * 60,
      });

      const searchParameters = {
        q: "Stark",
        query_by: "company_name",
      };

      const firstResult = await cachedTypesense
        .collections<typeof documentData>(testCollectionName)
        .documents()
        .search(searchParameters);
      expect(firstResult).toBeDefined();
      expect(firstResult.found).toBeGreaterThan(0);

      await typesense
        .collections<typeof documentData>(testCollectionName)
        .documents()
        .create({
          ...documentData,
          company_name: "Stark Industries 2",
          id: "126",
        });

      // even though there's a new document, the search result should be the same, since they're cached
      const secondResult = await cachedTypesense
        .collections<typeof documentData>(testCollectionName)
        .documents()
        .search(searchParameters);
      expect(secondResult).toBeDefined();
      expect(secondResult.found).toBeGreaterThan(0);

      expect(secondResult.found).toBe(firstResult.found);
    });
  });

  describe(".create", function () {
    it("creates the document", async function () {
      const createdDocument = await typesense
        .collections<typeof documentData>(testCollectionName)
        .documents()
        .create(documentData);

      expect(createdDocument).toBeDefined();
      expect(createdDocument.id).toBe(documentData.id);
      expect(createdDocument.company_name).toBe(documentData.company_name);
      expect(createdDocument.num_employees).toBe(documentData.num_employees);
      expect(createdDocument.country).toBe(documentData.country);
    });
  });

  describe(".upsert", function () {
    it("upserts the document", async function () {
      const upsertResult = await typesense
        .collections<typeof documentData>(testCollectionName)
        .documents()
        .upsert(documentData, {
          dirty_values: "reject",
        });

      expect(upsertResult).toBeDefined();
      expect(upsertResult.id).toBe(documentData.id);
      expect(upsertResult.company_name).toBe(documentData.company_name);
    });
  });

  describe(".update", function () {
    it("updates the document", async function () {
      await typesense
        .collections<typeof documentData>(testCollectionName)
        .documents()
        .create(documentData);

      const updateResult = await typesense
        .collections<typeof documentData>(testCollectionName)
        .documents()
        .update(documentData, {
          dirty_values: "reject",
        });

      expect(updateResult).toBeDefined();
      expect(updateResult.id).toBe(documentData.id);
      expect(updateResult.company_name).toBe(documentData.company_name);
    });
  });

  describe(".createMany", function () {
    it("imports the documents", async function () {
      const importResult = await typesense
        .collections<typeof documentData>(testCollectionName)
        .documents()
        .import([documentData, anotherDocumentData]);

      expect(importResult).toBeDefined();
      expect(Array.isArray(importResult)).toBe(true);
      expect(importResult.length).toBe(2);

      for (const result of importResult) {
        expect(result.success).toBe(true);
      }
    });

    it("passes query parameters to the API", async function () {
      const importResult = await typesense
        .collections<typeof documentData>(testCollectionName)
        .documents()
        .import([documentData, anotherDocumentData], {
          action: "upsert",
        });

      expect(importResult).toBeDefined();
      expect(Array.isArray(importResult)).toBe(true);
      expect(importResult.length).toBe(2);
    });
  });

  describe(".import", function () {
    it("throws RequestMalformed error for empty array", async function () {
      await expect(
        typesense
          .collections<typeof documentData>(testCollectionName)
          .documents()
          .import([]),
      ).rejects.toThrow(RequestMalformed);
    });

    it("throws RequestMalformed error for empty string", async function () {
      await expect(
        typesense
          .collections<typeof documentData>(testCollectionName)
          .documents()
          .import(""),
      ).rejects.toThrow(RequestMalformed);
    });

    it("throws RequestMalformed error for null", async function () {
      await expect(
        typesense
          .collections<typeof documentData>(testCollectionName)
          .documents()
          .import(null as any),
      ).rejects.toThrow(RequestMalformed);
    });

    it("throws RequestMalformed error for undefined", async function () {
      await expect(
        typesense
          .collections<typeof documentData>(testCollectionName)
          .documents()
          .import(undefined as any),
      ).rejects.toThrow(RequestMalformed);
    });

    it("passes query parameters to the API", async function () {
      const jsonlData = [documentData, anotherDocumentData]
        .map((document) => JSON.stringify(document))
        .join("\n");

      const importResult = await typesense
        .collections<typeof documentData>(testCollectionName)
        .documents()
        .import(jsonlData, {
          action: "upsert",
        });

      expect(importResult).toBeDefined();
    });

    it("converts array to JSONL and returns array of results", async function () {
      const importResult = await typesense
        .collections<typeof documentData>(testCollectionName)
        .documents()
        .import([documentData, anotherDocumentData]);

      expect(importResult).toBeDefined();
      expect(Array.isArray(importResult)).toBe(true);
      expect(importResult.length).toBe(2);
    });

    it("sends JSONL string as is and returns a string", async function () {
      const jsonlData = [documentData, anotherDocumentData]
        .map((document) => JSON.stringify(document))
        .join("\n");

      const importResult = await typesense
        .collections<typeof documentData>(testCollectionName)
        .documents()
        .import(jsonlData);

      expect(importResult).toBeDefined();
      expect(typeof importResult).toBe("string");
    });
  });

  describe(".export", function () {
    beforeEach(async function () {
      await typesense
        .collections<typeof documentData>(testCollectionName)
        .documents()
        .create(documentData);
      await typesense
        .collections<typeof documentData>(testCollectionName)
        .documents()
        .create(anotherDocumentData);
    });

    it("exports the documents", async function () {
      const exportResult = await typesense
        .collections<typeof documentData>(testCollectionName)
        .documents()
        .export({
          include_fields: "company_name",
        });

      expect(exportResult).toBeDefined();
      expect(typeof exportResult).toBe("string");

      const lines = exportResult.split("\n").filter((line) => line.trim());
      expect(lines.length).toBeGreaterThan(0);

      const firstDocument = JSON.parse(lines[0]);
      expect(firstDocument.company_name).toBeDefined();
    });
  });

  describe(".delete", function () {
    beforeEach(async function () {
      await typesense
        .collections<typeof documentData>(testCollectionName)
        .documents()
        .create(documentData);
      await typesense
        .collections<typeof documentData>(testCollectionName)
        .documents()
        .create(anotherDocumentData);
    });

    it("deletes documents", async function () {
      const deleteResult = await typesense
        .collections<typeof documentData>(testCollectionName)
        .documents(documentData.id)
        .delete();

      expect(deleteResult).toBeDefined();

      const searchResult = await typesense
        .collections<typeof documentData>(testCollectionName)
        .documents()
        .search({
          q: "Stark",
          query_by: "company_name",
        });
      expect(searchResult.found).toBe(0);
    });
  });
});
