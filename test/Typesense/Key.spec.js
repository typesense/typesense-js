import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import { Client as TypesenseClient } from "../../src/Typesense";
import ApiCall from "../../src/Typesense/ApiCall";
import fetchMock from "fetch-mock";

let expect = chai.expect;
chai.use(chaiAsPromised);

describe("Key", function () {
  let typesense;
  let key;
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
    key = typesense.keys("123");
    apiCall = new ApiCall(typesense.configuration);

    // Reset fetchMock before each test to ensure a clean state
    fetchMock.reset();
  });

  afterEach(function () {
    // Restore fetchMock after each test
    fetchMock.restore();
  });

  describe(".retrieve", function () {
    it("retrieves the key", function (done) {
      fetchMock.getOnce(
        apiCall.uriFor("/keys/123", typesense.configuration.nodes[0]),
        {
          status: 200,
          body: {},
          headers: { "content-type": "application/json" },
        },
        {
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
            "X-TYPESENSE-API-KEY": typesense.configuration.apiKey,
          },
        }
      );

      let returnData = key.retrieve();

      expect(returnData).to.eventually.deep.equal({}).notify(done);
    });
  });

  describe(".delete", function () {
    it("deletes a key", function (done) {
      fetchMock.deleteOnce(
        apiCall.uriFor("/keys/123", typesense.configuration.nodes[0]),
        {
          status: 200,
          body: {},
          headers: { "content-type": "application/json" },
        },
        {
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
            "X-TYPESENSE-API-KEY": typesense.configuration.apiKey,
          },
        }
      );

      let returnData = key.delete();

      expect(returnData).to.eventually.deep.equal({}).notify(done);
    });
  });
});
