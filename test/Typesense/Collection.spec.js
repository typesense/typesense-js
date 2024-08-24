import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import { Client as TypesenseClient } from "../../src/Typesense";
import ApiCall from "../../src/Typesense/ApiCall";
import fetchMock from "fetch-mock";

let expect = chai.expect;
chai.use(chaiAsPromised);

describe("Collection", function () {
  let typesense;
  let collection;
  let apiCall;
  let companySchema = {
    name: "companies",
    num_documents: 0,
    fields: [
      {
        name: "company_name",
        type: "string",
        facet: false,
      },
      {
        name: "num_employees",
        type: "int32",
        facet: false,
      },
      {
        name: "country",
        type: "string",
        facet: true,
      },
      {
        name: "address",
        type: "string",
        locale: "el",
        infix: true,
      },
    ],
    default_sorting_field: "num_employees",
  };

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
    collection = typesense.collections("companies");
    apiCall = new ApiCall(typesense.configuration);

    // Reset fetchMock before each test to ensure a clean state
    fetchMock.reset();
  });

  describe(".retrieve", function () {
    it("retrieves a collection", function (done) {
      fetchMock.get(
        apiCall.uriFor(
          "/collections/companies",
          typesense.configuration.nodes[0],
        ),
        {
          status: 200,
          body: JSON.stringify(companySchema),
          headers: { "content-type": "application/json" },
        },
      );

      let returnData = collection.retrieve();

      expect(returnData).to.eventually.deep.equal(companySchema).notify(done);
    });
  });

  describe(".update", function () {
    it("updates a collection", function (done) {
      const updateSchema = {
        fields: [{ name: "fieldX", drop: true }],
      };

      fetchMock.patch(
        apiCall.uriFor(
          "/collections/companies",
          typesense.configuration.nodes[0],
        ),
        {
          status: 200,
          body: JSON.stringify(updateSchema),
          headers: { "content-type": "application/json" },
        },
      );

      let returnData = collection.update(updateSchema);

      expect(returnData).to.eventually.deep.equal(updateSchema).notify(done);
    });
  });

  describe(".delete", function () {
    it("deletes a collection", function (done) {
      fetchMock.delete(
        apiCall.uriFor(
          "/collections/companies",
          typesense.configuration.nodes[0],
        ),
        {
          status: 200,
          body: JSON.stringify(companySchema),
          headers: { "content-type": "application/json" },
        },
      );

      let returnData = collection.delete();

      expect(returnData).to.eventually.deep.equal(companySchema).notify(done);
    });
  });
});
