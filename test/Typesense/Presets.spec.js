import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import { Client as TypesenseClient } from "../../src/Typesense";
import ApiCall from "../../src/Typesense/ApiCall";
import fetchMock from "fetch-mock";

let expect = chai.expect;
chai.use(chaiAsPromised);

describe("Presets", function () {
  let typesense;
  let presets;
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
    presets = typesense.presets();
    apiCall = new ApiCall(typesense.configuration);
    fetchMock.reset();
  });

  afterEach(function () {
    fetchMock.restore();
  });

  describe(".upsert", function () {
    it("upserts a preset", function (done) {
      fetchMock.putOnce(
        apiCall.uriFor("/presets/preset-1", typesense.configuration.nodes[0]),
        {
          body: JSON.stringify({}),
          status: 201,
          headers: { "Content-Type": "application/json" },
        },
        {
          body: {
            value: {
              query_by: "field1",
            },
          },
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
            "X-TYPESENSE-API-KEY": typesense.configuration.apiKey,
          },
        }
      );

      let returnData = presets.upsert("preset-1", {
        value: {
          query_by: "field1",
        },
      });

      expect(returnData).to.eventually.deep.equal({}).notify(done);
    });
  });

  describe(".retrieve", function () {
    it("retrieves all presets", function (done) {
      fetchMock.getOnce(
        apiCall.uriFor("/presets", typesense.configuration.nodes[0]),
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

      let returnData = presets.retrieve();

      expect(returnData).to.eventually.deep.equal([]).notify(done);
    });
  });
});
