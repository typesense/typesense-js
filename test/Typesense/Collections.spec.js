import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import { Client as TypesenseClient } from "../../src/Typesense";
import ApiCall from "../../src/Typesense/ApiCall";
import fetchMock from "fetch-mock";

let expect = chai.expect;
chai.use(chaiAsPromised);

describe("Collections", function () {
  let typesense;
  let collections;
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
    collections = typesense.collections();
    apiCall = new ApiCall(typesense.configuration);
    fetchMock.reset();
  });

  describe(".create", function () {
    it("creates a collection", function (done) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      let { num_documents: numDocuments, ...schemaForCreation } = companySchema;
      fetchMock.post(
        apiCall.uriFor("/collections", typesense.configuration.nodes[0]),
        {
          body: JSON.stringify(companySchema),
          status: 201,
          headers: { "Content-Type": "application/json" },
        },
        {
          body: schemaForCreation,
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
            "X-TYPESENSE-API-KEY": typesense.configuration.apiKey,
          },
        },
      );

      let returnData = collections.create(schemaForCreation);

      expect(returnData).to.eventually.deep.equal(companySchema).notify(done);
    });

    context("when a query paramater is passed", function () {
      it("passes the query parameter to the API", function (done) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        let { num_documents: numDocuments, ...schemaForCreation } =
          companySchema;
        fetchMock.post(
          apiCall.uriFor(
            "/collections?src_name=collection_x",
            typesense.configuration.nodes[0],
          ),

          (url) => {
            expect(url).to.include("src_name=collection_x");
            return {
              body: JSON.stringify(companySchema),
              status: 201,
              headers: { "Content-Type": "application/json" },
            };
          },
          {
            body: schemaForCreation,
            headers: {
              Accept: "application/json, text/plain, */*",
              "Content-Type": "application/json",
              "X-TYPESENSE-API-KEY": typesense.configuration.apiKey,
            },
          },
        );

        let returnData = collections.create(schemaForCreation, {
          src_name: "collection_x",
        });

        expect(returnData).to.eventually.deep.equal(companySchema).notify(done);
      });
    });
  });

  describe(".retrieve", function () {
    it("retrieves all collections", function (done) {
      fetchMock.get(
        "http://node0:8108/collections?exclude_fields=fields",
        {
          body: JSON.stringify([companySchema]),
          status: 200,
          headers: { "Content-Type": "application/json" },
        },
        {
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
            "X-TYPESENSE-API-KEY": typesense.configuration.apiKey,
          },
        },
      );

      let returnData = collections.retrieve({ exclude_fields: "fields" });

      expect(returnData).to.eventually.deep.equal([companySchema]).notify(done);
    });
  });
});
