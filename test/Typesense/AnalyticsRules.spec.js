import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import { Client as TypesenseClient } from "../../src/Typesense";
import ApiCall from "../../src/Typesense/ApiCall";
import fetchMock from "fetch-mock";

let expect = chai.expect;
chai.use(chaiAsPromised);

describe("AnalyticsRules", function () {
  let typesense;
  let analyticsRules;
  let apiCall;

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

    // Reset fetchMock before each test to ensure a clean state
    fetchMock.reset();
  });

  describe(".upsert", function () {
    it("upserts an analytics rule", function (done) {
      fetchMock.put(
        apiCall.uriFor(
          "/analytics/rules/search_suggestions",
          typesense.configuration.nodes[0],
        ),
        {
          status: 201,
          body: JSON.stringify({}),
          headers: { "content-type": "application/json" },
        },
      );

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
      fetchMock.get(
        apiCall.uriFor("/analytics/rules", typesense.configuration.nodes[0]),
        {
          status: 200,
          body: JSON.stringify([]),
          headers: { "content-type": "application/json" },
        },
      );

      let returnData = analyticsRules.retrieve();

      expect(returnData).to.eventually.deep.equal([]).notify(done);
    });
  });
});
