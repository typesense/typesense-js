/*
 * This example demonstrates CRUD operations on Natural Language Search Models in Typesense
 *
 * Natural Language Search allows you to transform free-form sentences into structured
 * search parameters using Large Language Models (LLMs).
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
  connectionTimeoutSeconds: 2,
});

async function runExample() {
  try {
    // Create a Natural Language Search Model with Google Gemini
    console.log("Creating a Gemini NL Search Model...");
    const geminiModel = await typesense.nlSearchModels().create({
      id: "gemini-model",
      model_name: "google/gemini-2.5-flash",
      api_key: "YOUR_GOOGLE_AI_STUDIO_API_KEY", // Get from https://aistudio.google.com/app/apikey
      max_bytes: 16000,
      temperature: 0.0,
      system_prompt:
        "You are a helpful search assistant for an e-commerce store.",
    });
    console.log("Created Gemini model:", geminiModel);

    // Create an OpenAI model
    console.log("\nCreating an OpenAI NL Search Model...");
    const openAIModel = await typesense.nlSearchModels().create({
      id: "openai-model",
      model_name: "openai/gpt-4.1",
      api_key: "YOUR_OPENAI_API_KEY",
      max_bytes: 16000,
      temperature: 0.0,
    });
    console.log("Created OpenAI model:", openAIModel);

    // List all NL Search Models
    console.log("\nListing all NL Search Models...");
    const allModels = await typesense.nlSearchModels().retrieve();
    console.log("All models:", allModels);
    console.log("Number of models:", allModels.length);

    // Retrieve a specific model
    console.log("\nRetrieving the Gemini model...");
    const retrievedModel = await typesense
      .nlSearchModels("gemini-model")
      .retrieve();
    console.log("Retrieved model:", retrievedModel);

    // Update a model
    console.log("\nUpdating the Gemini model...");
    const updatedModel = await typesense.nlSearchModels("gemini-model").update({
      temperature: 0.2,
      system_prompt:
        "You are a search assistant specialized in electronics and gadgets.",
    });
    console.log("Updated model:", updatedModel);

    // Delete a model
    console.log("\nDeleting the OpenAI model...");
    const deleteResult = await typesense
      .nlSearchModels("openai-model")
      .delete();
    console.log("Delete result:", deleteResult);

    // Example: Using the NL Search Model in a search query
    console.log("\nExample search with NL query...");

    // Create a timestamped collection to avoid collisions
    const timestamp = Date.now();
    const collectionName = `products_${timestamp}`;

    await typesense.collections().create({
      name: collectionName,
      fields: [
        { name: "name", type: "string" },
        { name: "description", type: "string" },
        { name: "price", type: "float" },
        { name: "category", type: "string" },
        { name: "color", type: "string" },
        { name: "in_stock", type: "bool" },
        { name: "rating", type: "float" },
      ],
    });
    console.log(`Created collection: ${collectionName}`);

    // Add sample documents
    const sampleProducts = [
      {
        id: "1",
        name: "Men's Red Cotton Shirt",
        description: "Comfortable casual shirt",
        price: 24.99,
        category: "Apparel",
        color: "Red",
        in_stock: true,
        rating: 4.5,
      },
      {
        id: "2",
        name: "Women's Blue Denim Jeans",
        description: "Classic straight-cut denim jeans",
        price: 49.99,
        category: "Apparel",
        color: "Blue",
        in_stock: true,
        rating: 4.2,
      },
      {
        id: "3",
        name: "Running Shoes - Green",
        description: "Lightweight shoes perfect for running",
        price: 89.99,
        category: "Footwear",
        color: "Green",
        in_stock: false,
        rating: 4.8,
      },
    ];

    // Import the documents
    await typesense
      .collections(collectionName)
      .documents()
      .import(sampleProducts);
    console.log("Imported sample products");

    // Perform natural language searches
    console.log("\nExample 1: 'Find red shirts under $30'");
    const searchResults1 = await typesense
      .collections(collectionName)
      .documents()
      .search({
        q: "Find red shirts under $30",
        nl_query: true,
        query_by: "name,description,color,category",
        nl_model_id: "gemini-model",
      });
    console.log("Results:", searchResults1);

    console.log("\nExample 2: 'Show me available footwear sorted by price'");
    const searchResults2 = await typesense
      .collections(collectionName)
      .documents()
      .search({
        q: "Show me available footwear sorted by price",
        nl_query: true,
        query_by: "name,description,category",
        nl_model_id: "gemini-model",
      });
    console.log("Results:", searchResults2);

    // Clean up - delete the timestamped collection
    await typesense.collections(collectionName).delete();
    console.log(`\nDeleted collection: ${collectionName}`);
  } catch (error) {
    console.error("Error:", error);
  }
}

runExample();
