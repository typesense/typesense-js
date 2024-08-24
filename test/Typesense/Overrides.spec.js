import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import { Client as TypesenseClient } from "../../src/Typesense";
import ApiCall from "../../src/Typesense/ApiCall";
import fetchMock from "fetch-mock";

let expect = chai.expect;
chai.use(chaiAsPromised);

describe("Overrides", function () {
  let typesense;
  let overrides;
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

    override = {
      id: "lex-exact",
      rule: {
        query: "lex luthor",
        match: "exact",
      },
      includes: [{ id: "125", position: 1 }],
      excludes: [{ id: "124" }],
    };

    overrides = typesense.collections("companies").overrides();
    apiCall = new ApiCall(typesense.configuration);
    fetchMock.reset();
  });

  afterEach(function () {
    fetchMock.restore();
  });

  describe(".create", function () {
    it("creates the override in the collection", function (done) {
      fetchMock.putOnce(
        apiCall.uriFor(
          "/collections/companies/overrides/lex-exact",
          typesense.configuration.nodes[0]
        ),
        {
          body: JSON.stringify(override),
          status: 201,
          headers: { "Content-Type": "application/json" },
        },
        {
          body: override,
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
            "X-TYPESENSE-API-KEY": typesense.configuration.apiKey,
          },
        }
      );

      let returnData = overrides.upsert("lex-exact", override);
      expect(returnData).to.eventually.deep.equal(override).notify(done);
    });
  });

  describe(".retrieve", function () {
    it("retrieves all overrides", function (done) {
      fetchMock.getOnce(
        apiCall.uriFor(
          "/collections/companies/overrides",
          typesense.configuration.nodes[0]
        ),
        {
          body: JSON.stringify([override]),
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

      let returnData = overrides.retrieve();

      expect(returnData).to.eventually.deep.equal([override]).notify(done);
    });
  });
});
