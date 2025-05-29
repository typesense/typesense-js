import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import { Client as TypesenseClient } from "../../src/Typesense";
import ApiCall from "../../src/Typesense/ApiCall";
import axios from "axios";
import MockAxiosAdapter from "axios-mock-adapter";

let expect = chai.expect;
chai.use(chaiAsPromised);

describe("Collections", function () {
  let typesense;
  let collections;
  let apiCall;
  let mockAxios;
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
    mockAxios = new MockAxiosAdapter(axios);
  });

  describe(".create", function () {
    it("creates a collection", function (done) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      let { num_documents: numDocuments, ...schemaForCreation } = companySchema;
      mockAxios
        .onPost(
          apiCall.uriFor("/collections", typesense.configuration.nodes[0]),
          schemaForCreation,
          {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
            "X-TYPESENSE-API-KEY": typesense.configuration.apiKey,
          },
        )
        .reply(201, JSON.stringify(companySchema), {
          "content-type": "application/json",
        });

      let returnData = collections.create(schemaForCreation);

      expect(returnData).to.eventually.deep.equal(companySchema).notify(done);
    });

    context("when a query paramater is passed", function () {
      it("passes the query parameter to the API", function (done) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        let { num_documents: numDocuments, ...schemaForCreation } =
          companySchema;
        mockAxios
          .onPost(
            apiCall.uriFor("/collections", typesense.configuration.nodes[0]),
            schemaForCreation,
            {
              Accept: "application/json, text/plain, */*",
              "Content-Type": "application/json",
              "X-TYPESENSE-API-KEY": typesense.configuration.apiKey,
            },
          )
          .reply((config) => {
            expect(config.params.src_name).to.equal("collection_x");
            return [
              201,
              JSON.stringify(companySchema),
              { "content-type": "application/json" },
            ];
          });

        let returnData = collections.create(schemaForCreation, {
          src_name: "collection_x",
        });

        expect(returnData).to.eventually.deep.equal(companySchema).notify(done);
      });
    });
  });

  describe(".retrieve", function () {
    it("retrieves all collections", function (done) {
      mockAxios
        .onGet(
          apiCall.uriFor("/collections", typesense.configuration.nodes[0]),
          undefined,
          {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
            "X-TYPESENSE-API-KEY": typesense.configuration.apiKey,
          },
        )
        .reply((config) => {
          expect(config.params.exclude_fields).to.equal("fields");
          return [
            200,
            JSON.stringify([companySchema]),
            { "content-type": "application/json" },
          ];
        });

      let returnData = collections.retrieve({ exclude_fields: "fields" });

      expect(returnData).to.eventually.deep.equal([companySchema]).notify(done);
    });
  });
});
