import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import { Client as TypesenseClient } from "../../src/Typesense";
import ApiCall from "../../src/Typesense/ApiCall";
import axios from "axios";
import MockAxiosAdapter from "axios-mock-adapter";

let expect = chai.expect;
chai.use(chaiAsPromised);

describe("NLSearchModel", function () {
  let typesense;
  let nlSearchModel;
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

    nlSearchModel = typesense.nlSearchModels("gemini-model");
    apiCall = new ApiCall(typesense.configuration);
    mockAxios = new MockAxiosAdapter(axios);
  });

  describe(".retrieve", function () {
    it("retrieves the nl search model", function (done) {
      mockAxios
        .onGet(
          apiCall.uriFor(
            "/nl_search_models/gemini-model",
            typesense.configuration.nodes[0],
          ),
          null,
          {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
            "X-TYPESENSE-API-KEY": typesense.configuration.apiKey,
          },
        )
        .reply(200, {
          id: "gemini-model",
          model_name: "google/gemini-2.5-flash",
          max_bytes: 16000,
          temperature: 0.0,
        });

      let returnData = nlSearchModel.retrieve();

      expect(returnData).to.eventually.deep.equal({
        id: "gemini-model",
        model_name: "google/gemini-2.5-flash",
        max_bytes: 16000,
        temperature: 0.0,
      }).notify(done);
    });
  });

  describe(".update", function () {
    it("updates the nl search model", function (done) {
      const updateSchema = {
        temperature: 0.5,
        system_prompt: "Updated system prompt",
      };

      mockAxios
        .onPut(
          apiCall.uriFor(
            "/nl_search_models/gemini-model",
            typesense.configuration.nodes[0],
          ),
          updateSchema,
          {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
            "X-TYPESENSE-API-KEY": typesense.configuration.apiKey,
          },
        )
        .reply(200, {
          id: "gemini-model",
          model_name: "google/gemini-2.5-flash",
          max_bytes: 16000,
          temperature: 0.5,
          system_prompt: "Updated system prompt",
        });

      let returnData = nlSearchModel.update(updateSchema);

      expect(returnData).to.eventually.deep.equal({
        id: "gemini-model",
        model_name: "google/gemini-2.5-flash",
        max_bytes: 16000,
        temperature: 0.5,
        system_prompt: "Updated system prompt",
      }).notify(done);
    });
  });

  describe(".delete", function () {
    it("deletes the nl search model", function (done) {
      mockAxios
        .onDelete(
          apiCall.uriFor(
            "/nl_search_models/gemini-model",
            typesense.configuration.nodes[0],
          ),
          null,
          {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
            "X-TYPESENSE-API-KEY": typesense.configuration.apiKey,
          },
        )
        .reply(200, {
          id: "gemini-model",
        });

      let returnData = nlSearchModel.delete();

      expect(returnData).to.eventually.deep.equal({
        id: "gemini-model",
      }).notify(done);
    });
  });
});