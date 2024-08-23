import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import { Client as TypesenseClient } from "../../src/Typesense";
import ApiCall from "../../src/Typesense/ApiCall";
import fetchMock from "fetch-mock";

let expect = chai.expect;
chai.use(chaiAsPromised);

describe("Conversation", function () {
  let typesense;
  let conversation;
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
    conversation = typesense.conversations("123");
    apiCall = new ApiCall(typesense.configuration);

    // Reset fetchMock before each test to ensure a clean state
    fetchMock.reset();
  });

  afterEach(function () {
    // Restore fetchMock after each test
    fetchMock.restore();
  });

  describe(".retrieve", function () {
    it("retrieves the conversation", function (done) {
      fetchMock.getOnce(
        apiCall.uriFor("/conversations/123", typesense.configuration.nodes[0]),
        {
          status: 200,
          body: {},
          headers: { "content-type": "application/json" },
        },
      );

      let returnData = conversation.retrieve();

      expect(returnData).to.eventually.deep.equal({}).notify(done);
    });
  });

  describe(".delete", function () {
    it("deletes the conversation", function (done) {
      fetchMock.deleteOnce(
        apiCall.uriFor("/conversations/123", typesense.configuration.nodes[0]),
        {
          status: 200,
          body: {},
          headers: { "content-type": "application/json" },
        },
      );

      let returnData = conversation.delete();

      expect(returnData).to.eventually.deep.equal({}).notify(done);
    });
  });

  describe(".update", function () {
    it("updates the conversation", function (done) {
      fetchMock.putOnce(
        apiCall.uriFor("/conversations/123", typesense.configuration.nodes[0]),
        {
          status: 200,
          body: {},
          headers: { "content-type": "application/json" },
        },
      );

      let returnData = conversation.update({ ttl: 10 });

      expect(returnData).to.eventually.deep.equal({}).notify(done);
    });
  });
});
