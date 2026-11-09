import { Client } from "../../../src/Typesense";

const client = new Client({
  nodes: [
    {
      host: "localhost",
      port: 8108,
      protocol: "http",
    },
  ],
  apiKey: "xyz",
  connectionTimeoutSeconds: 2,
});

async function synonymSetsExample(): Promise<void> {
  try {
    // Create a synonym set
    const synonymSet = await client.synonymSets("foobar").upsert({
      items: [
        {
          id: "dummy",
          synonyms: ["foo", "bar", "baz"],
        },
      ],
    });
    console.log("Created synonym set:", synonymSet);

    // Retrieve all synonym sets
    const allSynonymSets = await client.synonymSets().retrieve();
    console.log("All synonym sets:", allSynonymSets);

    // Get a specific synonym set
    const specificSynonymSet = await client.synonymSets("foobar").retrieve();
    console.log("Specific synonym set:", specificSynonymSet);

    // Upsert a single item in a synonym set
    const synonymSetItem = await client
      .synonymSets("foobar")
      .items("dummy")
      .upsert({ synonyms: ["foo", "bar", "baz", "qux"] });
    console.log("Upserted synonym set item:", synonymSetItem);

    // Create a collection with synonym sets
    const collection = await client.collections().create({
      name: "products",
      fields: [
        {
          name: "name",
          type: "string",
        },
      ],
      synonym_sets: ["foobar"],
    });
    console.log("Created collection with synonym sets:", collection);

    // Remove the synonym sets from a collection
    const updatedCollection = await client.collections("products").update({
      synonym_sets: [],
    });
    console.log("Updated collection:", updatedCollection);

    // Delete the collection
    const deletedCollection = await client.collections("products").delete();
    console.log("Deleted collection:", deletedCollection);

    // Delete a synonym set
    const deletedSynonymSet = await client.synonymSets("foobar").delete();
    console.log("Deleted synonym set:", deletedSynonymSet);
  } catch (error) {
    console.error("Error:", error);
  }
}

// Run the example
synonymSetsExample();
