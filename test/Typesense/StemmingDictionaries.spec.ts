import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { Client as TypesenseClient } from "../../src/Typesense";
import ApiCall from "../../src/Typesense/ApiCall";
import { createFetchMock, FetchMock } from "../fetchMock";

describe("StemmingDictionaries", function () {
  let typesense;
  let stemmingDictionaries;
  let apiCall;
  let mockFetch: FetchMock;

  beforeEach(function () {
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
    stemmingDictionaries = typesense.stemming.dictionaries();
    apiCall = new ApiCall(typesense.configuration);
    mockFetch = createFetchMock();
  });

  afterEach(function () {
    mockFetch.restore();
  });

  describe(".retrieve", function () {
    it("retrieves all stemming dictionaries", async function () {
      mockFetch
        .onGet(
          apiCall.uriFor(
            "/stemming/dictionaries",
            typesense.configuration.nodes[0],
          ),
        )
        .reply((config) => {
          expect(config.headers).toMatchObject({
            accept: "application/json, text/plain, */*",
            "content-type": "application/json",
            "x-typesense-api-key": typesense.configuration.apiKey,
          });
          return [200, { dictionaries: ["set1", "set2"] }];
        });

      const returnData = await stemmingDictionaries.retrieve();

      expect(returnData).toEqual({
        dictionaries: ["set1", "set2"],
      });
    });
  });
});
