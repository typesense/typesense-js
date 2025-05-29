/*
 These examples walk you through all the operations you can do on a document
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

    // create a document
    result = await typesense
      .collections("companies")
      .documents()
      .create(documents[0]);
    console.log(result);

    // You can also upsert a document
    result = await typesense
      .collections("companies")
      .documents()
      .upsert(documents[0]);
    console.log(result);

    // Retrieve the document
    await timer(0.5); // Give Typesense cluster a few hundred ms to index document on all nodes, before reading it right after (eventually consistent)
    result = await typesense
      .collections("companies")
      .documents("124")
      .retrieve();
    console.log(result);

    // Delete a document (deletion returns the document after deletion)
    result = await typesense.collections("companies").documents("124").delete();
    console.log(result);

    // create a couple of documents
    result = await typesense
      .collections("companies")
      .documents()
      .import(documents);
    console.log(result);

    // update a document
    result = await typesense.collections("companies").documents(124).update({
      num_employees: 5500,
    });
    console.log(result);

    // update by query
    console.log("Updating by query");
    result = await typesense
      .collections("companies")
      .documents()
      .update({ num_employees: 200 }, { filter_by: "num_employees:>5000" });
    console.log(result);

    // Export all documents in a collection in JSON Lines format
    //  We use JSON Lines format for performance reasons. You can choose to parse selected lines (elements in the array) as needed.
    await timer(0.5); // Give Typesense cluster a few hundred ms to index document on all nodes, before reading it right after (eventually consistent)
    result = await typesense.collections("companies").documents().export();
    console.log(result);
  } catch (error) {
    console.log(error);
  } finally {
    // Cleanup
    typesense.collections("companies").delete();
  }
}

async function timer(seconds) {
  return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
}

runExample();
