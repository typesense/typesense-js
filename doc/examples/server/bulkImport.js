/*
 These examples walk you through the bulk importing documents.

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
    }, // ,
    // {
    //   'host': 'localhost',
    //   'port': '7108',
    //   'protocol': 'http'
    // },
    // {
    //   'host': 'localhost',
    //   'port': '9108',
    //   'protocol': 'http'
    // }
  ],
  apiKey: "xyz",
  numRetries: 3, // A total of 4 tries (1 original try + 3 retries)
  connectionTimeoutSeconds: 120, // Set a longer timeout for large imports
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
    // create a collection
    await typesense.collections().create(schema);

    // Load documents from a JSON file, or API call, etc. into a variable
    // Here we already have documents in the `documents` variable.

    // Bulk import documents
    let results = await typesense
      .collections("companies")
      .documents()
      .import(documents);

    // Or if you have documents in JSONL format, and want to save the overhead of parsing JSON,
    // you can also pass a JSONL string to the import method:
    // await typesense.collections('companies').documents().import(documentsInJSONLFormat)

    console.log(results);
    // Process results as needed for errors / success
    let failedItems = results.filter((item) => item.success === false);
    console.log(failedItems);

    // Bulk upsert documents
    let modifiedDocuments = [
      {
        id: "124",
        company_name: "Stark Industries",
        num_employees: 5250,
        country: "USA",
      },
      {
        id: "125",
        company_name: "Acme Corp",
        num_employees: 1100,
        country: "France",
      },
    ];
    results = await typesense
      .collections("companies")
      .documents()
      .import(modifiedDocuments, { action: "upsert" });
    console.log(results);
    // Process results as needed for errors / success
    failedItems = results.filter((item) => item.success === false);
    console.log(failedItems);

    // Bulk update documents
    modifiedDocuments = [
      {
        id: "124",
        num_employees: 5251,
      },
      {
        id: "125",
        num_employees: 1101,
      },
    ];
    results = await typesense
      .collections("companies")
      .documents()
      .import(modifiedDocuments, { action: "update" });
    console.log(results);
    // Process results as needed for errors / success
    failedItems = results.filter((item) => item.success === false);
    console.log(failedItems);

    // Bulk delete documents
    results = await typesense
      .collections("companies")
      .documents()
      .delete({ filter_by: "num_employees:>5000" });
    console.log(results);
  } catch (error) {
    console.log(error);
  } finally {
    // Cleanup
    typesense.collections("companies").delete();
  }
}

runExample();
