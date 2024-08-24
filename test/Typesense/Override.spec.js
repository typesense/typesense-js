import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import { Client as TypesenseClient } from "../../src/Typesense";
import ApiCall from "../../src/Typesense/ApiCall";
import fetchMock from "fetch-mock";

let expect = chai.expect;
chai.use(chaiAsPromised);

describe("Override", function () {
  let typesense;
  let overrideData;
  let override;
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

    overrideData = {
      id: "lex-exact",
      rule: {
        query: "lex luthor",
        match: "exact",
      },
      includes: [{ id: "125", position: 1 }],
      excludes: [{ id: "124" }],
    };

    override = typesense.collections("companies").overrides("lex-exact");
    apiCall = new ApiCall(typesense.configuration);
    fetchMock.reset();
  });

  afterEach(function () {
    fetchMock.restore();
  });

  describe(".retrieve", function () {
    it("retrieves the override with the given ID", function (done) {
      fetchMock.getOnce(
        apiCall.uriFor(
          "/collections/companies/overrides/lex-exact",
          typesense.configuration.nodes[0]
        ),
        {
          body: JSON.stringify(overrideData),
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

      let returnData = override.retrieve();
      expect(returnData).to.eventually.deep.equal(overrideData).notify(done);
    });
  });

  describe(".delete", function () {
    it("deletes the override with the given ID", function (done) {
      let stubbedResult = { id: "lex-exact" };
      fetchMock.deleteOnce(
        apiCall.uriFor(
          "/collections/companies/overrides/lex-exact",
          typesense.configuration.nodes[0]
        ),
        {
          body: JSON.stringify(stubbedResult),
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

      let returnData = override.delete();

      expect(returnData).to.eventually.deep.equal(stubbedResult).notify(done);
    });
  });
});
