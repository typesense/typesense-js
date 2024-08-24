import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import { Client as TypesenseClient } from "../../src/Typesense";
import ApiCall from "../../src/Typesense/ApiCall";
import fetchMock from "fetch-mock";

let expect = chai.expect;
chai.use(chaiAsPromised);

describe("Operations", function () {
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

  describe(".perform", function () {
    it("performs the operation", function (done) {
      fetchMock.postOnce(
        apiCall.uriFor(
          "/operations/snapshot",
          typesense.configuration.nodes[0]
        ),
        {
          body: JSON.stringify({}),
          status: 200,
          headers: { "Content-Type": "application/json" },
        },
        {
          query: { snapshot_path: "/tmp/dbsnap" },
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
            "X-TYPESENSE-API-KEY": typesense.configuration.apiKey,
          },
        }
      );

      let returnData = typesense.operations.perform("snapshot", {
        snapshot_path: "/tmp/dbsnap",
      });

      expect(returnData).to.eventually.deep.equal({}).notify(done);
    });
  });
});
