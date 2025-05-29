/*
 These examples walk you through overrides, available in the premium version
 See clientInitalization.js for quick instructions on starting the Typesense server.
*/
require("@babel/register");

// eslint-disable-next-line @typescript-eslint/no-var-requires
const Typesense = require("../../../lib/Typesense");

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
  numRetries: 3, // A total of 4 tries (1 original try + 3 retries)
  connectionTimeoutSeconds: 10,
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
    company_name: "Stark Industries",
    num_employees: 5215,
    country: "USA",
  },
  {
    id: "125",
    company_name: "Acme Corp",
    num_employees: 1002,
    country: "France",
  },
  {
    id: "127",
    company_name: "Stark Corp",
    num_employees: 1031,
    country: "USA",
  },
  {
    id: "126",
    company_name: "Doofenshmirtz Inc",
    num_employees: 2,
    country: "Tri-State Area",
  },
];

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
    console.log(result);

    // create a couple of documents
    await Promise.all(
      documents.map((document) =>
        typesense.collections("companies").documents().create(document),
      ),
    );

    // Create a multi-way synonym
    await typesense
      .collections("companies")
      .synonyms()
      .upsert("synonyms-doofenshmirtz", {
        synonyms: ["Doofenshmirtz", "Heinz", "Evil"],
      });

    // Searching for Heinz should now return Doofenshmirtz Inc
    result = await typesense.collections("companies").documents().search({
      q: "Heinz",
      query_by: "company_name",
    });
    console.dir(result, { depth: null });

    // List all synonyms
    result = await typesense.collections("companies").synonyms().retrieve();
    console.dir(result, { depth: null });

    // Retrieve specific synonym
    result = await typesense
      .collections("companies")
      .synonyms("synonyms-doofenshmirtz")
      .retrieve();
    console.dir(result, { depth: null });

    // Update synonys to a one-way synonym
    await typesense
      .collections("companies")
      .synonyms()
      .upsert("synonyms-doofenshmirtz", {
        root: "Evil",
        synonyms: ["Doofenshmirtz", "Heinz"],
      });

    // Searching for Evil should now return Doofenshmirtz Inc
    result = await typesense.collections("companies").documents().search({
      q: "Evil",
      query_by: "company_name",
    });
    console.dir(result, { depth: null });

    // But searching for Heinz, should not return any results, since this is a one-way synonym
    result = await typesense.collections("companies").documents().search({
      q: "Heinz",
      query_by: "company_name",
    });
    console.dir(result, { depth: null });
  } catch (error) {
    console.log(error);
  } finally {
    // Cleanup
    typesense.collections("companies").delete();
  }
}

runExample();
