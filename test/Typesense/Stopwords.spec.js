import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import { Client as TypesenseClient } from "../../src/Typesense";
import ApiCall from "../../src/Typesense/ApiCall";
import fetchMock from "fetch-mock";

let expect = chai.expect;
chai.use(chaiAsPromised);

describe("Stopwords", function () {
  let typesense;
  let stopwords;
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
    stopwords = typesense.stopwords();
    apiCall = new ApiCall(typesense.configuration);
    fetchMock.reset();
  });

  afterEach(function () {
    fetchMock.restore();
  });

  describe(".upsert", function () {
    it("upserts a stopword", function (done) {
      fetchMock.putOnce(
        apiCall.uriFor("/stopwords/stopword-1", typesense.configuration.nodes[0]),
        {
          body: JSON.stringify({}),
          status: 201,
          headers: { "Content-Type": "application/json" },
        },
        {
          body: {
            stopwords: ["a", "the"],
          },
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
            "X-TYPESENSE-API-KEY": typesense.configuration.apiKey,
          },
        }
      );

      let returnData = stopwords.upsert("stopword-1", {
        stopwords: ["a", "the"],
      });

      expect(returnData).to.eventually.deep.equal({}).notify(done);
    });
  });

  describe(".retrieve", function () {
    it("retrieves all stopwords", function (done) {
      fetchMock.getOnce(
        apiCall.uriFor("/stopwords", typesense.configuration.nodes[0]),
        {
          body: JSON.stringify([]),
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

      let returnData = stopwords.retrieve();

      expect(returnData).to.eventually.deep.equal([]).notify(done);
    });
  });
});
