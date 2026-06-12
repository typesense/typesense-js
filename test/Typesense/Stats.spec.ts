import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { Client as TypesenseClient } from "../../src/Typesense";
import ApiCall from "../../src/Typesense/ApiCall";
import { createFetchMock, FetchMock } from "../fetchMock";

describe("Stats", function () {
  let mockFetch: FetchMock;
  let typesense;
  let apiCall;

  beforeEach(function () {
    mockFetch = createFetchMock();
    typesense = new TypesenseClient({
      nodes: [
        {
          host: "node0",
          port: 8108,
          protocol: "http",
        },
      ],
      apiKey: "abcd",
      randomizeNodes: false,
    });
    apiCall = new ApiCall(typesense.configuration);
  });

  afterEach(function () {
    mockFetch.restore();
  });

  describe(".retrieve", function () {
    it("retrieves stats", async function () {
      mockFetch
        .onGet(apiCall.uriFor("/stats.json", typesense.configuration.nodes[0]))
        .reply((config) => {
          expect(config.headers).toMatchObject({
            accept: "application/json, text/plain, */*",
            "content-type": "application/json",
            "x-typesense-api-key": typesense.configuration.apiKey,
          });
          return [200, {}, { "content-type": "application/json" }];
        });

      const returnData = await typesense.stats.retrieve();

      expect(returnData).toEqual({});
    });
  });
});
