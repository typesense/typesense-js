import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import { Client as TypesenseClient } from "../../src/Typesense";
import ApiCall from "../../src/Typesense/ApiCall";
import axios from "axios";
import MockAxiosAdapter from "axios-mock-adapter";

let expect = chai.expect;
chai.use(chaiAsPromised);

describe("StemmingDictionaries", function () {
  let typesense;
  let stemmingDictionaries;
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
    stemmingDictionaries = typesense.stemming.dictionaries();
    apiCall = new ApiCall(typesense.configuration);
    mockAxios = new MockAxiosAdapter(axios);
  });

  describe(".retrieve", function () {
    it("retrieves all stemming dictionaries", function (done) {
      mockAxios
        .onGet(
          apiCall.uriFor(
            "/stemming/dictionaries",
            typesense.configuration.nodes[0],
          ),
          undefined,
          {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
            "X-TYPESENSE-API-KEY": typesense.configuration.apiKey,
          },
        )
        .reply(200, { dictionaries: ["set1", "set2"] });

      let returnData = stemmingDictionaries.retrieve();

      expect(returnData)
        .to.eventually.deep.equal({
          dictionaries: ["set1", "set2"],
        })
        .notify(done);
    });
  });
});
