import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import { Client as TypesenseClient } from "../../src/index";
import ApiCall from "../../src/Typesense/ApiCall";
import axios from "axios";
import MockAxiosAdapter from "axios-mock-adapter";

let expect = chai.expect;
chai.use(chaiAsPromised);

describe("ConversationModels", function () {
  let typesense;
  let conversationModels;
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
    conversationModels = typesense.conversations().models();
    apiCall = new ApiCall(typesense.configuration);
    mockAxios = new MockAxiosAdapter(axios);
  });

  describe(".create", function () {
    it("creates a conversation model", function (done) {
      mockAxios
        .onPost(
          apiCall.uriFor(
            "/conversations/models",
            typesense.configuration.nodes[0],
          ),
          {
            model_name: "test",
          },
          {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
            "X-TYPESENSE-API-KEY": typesense.configuration.apiKey,
          },
        )
        .reply(201, "{}", { "content-type": "application/json" });

      let returnData = conversationModels.create({ model_name: "test" });

      expect(returnData).to.eventually.deep.equal({}).notify(done);
    });
  });

  describe(".retrieve", function () {
    it("retrieves all conversations models", function (done) {
      mockAxios
        .onGet(
          apiCall.uriFor(
            "/conversations/models",
            typesense.configuration.nodes[0],
          ),
          undefined,
          {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
            "X-TYPESENSE-API-KEY": typesense.configuration.apiKey,
          },
        )
        .reply(200, "[]", { "content-type": "application/json" });

      let returnData = conversationModels.retrieve();

      expect(returnData).to.eventually.deep.equal([]).notify(done);
    });
  });
});
