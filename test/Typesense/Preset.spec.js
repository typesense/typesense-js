import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import { Client as TypesenseClient } from "../../src/Typesense";
import ApiCall from "../../src/Typesense/ApiCall";
import fetchMock from "fetch-mock";

let expect = chai.expect;
chai.use(chaiAsPromised);

describe("Preset", function () {
  let typesense;
  let preset;
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
    preset = typesense.presets("123");
    apiCall = new ApiCall(typesense.configuration);
    fetchMock.reset();
  });

  afterEach(function () {
    fetchMock.restore();
  });

  describe(".retrieve", function () {
    it("retrieves the preset", function (done) {
      fetchMock.getOnce(
        apiCall.uriFor("/presets/123", typesense.configuration.nodes[0]),
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

      let returnData = preset.retrieve();

      expect(returnData).to.eventually.deep.equal({}).notify(done);
    });
  });

  describe(".delete", function () {
    it("deletes a preset", function (done) {
      fetchMock.deleteOnce(
        apiCall.uriFor("/presets/123", typesense.configuration.nodes[0]),
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

      let returnData = preset.delete();

      expect(returnData).to.eventually.deep.equal({}).notify(done);
    });
  });
});
