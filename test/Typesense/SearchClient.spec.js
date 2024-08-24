import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import { SearchClient as TypesenseSearchClient } from "../../src/Typesense";
import fetchMock from "fetch-mock";
import ApiCall from "../../src/Typesense/ApiCall";

let expect = chai.expect;
chai.use(chaiAsPromised);

describe("SearchClient", function () {
  let typesense;
  let documents;
  let apiCall;

  beforeEach(function () {
    typesense = new TypesenseSearchClient({
      nodes: [
        {
          host: "node0",
          port: "8108",
          protocol: "http",
        },
      ],
      apiKey: "abcd",
      randomizeNodes: false,
      cacheSearchResultsForSeconds: 2 * 60,
    });

    documents = typesense.collections("companies").documents();
    apiCall = new ApiCall(typesense.configuration);
    fetchMock.reset();
  });

  afterEach(function () {
    fetchMock.restore();
  });

  it("should set the right default configuration values", function (done) {
    expect(typesense.configuration.nodes).to.eql([
      {
        host: "node0",
        port: "8108",
        protocol: "http",
        path: "",
      },
    ]);
    expect(typesense.configuration.connectionTimeoutSeconds).to.eql(5);
    expect(typesense.configuration.apiKey).to.eql("abcd");
    done();
  });

  it("should only expose the search endpoints", function (done) {
    expect(typesense.collections).to.throw(
      "Typesense.SearchClient only supports search operations"
    );
    expect(typesense.collections("xyz").documents().search).to.be.a("function");
    expect(typesense.multiSearch.perform).to.be.a("function");
    expect(typesense.keys).to.be.an("undefined");
    done();
  });

  it("should send the api key via headers, when key is over 2000 characters, even if sendApiKeyAsQueryParam is true", function (done) {
    const configuration = {
      nodes: [
        {
          host: "node0",
          port: "8108",
          protocol: "http",
        },
      ],
      apiKey: "a".repeat(2001),
      sendApiKeyAsQueryParam: true,
    };
    typesense = new TypesenseSearchClient(configuration);
    let apiCall = new ApiCall(typesense.configuration);
    let searches = {
      searches: [{ q: "term1" }, { q: "term2" }],
    };
    let commonParams = {
      collection: "docs",
      query_by: "field",
    };

    fetchMock.postOnce(
      (url, options) => {
        return (
          url.startsWith(apiCall.uriFor("/multi_search", typesense.configuration.nodes[0])) &&
          !url.includes("x-typesense-api-key") &&
          options.headers["X-TYPESENSE-API-KEY"] === configuration.apiKey
        );
      },
      {
        body: JSON.stringify({}),
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );

    let returnData = typesense.multiSearch.perform(searches, commonParams);

    expect(returnData).to.eventually.deep.equal({}).notify(done);
  });

  it("should programatically clear document cache", async function () {
    let searchParameters = {
      q: "Stark",
      query_by: "company_name",
    };
    let stubbedSearchResults = {
      facet_counts: [],
      found: 1,
      search_time_ms: 1,
      page: 1,
      hits: [
        {
          _highlight: {
            company_name: "<mark>Stark</mark> Industries",
          },
          document: {
            id: "124",
            company_name: "Stark Industries",
            num_employees: 5215,
            country: "USA",
          },
        },
      ],
    };

    fetchMock.get(
      (url) => {
        return (
          url.startsWith(apiCall.uriFor("/collections/companies/documents/search", typesense.configuration.nodes[0])) &&
          url.includes("q=Stark") &&
          url.includes("query_by=company_name")
        );
      },
      {
        body: JSON.stringify(stubbedSearchResults),
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
      { repeat: 2 }
    );

    await documents.search(searchParameters);

    // programmatically clear cache
    typesense.clearCache();

    await documents.search(searchParameters);

    // if 2 requests are made, then we know that cache was cleared successfully
    expect(fetchMock.calls().length).to.equal(2);
  });

  it("should programmatically clear multi_search cache", async function () {
    let searchRequests = {
      searches: [{ q: "term1" }, { q: "term2" }],
    };
    let commonParams = {
      collection: "docs",
      query_by: "field",
    };
    let stubbedSearchResults = { results: [{ hits: [] }, { hits: [] }] };

    // Construct the exact URL that would be used for the API call
    const node = typesense.configuration.nodes[0];
    const baseUrl = apiCall.uriFor("/multi_search", node);
    const url = `${baseUrl}?collection=${commonParams.collection}&query_by=${commonParams.query_by}`;

    fetchMock.post(
      (actualUrl, options) => {
        if (actualUrl !== url) return false;

        const body = JSON.parse(options.body);
        return (
          body.searches.some(search => search.q === "term1") &&
          body.searches.some(search => search.q === "term2")
        );
      },
      {
        body: JSON.stringify(stubbedSearchResults),
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
      { repeat: 2 }  // Set to repeat twice
    );

    await typesense.multiSearch.perform(searchRequests, commonParams);

    // programmatically clear cache
    typesense.clearCache();

    await typesense.multiSearch.perform(searchRequests, commonParams);

    // if 2 requests are made, then we know that cache was cleared successfully
    expect(fetchMock.calls().length).to.equal(2);
});

});
