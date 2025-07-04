import { describe, it, expect } from "vitest";
import { Client as TypesenseClient } from "../../src/Typesense";

describe("Client", function () {
  const typesense = new TypesenseClient({
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

  it("should set the right default configuration values", function () {
    expect(typesense.configuration.nodes).toEqual([
      {
        host: "node0",
        port: 8108,
        protocol: "http",
        path: "",
      },
    ]);
    expect(typesense.configuration.connectionTimeoutSeconds).toBe(5);
    expect(typesense.configuration.apiKey).toBe("abcd");
  });

  it("should allow custom user headers to be passed in", function () {
    const typesense = new TypesenseClient({
      nodes: [
        {
          host: "node0",
          port: 8108,
          protocol: "http",
        },
      ],
      apiKey: "abcd",
      randomizeNodes: false,
      additionalHeaders: {
        "CF-Access-Client-Id": "abcd",
      },
    });
    expect(
      typesense.configuration.additionalHeaders!["CF-Access-Client-Id"],
    ).toBe("abcd");
  });
});
