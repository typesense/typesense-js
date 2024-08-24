import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import { Client as TypesenseClient } from "../../src/Typesense";
import ApiCall from "../../src/Typesense/ApiCall";
import fetchMock from "fetch-mock";

let expect = chai.expect;
chai.use(chaiAsPromised);

describe("Conversations", function () {
  let typesense;
  let conversations;
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
    conversations = typesense.conversations();
    apiCall = new ApiCall(typesense.configuration);
    fetchMock.reset();
  });

  describe(".retrieve", function () {
    it("retrieves all conversations", function (done) {
      fetchMock.get(
        apiCall.uriFor("/conversations", typesense.configuration.nodes[0]),
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

      let returnData = conversations.retrieve();

      expect(returnData).to.eventually.deep.equal([]).notify(done);
    });
  });
});
