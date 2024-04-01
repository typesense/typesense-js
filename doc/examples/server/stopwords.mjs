/*
 These examples walk you through how to use stopwords with Typesense
 See clientInitalization.js for quick instructions on starting the Typesense server.
*/
import "@babel/register";
/* eslint-disable @typescript-eslint/no-var-requires */
import Typesense from "../../../lib/Typesense.js";

// import axios from "axios";
// import curlirize from "axios-curlirize";

// Create a client
const typesense = new Typesense.Client({
  nodes: [
    {
      host: "127.0.0.1",
      port: "8108",
      protocol: "http",
    },
  ],
  apiKey: "xyz",
  logLevel: "debug",
});

let schema = {
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
  ],
  default_sorting_field: "num_employees",
};

let documents = [
  {
    id: "124",
    company_name: "A Stark Industry",
    num_employees: 5215,
    country: "USA",
  },
  {
    id: "125",
    company_name: "The Acme Corp",
    num_employees: 1002,
    country: "France",
  },
];

// curlirize(axios);

async function runExample() {
  try {
    // Delete if the collection already exists from a previous example run
    await typesense.collections("companies").delete();
  } catch (error) {
    // do nothing
  }

  try {
    let result;
    // create a collection
    result = await typesense.collections().create(schema);
    console.dir(result, { depth: null });

    // create a couple of documents
    result = await typesense
      .collections("companies")
      .documents()
      .import(documents);
    console.dir(result, { depth: null });

    // create stopword set
    result = await typesense.stopwords().upsert("common-words", {
      stopwords: ["a", "an", "the", "are", "am"],
    });
    console.dir(result, { depth: null });

    // retrieve stopword set
    result = await typesense.stopwords("common-words").retrieve();
    console.dir(result), { depth: null };

    // retrieve all stopword sets
    result = await typesense.stopwords().retrieve();
    console.dir(result, { depth: null });

    // do a search with a stopword set
    let searchResults = await typesense
      .collections("companies")
      .documents()
      .search({
        q: "the acme",
        query_by: "company_name",
        stopwords: "common-words"
      });
    console.dir(searchResults.hits.map(h => h.highlight), { depth: null });
  } catch (error) {
    console.dir(error, { depth: null });
  } finally {
    // Cleanup
    typesense.collections("companies").delete();
  }
}

runExample();
