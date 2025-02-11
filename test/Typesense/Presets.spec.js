import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import { Client as TypesenseClient } from "../../src/index";
import ApiCall from "../../src/Typesense/ApiCall";
import axios from "axios";
import MockAxiosAdapter from "axios-mock-adapter";

let expect = chai.expect;
chai.use(chaiAsPromised);

describe("Presets", function () {
  let typesense;
  let presets;
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
    presets = typesense.presets();
    apiCall = new ApiCall(typesense.configuration);
    mockAxios = new MockAxiosAdapter(axios);
  });

  describe(".upsert", function () {
    it("normalizes arrayable parameters in preset values", function (done) {
      const presetData = {
        value: {
          query_by: ["field1", "field2"],
          facet_by: ["category", "brand"],
          group_by: ["department"],
        },
      };

      let capturedBody;
      mockAxios
        .onPut(
          apiCall.uriFor(
            "/presets/preset-normalize",
            typesense.configuration.nodes[0],
          ),
        )
        .reply((config) => {
          capturedBody = JSON.parse(config.data);
          expect(capturedBody).to.deep.equal({
            value: {
              query_by: "field1,field2",
              facet_by: "category,brand",
              group_by: "department",
            },
          });
          return [201, "{}", { "content-type": "application/json" }];
        });

      let returnData = presets.upsert("preset-normalize", presetData);
      expect(returnData).to.eventually.deep.equal({}).notify(done);
    });

    it("normalizes arrayable parameters in preset searches", function (done) {
      const presetData = {
        value: {
          searches: [
            {
              query_by: ["title", "description"],
              facet_by: ["tags", "type"],
            },
            {
              query_by: "name",
              facet_by: ["color"],
            },
          ],
        },
      };

      let capturedBody;
      mockAxios
        .onPut(
          apiCall.uriFor(
            "/presets/preset-normalize-searches",
            typesense.configuration.nodes[0],
          ),
        )
        .reply((config) => {
          capturedBody = JSON.parse(config.data);
          expect(capturedBody).to.deep.equal({
            value: {
              searches: [
                {
                  query_by: "title,description",
                  facet_by: "tags,type",
                },
                {
                  query_by: "name",
                  facet_by: "color",
                },
              ],
            },
          });
          return [201, "{}", { "content-type": "application/json" }];
        });

      let returnData = presets.upsert("preset-normalize-searches", presetData);
      expect(returnData).to.eventually.deep.equal({}).notify(done);
    });
  });

  describe(".retrieve", function () {
    it("retrieves all presets", function (done) {
      mockAxios
        .onGet(
          apiCall.uriFor("/presets", typesense.configuration.nodes[0]),
          undefined,
          {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
            "X-TYPESENSE-API-KEY": typesense.configuration.apiKey,
          },
        )
        .reply(200, "[]", { "content-type": "application/json" });

      let returnData = presets.retrieve();

      expect(returnData).to.eventually.deep.equal([]).notify(done);
    });
  });
});
