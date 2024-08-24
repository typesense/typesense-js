import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import { Client as TypesenseClient } from "../../src/Typesense";
import ApiCall from "../../src/Typesense/ApiCall";
import fetchMock from "fetch-mock";

let expect = chai.expect;
chai.use(chaiAsPromised);

describe("Debug", function () {
  let typesense;
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
    apiCall = new ApiCall(typesense.configuration);
    fetchMock.reset();
  });

  describe(".retrieve", function () {
    it("retrieves debugging information", function (done) {
      let debugInfo = { version: "0.8.0" };
      fetchMock.get(
        apiCall.uriFor("/debug", typesense.configuration.nodes[0]),
        {
          body: JSON.stringify(debugInfo),
          status: 200,
          headers: { "Content-Type": "application/json" },
        },
        {
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
            "X-TYPESENSE-API-KEY": typesense.configuration.apiKey,
          },
        }
      );

      let returnData = typesense.debug.retrieve();

      expect(returnData).to.eventually.deep.equal(debugInfo).notify(done);
    });
  });
});
