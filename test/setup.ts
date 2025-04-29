import "dotenv/config";
import { Client } from "../src/Typesense";
import type { CollectionCreateSchema } from "../src/Typesense/Collections";
import { ObjectAlreadyExists } from "../src/Typesense/Errors";
import { essays } from "./essays";
import { ConversationModelCreateSchema } from "../src/Typesense/ConversationModel";

export const client = new Client({
  nodes: [
    {
      host: "localhost",
      port: 8108,
      protocol: "http",
    },
  ],
  apiKey: "xyz",
  connectionTimeoutSeconds: 180,
});

export const collection = {
  name: "pg-essays",
  fields: [
    {
      name: "title",
      type: "string",
      facet: false,
    },
    {
      name: "text",
      type: "string",
      facet: false,
    },
    {
      name: "embedding",
      type: "float[]",
      embed: {
        from: ["title", "text"],
        model_config: {
          model_name: "ts/snowflake-arctic-embed-m",
        },
      },
    },
  ],
} as const satisfies CollectionCreateSchema;

export const model = {
  id: "pg-essays-model",
  model_name: "openai/gpt-4-turbo",
  api_key: process.env.OPENAI_API_KEY ?? "",
  history_collection: "conversation_store",
  system_prompt:
    "You are an assistant for question-answering like Paul Graham. You can only make conversations based on the provided context. If a response cannot be formed strictly using the context, politely say you don't have knowledge about that topic.",
  max_bytes: 65536,
} as const satisfies ConversationModelCreateSchema;

export async function setup() {
  try {
    console.log("Creating collection");
    await client.collections().create(collection);
    console.log("Collection created");
  } catch (error) {
    if (error instanceof ObjectAlreadyExists) {
      console.log("PG essays collection already exists");
    } else {
      console.error(error);
    }
  }

  try {
    console.log("Creating conversation store collection");
    await client.collections().create({
      name: "conversation_store",
      fields: [
        {
          name: "conversation_id",
          type: "string",
        },
        {
          name: "model_id",
          type: "string",
        },
        {
          name: "timestamp",
          type: "int32",
        },
        {
          name: "role",
          type: "string",
          index: false,
        },
        {
          name: "message",
          type: "string",
          index: false,
        },
      ],
    });
    console.log("Conversation store collection created");
  } catch (error) {
    if (error instanceof ObjectAlreadyExists) {
      console.log("Conversation store collection already exists");
    } else {
      console.error(error);
    }
  }

  // if it fails, we're failing
  console.log("Importing essays");
  await client.collections(collection.name).documents().import(essays);
  console.log("Essays imported");

  try {
    console.log("Creating conversation model");
    await client.conversations().models().create(model);
    console.log("Conversation model created");
  } catch (error) {
    if (error instanceof ObjectAlreadyExists) {
      console.log("Conversation model already exists");
    } else {
      console.error(error);
    }
  }
}

export async function teardown() {
  console.log("Deleting collection");
  await client.collections(collection.name).delete();
  console.log("Collection deleted");

  console.log("Deleting conversation store collection");
  await client.collections("conversation_store").delete();
  console.log("Conversation store collection deleted");
}
