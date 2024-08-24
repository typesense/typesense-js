import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import { Client as TypesenseClient } from "../../src/Typesense";
import ApiCall from "../../src/Typesense/ApiCall";
import fetchMock from "fetch-mock";

let expect = chai.expect;
chai.use(chaiAsPromised);

describe("AnalyticsEvents", function () {
  let typesense;
  let analyticsEvents;
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
    analyticsEvents = typesense.analytics.events();
    apiCall = new ApiCall(typesense.configuration);

    // Set up fetch-mock before each test
    fetchMock.restore(); // Reset any previous mocks
  });

  afterEach(function () {
    // Ensure fetch-mock is reset after each test
    fetchMock.restore();
  });

  describe(".create", function () {
    it("creates an analytics rule", function (done) {
      // Mock the POST request using fetch-mock
      fetchMock.post(
        apiCall.uriFor("/analytics/events", typesense.configuration.nodes[0]),
        {
          status: 201,
          body: {},
          headers: { "content-type": "application/json" },
        },
      );

      let returnData = analyticsEvents.create({
        type: "conversion",
        name: "products_purchase_event",
        data: {
          doc_id: "1022",
          user_id: "111117",
        },
      });

      expect(returnData).to.eventually.deep.equal({}).notify(done);
    });
  });
});
