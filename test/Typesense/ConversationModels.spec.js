import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import { Client as TypesenseClient } from "../../src/Typesense";
import ApiCall from "../../src/Typesense/ApiCall";
import fetchMock from "fetch-mock";

let expect = chai.expect;
chai.use(chaiAsPromised);

describe("ConversationModels", function () {
  let typesense;
  let conversationModels;
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
    conversationModels = typesense.conversations().models();
    apiCall = new ApiCall(typesense.configuration);
    fetchMock.reset();
  });

  describe(".create", function () {
    it("creates a conversation model", function (done) {
      fetchMock.post(
        apiCall.uriFor(
          "/conversations/models",
          typesense.configuration.nodes[0]
        ),
        {
          body: JSON.stringify({}),
          status: 201,
          headers: { "Content-Type": "application/json" },
        },
        {
          body: { model_name: "test" },
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
            "X-TYPESENSE-API-KEY": typesense.configuration.apiKey,
          },
        }
      );

      let returnData = conversationModels.create({ model_name: "test" });

      expect(returnData).to.eventually.deep.equal({}).notify(done);
    });
  });

  describe(".retrieve", function () {
    it("retrieves all conversations models", function (done) {
      fetchMock.get(
        apiCall.uriFor(
          "/conversations/models",
          typesense.configuration.nodes[0]
        ),
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

      let returnData = conversationModels.retrieve();

      expect(returnData).to.eventually.deep.equal([]).notify(done);
    });
  });
});
