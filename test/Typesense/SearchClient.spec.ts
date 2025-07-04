import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { SearchClient as TypesenseSearchClient } from "../../src/Typesense";
import MockAxiosAdapter from "axios-mock-adapter";
import axios from "axios";

describe("SearchClient", function () {
  let typesense: TypesenseSearchClient;
  let mockAxios: MockAxiosAdapter;

  beforeEach(function () {
    typesense = new TypesenseSearchClient({
      nodes: [
        {
          host: "node0",
          port: 8108,
          protocol: "http",
        },
      ],
      apiKey: "abcd",
      randomizeNodes: false,
      cacheSearchResultsForSeconds: 2 * 60,
    });

    mockAxios = new MockAxiosAdapter(axios);
  });

  afterEach(function () {
    mockAxios.reset();
  });

  it("should set the right default configuration values", function () {
    // @ts-expect-error - configuration is private
    expect(typesense.configuration.nodes).toEqual([
      {
        host: "node0",
        port: 8108,
        protocol: "http",
        path: "",
      },
    ]);
    // @ts-expect-error - configuration is private
    expect(typesense.configuration.connectionTimeoutSeconds).toEqual(5);
    // @ts-expect-error - configuration is private
    expect(typesense.configuration.apiKey).toEqual("abcd");
  });

  it("should only expose the search endpoints", function () {
    expect(typeof typesense.collections("xyz").documents().search).toBe(
      "function",
    );
    expect(typeof typesense.multiSearch.perform).toBe("function");
    // @ts-expect-error - keys is not defined
    expect(typesense.keys).toBeUndefined();
  });

  it("should send the api key via headers, when key is over 2000 characters, even if sendApiKeyAsQueryParam is true", async function () {
    const longApiKey = "a".repeat(2001);
    const testTypesense = new TypesenseSearchClient({
      nodes: [
        {
          host: "node0",
          port: 8108,
          protocol: "http",
        },
      ],
      apiKey: longApiKey,
      randomizeNodes: false,
      sendApiKeyAsQueryParam: true,
    });
    const searches = {
      searches: [{ q: "term1" }, { q: "term2" }],
    };
    const commonParams = {
      collection: "docs",
      query_by: "field",
    };

    mockAxios
      .onPost("http://node0:8108/multi_search", searches, {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "text/plain",
        "X-TYPESENSE-API-KEY": longApiKey,
      })
      .reply((config: any) => {
        expect(config.params["x-typesense-api-key"]).toBeUndefined();
        return [200, "{}", { "content-type": "application/json" }];
      });

    const returnData = await testTypesense.multiSearch.perform(
      searches,
      commonParams,
    );

    expect(returnData).toEqual({});
  });

  it("should programatically clear document cache", async function () {
    const documents = typesense.collections("companies").documents();
    const searchParameters = [
      {
        q: "Stark",
        query_by: "company_name",
      },
    ];
    const stubbedSearchResults = [
      {
        facet_counts: [],
        found: 0,
        search_time_ms: 0,
        page: 0,
        hits: [
          {
            _highlight: {
              company_name: "<mark>Stark</mark> Industries",
            },
            document: {
              id: "124",
              company_name: "Stark Industries",
              num_employees: 5215,
              country: "USA",
            },
          },
        ],
      },
    ];

    searchParameters.forEach((_, i: number) => {
      mockAxios
        .onGet("http://node0:8108/collections/companies/documents/search")
        .reply(200, JSON.stringify(stubbedSearchResults[i]), {
          "content-type": "application/json",
        });
    });

    await documents.search(searchParameters[0], {});

    typesense.clearCache();

    await documents.search(searchParameters[0], {});

    // if 2 requests are made, then we know that cache was cleared successfully
    expect(mockAxios.history["get"].length).toBe(2);
  });

  it("should programatically clear multi_search cache", async function () {
    const searchRequests = [
      {
        searches: [{ q: "term1" }, { q: "term2" }],
      },
    ];
    const commonParams = [
      {
        collection: "docs",
        query_by: "field",
      },
    ];
    const stubbedSearchResults = [{ results1: [] }, { results2: [] }];

    searchRequests.forEach((_, i: number) => {
      mockAxios
        .onPost("http://node0:8108/multi_search")
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .reply((config: any) => {
          return [
            200,
            JSON.stringify(stubbedSearchResults[i]),
            { "content-type": "application/json" },
          ];
        });
    });

    await typesense.multiSearch.perform(searchRequests[0], commonParams[0]);

    // programmatically clear cache
    typesense.clearCache();

    await typesense.multiSearch.perform(searchRequests[0], commonParams[0]);

    // if 2 requests are made, then we know that cache was cleared successfully
    expect(mockAxios.history["post"].length).toBe(2);
  });
});
