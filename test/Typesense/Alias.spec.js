import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import { Client as TypesenseClient } from "../../src/Typesense";
import ApiCall from "../../src/Typesense/ApiCall";
import fetchMock from "fetch-mock";

let expect = chai.expect;
chai.use(chaiAsPromised);

describe("Alias", function () {
  let typesense;
  let alias;
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
    alias = typesense.aliases("companies");
    apiCall = new ApiCall(typesense.configuration);
  });

  describe(".retrieve", function () {
    it("retrieves the alias", function (done) {
      fetchMock.get(
        apiCall.uriFor("/aliases/companies", typesense.configuration.nodes[0]),
        {
          status: 200,
          body: JSON.stringify({}),
          headers: { "content-type": "application/json; charset=utf-8" },
        },
      );

      let returnData = alias.retrieve();

      expect(returnData).to.eventually.deep.equal({}).notify(done);
    });
  });

  describe(".delete", function () {
    it("deletes an alias", function (done) {
      fetchMock.delete(
        apiCall.uriFor("/aliases/companies", typesense.configuration.nodes[0]),
        {
          status: 200,
          body: JSON.stringify({}),
          headers: { "content-type": "application/json; charset=utf-8" },
        },
      );

      let returnData = alias.delete();

      expect(returnData).to.eventually.deep.equal({}).notify(done);
    });
  });
});
