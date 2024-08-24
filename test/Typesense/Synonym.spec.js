import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import { Client as TypesenseClient } from "../../src/Typesense";
import ApiCall from "../../src/Typesense/ApiCall";
import fetchMock from "fetch-mock";

let expect = chai.expect;
chai.use(chaiAsPromised);

describe("Synonym", function () {
  let typesense;
  let synonym;
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

    synonym = typesense.collections("companies").synonyms("synonym-set-1");
    apiCall = new ApiCall(typesense.configuration);
    fetchMock.reset();
  });

  afterEach(function () {
    fetchMock.restore();
  });

  describe(".retrieve", function () {
    it("retrieves the synonym with the given ID", function (done) {
      fetchMock.getOnce(
        apiCall.uriFor(
          "/collections/companies/synonyms/synonym-set-1",
          typesense.configuration.nodes[0]
        ),
        {
          body: JSON.stringify({}),
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

      let returnData = synonym.retrieve();
      expect(returnData).to.eventually.deep.equal({}).notify(done);
    });
  });

  describe(".delete", function () {
    it("deletes the synonym with the given ID", function (done) {
      fetchMock.deleteOnce(
        apiCall.uriFor(
          "/collections/companies/synonyms/synonym-set-1",
          typesense.configuration.nodes[0]
        ),
        {
          body: JSON.stringify({}),
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

      let returnData = synonym.delete();

      expect(returnData).to.eventually.deep.equal({}).notify(done);
    });
  });
});
