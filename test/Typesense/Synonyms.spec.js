import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import { Client as TypesenseClient } from "../../src/Typesense";
import ApiCall from "../../src/Typesense/ApiCall";
import fetchMock from "fetch-mock";

let expect = chai.expect;
chai.use(chaiAsPromised);

describe("Synonyms", function () {
  let typesense;
  let synonyms;
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

    synonyms = typesense.collections("companies").synonyms();
    apiCall = new ApiCall(typesense.configuration);
    fetchMock.reset();
  });

  afterEach(function () {
    fetchMock.restore();
  });

  describe(".create", function () {
    it("creates the synonym in the collection", function (done) {
      fetchMock.putOnce(
        apiCall.uriFor(
          "/collections/companies/synonyms/synonym-set-1",
          typesense.configuration.nodes[0]
        ),
        {
          body: JSON.stringify({}),
          status: 201,
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

      let returnData = synonyms.upsert("synonym-set-1", {});
      expect(returnData).to.eventually.deep.equal({}).notify(done);
    });
  });

  describe(".retrieve", function () {
    it("retrieves all synonyms", function (done) {
      fetchMock.getOnce(
        apiCall.uriFor(
          "/collections/companies/synonyms",
          typesense.configuration.nodes[0]
        ),
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

      let returnData = synonyms.retrieve();

      expect(returnData).to.eventually.deep.equal([]).notify(done);
    });
  });
});
