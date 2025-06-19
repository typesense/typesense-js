import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import { Client as TypesenseClient } from "../../src/Typesense";
import ApiCall from "../../src/Typesense/ApiCall";
import axios from "axios";
import MockAxiosAdapter from "axios-mock-adapter";

let expect = chai.expect;
chai.use(chaiAsPromised);

describe("NLSearchModels", function () {
  let typesense;
  let nlSearchModels;
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

    nlSearchModels = typesense.nlSearchModels();
    apiCall = new ApiCall(typesense.configuration);
    mockAxios = new MockAxiosAdapter(axios);
  });

  describe(".create", function () {
    it("creates a nl search model", function (done) {
      const modelSchema = {
        id: "gemini-model",
        model_name: "google/gemini-2.5-flash",
        api_key: "test-api-key",
        max_bytes: 16000,
        temperature: 0.0,
      };

      mockAxios
        .onPost(
          apiCall.uriFor(
            "/nl_search_models",
            typesense.configuration.nodes[0],
          ),
          modelSchema,
          {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
            "X-TYPESENSE-API-KEY": typesense.configuration.apiKey,
          },
        )
        .reply(201, {
          id: "gemini-model",
          model_name: "google/gemini-2.5-flash",
          max_bytes: 16000,
          temperature: 0.0,
        });

      let returnData = nlSearchModels.create(modelSchema);

      expect(returnData).to.eventually.deep.equal({
        id: "gemini-model",
        model_name: "google/gemini-2.5-flash",
        max_bytes: 16000,
        temperature: 0.0,
      }).notify(done);
    });

    it("creates a nl search model with Cloudflare-specific parameters", function (done) {
      const modelSchema = {
        model_name: "cloudflare/@cf/meta/llama-2-7b-chat-int8",
        api_key: "test-cloudflare-key",
        account_id: "test-account-id",
        max_bytes: 16000,
        system_prompt: "Custom system prompt",
      };

      mockAxios
        .onPost(
          apiCall.uriFor(
            "/nl_search_models",
            typesense.configuration.nodes[0],
          ),
          modelSchema,
          {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
            "X-TYPESENSE-API-KEY": typesense.configuration.apiKey,
          },
        )
        .reply(201, {
          id: "auto-generated-id",
          model_name: "cloudflare/@cf/meta/llama-2-7b-chat-int8",
          account_id: "test-account-id",
          max_bytes: 16000,
          system_prompt: "Custom system prompt",
        });

      let returnData = nlSearchModels.create(modelSchema);

      expect(returnData).to.eventually.deep.include({
        id: "auto-generated-id",
        model_name: "cloudflare/@cf/meta/llama-2-7b-chat-int8",
        account_id: "test-account-id",
      }).notify(done);
    });

    it("creates a nl search model with GCP Vertex AI parameters", function (done) {
      const modelSchema = {
        id: "gcp-gemini",
        model_name: "gcp/gemini-2.5-flash",
        project_id: "my-gcp-project",
        access_token: "initial-token",
        refresh_token: "refresh-token",
        client_id: "client-id",
        client_secret: "client-secret",
        max_bytes: 16000,
        temperature: 0.0,
        region: "us-central1",
      };

      mockAxios
        .onPost(
          apiCall.uriFor(
            "/nl_search_models",
            typesense.configuration.nodes[0],
          ),
          modelSchema,
          {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
            "X-TYPESENSE-API-KEY": typesense.configuration.apiKey,
          },
        )
        .reply(201, {
          id: "gcp-gemini",
          model_name: "gcp/gemini-2.5-flash",
          project_id: "my-gcp-project",
          max_bytes: 16000,
          temperature: 0.0,
          region: "us-central1",
        });

      let returnData = nlSearchModels.create(modelSchema);

      expect(returnData).to.eventually.deep.include({
        id: "gcp-gemini",
        model_name: "gcp/gemini-2.5-flash",
        project_id: "my-gcp-project",
      }).notify(done);
    });
  });

  describe(".retrieve", function () {
    it("retrieves all nl search models", function (done) {
      mockAxios
        .onGet(
          apiCall.uriFor(
            "/nl_search_models",
            typesense.configuration.nodes[0],
          ),
          null,
          {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
            "X-TYPESENSE-API-KEY": typesense.configuration.apiKey,
          },
        )
        .reply(200, [
          {
            id: "gemini-model",
            model_name: "google/gemini-2.5-flash",
            max_bytes: 16000,
            temperature: 0.0,
          },
          {
            id: "openai-model",
            model_name: "openai/gpt-4.1",
            max_bytes: 16000,
            temperature: 0.0,
            system_prompt: "Custom prompt",
          },
        ]);

      let returnData = nlSearchModels.retrieve();

      expect(returnData).to.eventually.be.an("array").with.lengthOf(2).notify(done);
    });
  });

});