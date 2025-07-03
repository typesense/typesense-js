import { describe, it, expect } from "vitest";
import {
  Client as TypesenseClient,
  SearchClient as TypesenseSearchClient,
  Errors,
} from "../src/Typesense";

describe("Typesense", function () {
  it("should have a Client object that can be instantiated", function () {
    const client = new TypesenseClient({
      nodes: [
        {
          host: "node0",
          port: 8108,
          protocol: "http",
        },
      ],
      apiKey: "abcd",
      randomizeNodes: false,
    });

    expect(client.configuration).toBeTypeOf("object");
  });

  it("should have a SearchClient object that can be instantiated", function () {
    const client = new TypesenseSearchClient({
      nodes: [
        {
          host: "node0",
          port: 8108,
          protocol: "http",
        },
      ],
      apiKey: "abcd",
      randomizeNodes: false,
    });

    expect(client.multiSearch).toBeDefined();
  });

  it("should have all the custom error objects", function () {
    // Just to make sure the object is available
    expect(new Errors.TypesenseError()).toBeInstanceOf(Errors.TypesenseError);
  });
});
