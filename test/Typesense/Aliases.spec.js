import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import { Client as TypesenseClient } from "../../src/Typesense";
import ApiCall from "../../src/Typesense/ApiCall";
import fetchMock from "fetch-mock";

let expect = chai.expect;
chai.use(chaiAsPromised);

describe("Aliases", function () {
  let typesense;
  let aliases;
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
    aliases = typesense.aliases();
    apiCall = new ApiCall(typesense.configuration);
    fetchMock.reset();
  });

  afterEach(function () {
    fetchMock.restore();
  });

  describe(".upsert", function () {
    it("upserts an alias", function (done) {
      fetchMock.putOnce(
        apiCall.uriFor("/aliases/books", typesense.configuration.nodes[0]),
        {
          status: 201,
          body: "{}",
          headers: { "Content-Type": "application/json; charset=utf-8" },
        }
      );

      let returnData = aliases.upsert("books", {
        collection_name: "books_january",
      });

      expect(returnData).to.eventually.deep.equal({}).notify(done);
    });
  });

  describe(".retrieve", function () {
    it("retrieves all aliases", function (done) {
      fetchMock.getOnce(
        apiCall.uriFor("/aliases", typesense.configuration.nodes[0]),
        {
          status: 200,
          body: "[]",
          headers: { "Content-Type": "application/json; charset=utf-8" },
        }
      );

      let returnData = aliases.retrieve();

      expect(returnData).to.eventually.deep.equal([]).notify(done);
    });
  });
});
