import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import { Client as TypesenseClient } from "../../src/Typesense";
import ApiCall from "../../src/Typesense/ApiCall";
import fetchMock from "fetch-mock";

let expect = chai.expect;
chai.use(chaiAsPromised);

describe("Document", function () {
  let typesense;
  let document;
  let documentResult = {
    id: "124",
    company_name: "Stark Industries",
    num_employees: 5215,
    country: "USA",
  };
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
    document = typesense.collections("companies").documents("124");
    apiCall = new ApiCall(typesense.configuration);
    fetchMock.reset();
  });

  describe(".retrieve", function () {
    it("retrieves a document", function (done) {
      fetchMock.get(
        apiCall.uriFor(
          "/collections/companies/documents/124",
          typesense.configuration.nodes[0]
        ),
        {
          body: JSON.stringify(documentResult),
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

      let returnData = document.retrieve();

      expect(returnData).to.eventually.deep.equal(documentResult).notify(done);
    });
  });

  describe(".update", function () {
    it("updates a document", function (done) {
      const partialDocument = {
        id: 124,
        company_name: "Stark Industries Inc",
      };
      
      // Correcting the fetchMock setup
      fetchMock.patch(
        apiCall.uriFor(
          "/collections/companies/documents/124",
          typesense.configuration.nodes[0]
        ) + "?dirty_values=coerce_or_reject", // Append query params directly to the URL string
        {
          body: JSON.stringify(partialDocument),
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      );
  
      let returnData = document.update(partialDocument, {
        dirty_values: "coerce_or_reject",
      });
  
      expect(returnData).to.eventually.deep.equal(partialDocument).notify(done);
    });
  });
  
  describe(".delete", function () {
    it("deletes a document", function (done) {
      fetchMock.delete(
        apiCall.uriFor(
          "/collections/companies/documents/124",
          typesense.configuration.nodes[0]
        ),
        {
          body: JSON.stringify(documentResult),
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

      let returnData = document.delete();

      expect(returnData).to.eventually.deep.equal(documentResult).notify(done);
    });
  });
  it("passes query params to delete", function (done) {
    const queryParams = { ignore_not_found: true };
    fetchMock.delete(
      apiCall.uriFor(
        "/collections/companies/documents/124",
        typesense.configuration.nodes[0]
      ),
      {
        body: JSON.stringify(documentResult),
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
      {
        query: queryParams,
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
          "X-TYPESENSE-API-KEY": typesense.configuration.apiKey,
        },
      }
    );

    let returnData = document.delete(queryParams);

    expect(returnData).to.eventually.deep.equal(documentResult).notify(done);
  });
});
