import { describe, it, expect } from "vitest";
import { Client as TypesenseClient } from "../../src/Typesense";
import { MissingConfigurationError } from "../../src/Typesense/Errors";
import {
  ConfigurationOptions,
  NodeConfigurationWithHostname,
  NodeConfigurationWithUrl,
} from "../../src/Typesense/Configuration";

describe("Configuration", function () {
  it("throws an error if there is a missing host value in nodes", function () {
    expect(() => {
      new TypesenseClient({
        nodes: [
          // @ts-expect-error - This is missing a host
          {
            port: 8108,
            protocol: "http",
          },
        ],
        apiKey: "abcd",
        randomizeNodes: false,
      });
    }).toThrow(MissingConfigurationError);
  });

  it("throws an error if there is a missing protocol value in nodes", function () {
    expect(() => {
      new TypesenseClient({
        nodes: [
          // @ts-expect-error - This is missing a protocol
          {
            host: "node0",
            port: 8108,
          },
        ],
        apiKey: "abcd",
        randomizeNodes: false,
      });
    }).toThrow(MissingConfigurationError);
  });

  it("auto sets port if port is missing", function () {
    expect(() => {
      const typesense = new TypesenseClient({
        nodes: [
          // @ts-expect-error - This is missing a port
          {
            host: "node0",
            protocol: "http",
          },
        ],
        apiKey: "abcd",
        randomizeNodes: false,
      });
      expect(
        (typesense.configuration.nodes[0] as NodeConfigurationWithHostname)
          .port,
      ).toBe(80);
    }).not.toThrow(MissingConfigurationError);
  });

  it("throws an error if nearestNode is missing values", function () {
    expect(() => {
      new TypesenseClient({
        nodes: [
          {
            host: "node0",
            protocol: "http",
            port: 8108,
          },
        ],
        // @ts-expect-error - This is missing a port
        nearestNode: {
          host: "node1",
        },
        apiKey: "abcd",
        randomizeNodes: false,
      });
    }).toThrow(MissingConfigurationError);
  });

  it("throws an error if apiKey is missing", function () {
    expect(() => {
      new TypesenseClient({
        nodes: [
          // @ts-expect-error - This is missing a api key
          {
            host: "node0",
            protocol: "http",
          },
        ],
      });
    }).toThrow(MissingConfigurationError);
  });

  it("does not throw any errors if url is present", function () {
    expect(() => {
      const typesense = new TypesenseClient({
        nodes: [
          {
            url: "https://example.net/",
          },
        ],
        apiKey: "abcd",
        randomizeNodes: false,
      });
      expect(
        (typesense.configuration.nodes[0] as NodeConfigurationWithUrl).url,
      ).toBe("https://example.net/");
    }).not.toThrow(MissingConfigurationError);
  });

  it("randomizes nodes by default", function () {
    for (let i = 0; i < 10; i++) {
      const typesense = new TypesenseClient({
        nodes: [
          { host: "node0", protocol: "https", port: 8108 },
          { host: "node1", protocol: "https", port: 8108 },
        ],
        apiKey: "abcd",
      });
      if (
        (typesense.configuration.nodes[0] as NodeConfigurationWithHostname)
          .host === "node1"
      ) {
        expect(
          (typesense.configuration.nodes[0] as NodeConfigurationWithHostname)
            .host,
        ).toBe("node1");
        return;
      }
    }
    // If we get here, node1 was never first, which is very unlikely with proper randomization
    const typesense = new TypesenseClient({
      nodes: [
        { host: "node0", protocol: "https", port: 8108 },
        { host: "node1", protocol: "https", port: 8108 },
      ],
      apiKey: "abcd",
    });
    expect(
      ["node0", "node1"].includes(
        (typesense.configuration.nodes[0] as NodeConfigurationWithHostname)
          .host,
      ),
    ).toBe(true);
  });
  describe("numRetries", function () {
    const node = { host: "node0", protocol: "https", port: 8108 };

    function numRetriesFor(
      options: Partial<ConfigurationOptions> = {},
    ): number {
      return new TypesenseClient({
        nodes: [node],
        apiKey: "abcd",
        randomizeNodes: false,
        ...options,
      }).configuration.numRetries;
    }

    it("uses the given value when it is zero", function () {
      expect(numRetriesFor({ numRetries: 0 })).toBe(0);
    });

    it("uses the given value when it is positive", function () {
      expect(numRetriesFor({ numRetries: 1 })).toBe(1);
      expect(numRetriesFor({ numRetries: 2 })).toBe(2);
      expect(numRetriesFor({ numRetries: 10 })).toBe(10);
    });

    it("falls back to the node count when it is negative", function () {
      expect(numRetriesFor({ numRetries: -1 })).toBe(1);
    });

    it("defaults to the node count when it is undefined", function () {
      expect(numRetriesFor({ numRetries: undefined })).toBe(1);
      expect(numRetriesFor()).toBe(1);
      expect(
        numRetriesFor({
          nodes: [
            { host: "node0", protocol: "https", port: 8108 },
            { host: "node1", protocol: "https", port: 8108 },
            { host: "node2", protocol: "https", port: 8108 },
          ],
        }),
      ).toBe(3);
    });

    it("counts nearestNode in the default", function () {
      expect(
        numRetriesFor({
          nearestNode: { host: "node1", protocol: "https", port: 8108 },
        }),
      ).toBe(2);
    });
  });
});
