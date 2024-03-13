import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import { Client as TypesenseClient } from "../../src/Typesense";
import ApiCall from "../../src/Typesense/ApiCall";
import axios from "axios";
import MockAxiosAdapter from "axios-mock-adapter";

let expect = chai.expect;
chai.use(chaiAsPromised);

describe("ConversationModel", function () {
  let typesense;
  let conversationModel;
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
    conversationModel = typesense.conversations().models("123");
    apiCall = new ApiCall(typesense.configuration);
    mockAxios = new MockAxiosAdapter(axios);
  });

  describe(".retrieve", function () {
    it("retrieves the model", function (done) {
      mockAxios
        .onGet(
          apiCall.uriFor(
            "/conversations/models/123",
            typesense.configuration.nodes[0],
          ),
          null,
          {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
            "X-TYPESENSE-API-KEY": typesense.configuration.apiKey,
          },
        )
        .reply(200, "{}", { "content-type": "application/json" });

      // console.log(mockAxios.handlers)

      let returnData = conversationModel.retrieve();

      expect(returnData).to.eventually.deep.equal({}).notify(done);
    });
  });

  describe(".delete", function () {
    it("deletes the model", function (done) {
      mockAxios
        .onDelete(
          apiCall.uriFor(
            "/conversations/models/123",
            typesense.configuration.nodes[0],
          ),
          null,
          {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
            "X-TYPESENSE-API-KEY": typesense.configuration.apiKey,
          },
        )
        .reply(200, {});

      let returnData = conversationModel.delete();

      expect(returnData).to.eventually.deep.equal({}).notify(done);
    });
  });
});
