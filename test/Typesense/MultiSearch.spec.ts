import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { Client as TypesenseClient } from "../../src/Typesense";
import { ObjectNotFound } from "../../src/Typesense/Errors";
import logger from "loglevel";

type MultiSearchResult = {
  title: string;
  content: string;
  tags: string[];
};

describe("MultiSearch", function () {
  const mockConsole = {
    error: vi.fn(),
    warn: vi.fn(),
    info: vi.fn(),
    log: vi.fn(),
    debug: vi.fn(),
  };

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
    cacheSearchResultsForSeconds: 2 * 60,
  });

  const testCollectionName = "test_docs_multisearch";
  const testDocuments = [
    {
      id: "1",
      title: "First document",
      content: "This is the first document content",
      tags: ["tag1", "tag2"],
    },
    {
      id: "2",
      title: "Second document",
      content: "This is the second document content",
      tags: ["tag2", "tag3"],
    },
    {
      id: "3",
      title: "Third document",
      content: "This is the third document content",
      tags: ["tag1", "tag3"],
    },
  ];

  beforeEach(async function () {
    // Setup console mocking
    vi.spyOn(console, "error").mockImplementation(mockConsole.error);
    vi.spyOn(console, "warn").mockImplementation(mockConsole.warn);
    vi.spyOn(console, "info").mockImplementation(mockConsole.info);
    vi.spyOn(console, "log").mockImplementation(mockConsole.log);
    vi.spyOn(console, "debug").mockImplementation(mockConsole.debug);

    typesense.multiSearch.logger.setLevel(logger.levels.INFO);

    // Clear any previous mock calls
    vi.clearAllMocks();

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
          facet: true,
          sort: true,
        },
        {
          name: "content",
          type: "string",
          facet: true,
          sort: true,
        },
        {
          name: "tags",
          type: "string[]",
          facet: true,
        },
      ],
    });

    await typesense
      .collections(testCollectionName)
      .documents()
      .import(testDocuments);
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

  describe(".perform", function () {
    it("performs a multi-search with real data", async function () {
      const searches = {
        searches: [
          { q: "first", query_by: "title" },
          { q: "second", query_by: "title" },
        ],
      };
      const commonParams = {
        collection: testCollectionName,
      };

      const result = await typesense.multiSearch.perform<[MultiSearchResult]>(
        searches,
        commonParams,
      );

      expect(result).toBeDefined();
      expect(result.results).toBeDefined();
      expect(result.results.length).toBe(2);

      expect(result.results[0].hits).toBeDefined();
      expect(result.results[0].hits?.length).toBeGreaterThan(0);
      expect(result.results[0].hits?.[0].document.title).toContain("First");

      expect(result.results[1].hits).toBeDefined();
      expect(result.results[1].hits?.length).toBeGreaterThan(0);
      expect(result.results[1].hits?.[0].document.title).toContain("Second");
    });

    it("performs multi-search with faceting", async function () {
      const searches = {
        searches: [
          { q: "document", query_by: "title", facet_by: "tags" },
          { q: "document", query_by: "content", facet_by: "tags" },
        ],
      };
      const commonParams = {
        collection: testCollectionName,
      };

      const result = await typesense.multiSearch.perform<[MultiSearchResult]>(
        searches,
        commonParams,
      );

      expect(result).toBeDefined();
      expect(result.results).toBeDefined();
      expect(result.results.length).toBe(2);

      // Check if facet_counts exists and has data
      expect(result.results[0].facet_counts).toBeDefined();
      expect(result.results[1].facet_counts).toBeDefined();

      // If facet_counts exists, verify its structure
      if (
        result.results[0].facet_counts &&
        result.results[0].facet_counts.length > 0
      ) {
        const firstSearchFacets = result.results[0].facet_counts[0];
        expect(firstSearchFacets.field_name).toBe("tags");
        expect(firstSearchFacets.counts).toBeDefined();
        expect(firstSearchFacets.counts.length).toBeGreaterThan(0);
      }
    });

    it("performs multi-search with different query parameters", async function () {
      const searches = {
        searches: [
          { q: "document", query_by: "title", sort_by: "title:asc" },
          { q: "document", query_by: "content", sort_by: "title:desc" },
        ],
      };
      const commonParams = {
        collection: testCollectionName,
      };

      const result = await typesense.multiSearch.perform<[MultiSearchResult]>(
        searches,
        commonParams,
      );

      expect(result).toBeDefined();
      expect(result.results).toBeDefined();
      expect(result.results.length).toBe(2);

      // Check if hits exist before accessing length
      expect(result.results[0].hits).toBeDefined();
      expect(result.results[1].hits).toBeDefined();

      if (result.results[0].hits && result.results[1].hits) {
        expect(result.results[0].hits.length).toBeGreaterThan(0);
        expect(result.results[1].hits.length).toBeGreaterThan(0);

        const firstSearchTitles = result.results[0].hits.map(
          (hit) => hit.document.title,
        );
        const secondSearchTitles = result.results[1].hits.map(
          (hit) => hit.document.title,
        );

        expect(firstSearchTitles).not.toEqual(secondSearchTitles);
      }
    });

    it("handles empty search results", async function () {
      const searches = {
        searches: [
          { q: "nonexistent", query_by: "title" },
          { q: "nonexistent", query_by: "content" },
        ],
      };
      const commonParams = {
        collection: testCollectionName,
      };

      const result = await typesense.multiSearch.perform<[MultiSearchResult]>(
        searches,
        commonParams,
      );

      expect(result).toBeDefined();
      expect(result.results).toBeDefined();
      expect(result.results.length).toBe(2);

      expect(result.results[0].hits?.length).toBe(0);
      expect(result.results[1].hits?.length).toBe(0);
    });

    it("warns when individual search pagination is used with union: true", async function () {
      const searches = {
        union: true as const,
        searches: [
          { q: "first", query_by: "title", page: 1 },
          { q: "second", query_by: "title", per_page: 10 },
        ],
      };
      const commonParams = {
        collection: testCollectionName,
      };

      await typesense.multiSearch.perform(searches, commonParams);

      expect(mockConsole.warn).toHaveBeenCalledWith(
        "Individual `searches` pagination parameters are ignored when `union: true` is set. Use a top-level pagination parameter instead. See https://typesense.org/docs/29.0/api/federated-multi-search.html#union-search"
      );
    });

    it("does not warn when union: true is used without individual search pagination", async function () {
      const searches = {
        union: true as const,
        searches: [
          { q: "first", query_by: "title" },
          { q: "second", query_by: "title" },
        ],
      };
      const commonParams = {
        collection: testCollectionName,
        page: 1, // top-level pagination is fine
      };

      await typesense.multiSearch.perform(searches, commonParams);

      expect(mockConsole.warn).not.toHaveBeenCalled();
    });

    it("does not warn when union is false with individual search pagination", async function () {
      const searches = {
        union: false as const,
        searches: [
          { q: "first", query_by: "title", page: 1 },
          { q: "second", query_by: "title", per_page: 10 },
        ],
      };
      const commonParams = {
        collection: testCollectionName,
      };

      await typesense.multiSearch.perform(searches, commonParams);

      expect(mockConsole.warn).not.toHaveBeenCalled();
    });
  });
});
