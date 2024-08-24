import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import { Client as TypesenseClient } from "../../src/Typesense";
import ApiCall from "../../src/Typesense/ApiCall";
import fetchMock from "fetch-mock";

let expect = chai.expect;
chai.use(chaiAsPromised);

describe("Metrics", function () {
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

  afterEach(function () {
    fetchMock.restore();
  });

  describe(".retrieve", function () {
    it("retrieves metrics", function (done) {
      fetchMock.getOnce(
        apiCall.uriFor("/metrics.json", typesense.configuration.nodes[0]),
        {
          status: 200,
          body: "{}",
          headers: { "Content-Type": "application/json" },
        }
      );

      let returnData = typesense.metrics.retrieve();

      expect(returnData).to.eventually.deep.equal({}).notify(done);
    });
  });
});