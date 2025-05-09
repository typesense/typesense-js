import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import { Client as TypesenseClient } from "../../src/index";
import ApiCall from "../../src/Typesense/ApiCall";
import axios from "axios";
import MockAxiosAdapter from "axios-mock-adapter";

let expect = chai.expect;
chai.use(chaiAsPromised);

describe("AnalyticsEvents", function () {
  let typesense;
  let analyticsEvents;
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
    analyticsEvents = typesense.analytics.events();
    apiCall = new ApiCall(typesense.configuration);
    mockAxios = new MockAxiosAdapter(axios);
  });

  describe(".create", function () {
    it("creates an analytics rule", function (done) {
      mockAxios
        .onPost(
          apiCall.uriFor("/analytics/events", typesense.configuration.nodes[0]),
          {
            type: "conversion",
            name: "products_purchase_event",
            data: {
              doc_id: "1022",
              user_id: "111117",
            },
          },
          {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
            "X-TYPESENSE-API-KEY": typesense.configuration.apiKey,
          },
        )
        .reply(201, "{}", { "content-type": "application/json" });

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
