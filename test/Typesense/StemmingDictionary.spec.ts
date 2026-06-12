import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { Client as TypesenseClient } from "../../src/Typesense";
import ApiCall from "../../src/Typesense/ApiCall";
import { createFetchMock, FetchMock } from "../fetchMock";

describe("StemmingDictionary", function () {
  let typesense;
  let stemmingDictionary;
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
    stemmingDictionary = typesense.stemming.dictionaries("set1");
    apiCall = new ApiCall(typesense.configuration);
    mockFetch = createFetchMock();
  });

  afterEach(function () {
    mockFetch.restore();
  });

  describe(".retrieve", function () {
    it("retrieves the dictionary", async function () {
      mockFetch
        .onGet(
          apiCall.uriFor(
            "/stemming/dictionaries/set1",
            typesense.configuration.nodes[0],
          ),
        )
        .reply((config) => {
          expect(config.headers).toMatchObject({
            accept: "application/json, text/plain, */*",
            "content-type": "application/json",
            "x-typesense-api-key": typesense.configuration.apiKey,
          });
          return [
            200,
            {
              id: "set1",
              words: [{ word: "people", root: "person" }],
            },
          ];
        });

      const returnData = await stemmingDictionary.retrieve();

      expect(returnData).toEqual({
        id: "set1",
        words: [{ word: "people", root: "person" }],
      });
    });
  });

  describe(".delete", function () {
    it("deletes the dictionary", async function () {
      mockFetch
        .onDelete(
          apiCall.uriFor(
            "/stemming/dictionaries/set1",
            typesense.configuration.nodes[0],
          ),
        )
        .reply(200, { id: "set1" });

      const returnData = await stemmingDictionary.delete();

      expect(returnData).toEqual({
        id: "set1",
      });
    });
  });
});
