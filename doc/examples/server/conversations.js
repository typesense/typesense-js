/*
 These examples walk you through all the operations you can do with Conversations
 See clientInitalization.js for quick instructions on starting the Typesense server.
*/
require("@babel/register");

// eslint-disable-next-line @typescript-eslint/no-var-requires
const Typesense = require("../../../lib/Typesense");

// Create a client
const typesense = new Typesense.Client({
  nodes: [
    {
      host: "localhost",
      port: "8108",
      protocol: "http",
    },
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
    {
      name: "embedding",
      type: "float[]",
      embed: {
        from: ["company_name", "country"],
        model_config: {
          model_name: "ts/all-MiniLM-L12-v2",
        },
      },
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
    id: "126",
    company_name: "Wayne Enterprises",
    num_employees: 1002,
    country: "Canada",
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
    // Delete if the conversation model already exists from a previous example run
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
    result = await typesense
      .collections("companies")
      .documents()
      .import(documents);
    console.log(result);

    // Create a conversation model
    let conversationModelResult = await typesense
      .conversations()
      .models()
      .create({
        model_name: "openai/gpt-3.5-turbo",
        api_key: process.env.OPENAI_API_KEY,
        system_prompt: "Be very elaborate in your responses",
        max_bytes: 1024,
      });
    console.log(result);

    // Retrieve all conversation models
    result = await typesense.conversations().models().retrieve();
    console.log(result);

    // Retrieve a particular conversation model
    result = await typesense
      .conversations()
      .models(conversationModelResult.id)
      .retrieve();
    console.log(result);

    // Search for documents in conversation mode
    result = await typesense.collections("companies").documents().search({
      q: "What is the name of the company that Batman ran?",
      query_by: "embedding",
      conversation: true,
      conversation_model_id: conversationModelResult.id,
    });
    console.log(result.conversation);

    let conversationId = result.conversation.conversation_id;

    // Ask a follow-up question, in the same conversation
    result = await typesense.collections("companies").documents().search({
      q: "Tell me more about it",
      query_by: "embedding",
      conversation: true,
      conversation_model_id: conversationModelResult.id,
      conversation_id: conversationId,
    });
    console.log(result.conversation);

    // Fetch all conversations
    result = await typesense.conversations().retrieve();
    console.log(result);

    // Fetch a past conversation
    result = await typesense.conversations(conversationId).retrieve();
    console.log(result);

    // Update TTL of past conversation
    result = await typesense.conversations(conversationId).update({ ttl: 10 });
    console.log(result);

    // Delete conversation model
    result = await typesense
      .conversations()
      .models(conversationModelResult.id)
      .delete();
    console.log(result);
  } catch (error) {
    console.log(error);
  } finally {
    // Cleanup
    typesense.collections("companies").delete();
  }
}

runExample();
