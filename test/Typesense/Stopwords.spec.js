import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import { Client as TypesenseClient } from "../../src/Typesense";
import ApiCall from "../../src/Typesense/ApiCall";
import axios from "axios";
import MockAxiosAdapter from "axios-mock-adapter";

let expect = chai.expect;
chai.use(chaiAsPromised);

describe("Stopwords", function () {
  let typesense;
  let stopwords;
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
    stopwords = typesense.stopwords();
    apiCall = new ApiCall(typesense.configuration);
    mockAxios = new MockAxiosAdapter(axios);
  });

  describe(".upsert", function () {
    it("upserts a stopword", function (done) {
      mockAxios
        .onPut(
          apiCall.uriFor(
            "/stopwords/stopword-1",
            typesense.configuration.nodes[0],
          ),
          {
            stopwords: ["a", "the"],
          },
          {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
            "X-TYPESENSE-API-KEY": typesense.configuration.apiKey,
          },
        )
        .reply(201, "{}", { "content-type": "application/json" });

      let returnData = stopwords.upsert("stopword-1", {
        stopwords: ["a", "the"],
      });

      expect(returnData).to.eventually.deep.equal({}).notify(done);
    });
  });

  describe(".retrieve", function () {
    it("retrieves all stopwords", function (done) {
      mockAxios
        .onGet(
          apiCall.uriFor("/stopwords", typesense.configuration.nodes[0]),
          undefined,
          {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
            "X-TYPESENSE-API-KEY": typesense.configuration.apiKey,
          },
        )
        .reply(200, "[]", { "content-type": "application/json" });

      let returnData = stopwords.retrieve();

      expect(returnData).to.eventually.deep.equal([]).notify(done);
    });
  });
});
