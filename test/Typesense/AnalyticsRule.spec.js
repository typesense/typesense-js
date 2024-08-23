import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import { Client as TypesenseClient } from "../../src/Typesense";
import ApiCall from "../../src/Typesense/ApiCall";
import fetchMock from "fetch-mock";

let expect = chai.expect;
chai.use(chaiAsPromised);

describe("AnalyticsRule", function () {
  let typesense;
  let analyticsRule;
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
    analyticsRule = typesense.analytics.rules("123");
    apiCall = new ApiCall(typesense.configuration);

    // Reset fetchMock before each test to ensure a clean state
    fetchMock.reset();
  });

  describe(".retrieve", function () {
    it("retrieves the rule", function (done) {
      fetchMock.get(
        apiCall.uriFor(
          "/analytics/rules/123",
          typesense.configuration.nodes[0],
        ),
        {
          status: 200,
          body: JSON.stringify({}),
          headers: { "content-type": "application/json" },
        },
      );

      let returnData = analyticsRule.retrieve();

      expect(returnData).to.eventually.deep.equal({}).notify(done);
    });
  });

  describe(".delete", function () {
    it("deletes a rule", function (done) {
      fetchMock.delete(
        apiCall.uriFor(
          "/analytics/rules/123",
          typesense.configuration.nodes[0],
        ),
        {
          status: 200,
          body: JSON.stringify({}),
          headers: { "content-type": "application/json" },
        },
      );

      let returnData = analyticsRule.delete();

      expect(returnData).to.eventually.deep.equal({}).notify(done);
    });
  });
});
