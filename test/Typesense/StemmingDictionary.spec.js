import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import { Client as TypesenseClient } from "../../src/index";
import ApiCall from "../../src/Typesense/ApiCall";
import axios from "axios";
import MockAxiosAdapter from "axios-mock-adapter";

let expect = chai.expect;
chai.use(chaiAsPromised);

describe("StemmingDictionary", function () {
  let typesense;
  let stemmingDictionary;
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
    stemmingDictionary = typesense.stemming.dictionaries("set1");
    apiCall = new ApiCall(typesense.configuration);
    mockAxios = new MockAxiosAdapter(axios);
  });

  describe(".retrieve", function () {
    it("retrieves the dictionary", function (done) {
      mockAxios
        .onGet(
          apiCall.uriFor(
            "/stemming/dictionaries/set1",
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
          id: "set1",
          words: [{ word: "people", root: "person" }],
        });

      let returnData = stemmingDictionary.retrieve();

      expect(returnData)
        .to.eventually.deep.equal({
          id: "set1",
          words: [{ word: "people", root: "person" }],
        })
        .notify(done);
    });
  });
});
