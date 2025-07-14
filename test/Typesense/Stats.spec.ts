import { describe, it, expect, beforeEach } from "vitest";
import { Client as TypesenseClient } from "../../src/Typesense";
import ApiCall from "../../src/Typesense/ApiCall";
import axios from "axios";
import MockAxiosAdapter from "axios-mock-adapter";

describe("Stats", function () {
  let mockAxios;
  let typesense;
  let apiCall;

  beforeEach(function () {
    mockAxios = new MockAxiosAdapter(axios);
    typesense = new TypesenseClient({
      nodes: [
        {
          host: "node0",
          port: "8108",
          protocol: "http",
        },
      ],
      apiKey: "abcd",
      randomizeNodes: false,
    });
    apiCall = new ApiCall(typesense.configuration);
  });

  describe(".retrieve", function () {
    it("retrieves stats", async function () {
      mockAxios
        .onGet(
          apiCall.uriFor("/stats.json", typesense.configuration.nodes[0]),
          undefined,
          {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
            "X-TYPESENSE-API-KEY": typesense.configuration.apiKey,
          },
        )
        .reply(200, "{}", { "content-type": "application/json" });

      const returnData = await typesense.stats.retrieve();

      expect(returnData).toEqual({});
    });
  });
});
