import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import { Client as TypesenseClient } from "../../src/index";
import ApiCall from "../../src/Typesense/ApiCall";
import axios from "axios";
import MockAxiosAdapter from "axios-mock-adapter";

let expect = chai.expect;
chai.use(chaiAsPromised);

describe("AnalyticsRules", function () {
  let typesense;
  let analyticsRules;
  let apiCall;
  let mockAxios;
  beforeEach(function () {
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
    analyticsRules = typesense.analytics.rules();
    apiCall = new ApiCall(typesense.configuration);
    mockAxios = new MockAxiosAdapter(axios);
  });

  describe(".upsert", function () {
    it("upserts an analytics rule", function (done) {
      mockAxios
        .onPut(
          apiCall.uriFor(
            "/analytics/rules/search_suggestions",
            typesense.configuration.nodes[0],
          ),
          {
            type: "popular_queries",
            params: {
              source: { collections: ["products"] },
              destination: { collection: "products_top_queries" },
              expand_query: true,
              limit: 100,
            },
          },
          {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
            "X-TYPESENSE-API-KEY": typesense.configuration.apiKey,
          },
        )
        .reply(201, "{}", { "content-type": "application/json" });

      let returnData = analyticsRules.upsert("search_suggestions", {
        type: "popular_queries",
        params: {
          source: { collections: ["products"] },
          destination: { collection: "products_top_queries" },
          expand_query: true,
          limit: 100,
        },
      });

      expect(returnData).to.eventually.deep.equal({}).notify(done);
    });
  });

  describe(".retrieve", function () {
    it("retrieves all analytics rules", function (done) {
      mockAxios
        .onGet(
          apiCall.uriFor("/analytics/rules", typesense.configuration.nodes[0]),
          undefined,
          {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
            "X-TYPESENSE-API-KEY": typesense.configuration.apiKey,
          },
        )
        .reply(200, "[]", { "content-type": "application/json" });

      let returnData = analyticsRules.retrieve();

      expect(returnData).to.eventually.deep.equal([]).notify(done);
    });
  });
});
