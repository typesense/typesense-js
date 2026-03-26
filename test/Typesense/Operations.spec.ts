import { describe, it, expect, beforeEach } from "vitest";
import { Client as TypesenseClient } from "../../src/Typesense";
import Operations from "../../src/Typesense/Operations";
import ApiCall from "../../src/Typesense/ApiCall";
import axios from "axios";
import MockAxiosAdapter from "axios-mock-adapter";

describe("Operations", function () {
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

  const apiCall = new ApiCall(typesense.configuration);
  const operations = new Operations(apiCall);

  it("should be an instance of Operations", function () {
    expect(operations).toBeInstanceOf(Operations);
  });

  it("should have a perform method", function () {
    expect(typeof operations.perform).toBe("function");
  });

  it("should support known operation types", function () {
    const knownOperations = [
      "vote",
      "snapshot",
      "cache/clear",
      "schema_changes",
    ] as const;

    knownOperations.forEach((operation) => {
      expect(() => {
        operations.perform(operation, {});
      }).not.toThrow();
    });
  });

  it("should support custom operation names", function () {
    expect(() => {
      operations.perform("custom_operation", { custom_param: "value" });
    }).not.toThrow();
  });

  it("should have operations available on the client", function () {
    expect(typesense.operations).toBeInstanceOf(Operations);
  });

  it("should have the correct method signature for perform", function () {
    const result = operations.perform("snapshot", {
      snapshot_path: "/tmp/dbsnap",
    });
    expect(result).toBeInstanceOf(Promise);
  });

  describe(".getSchemaChanges", function () {
    let mockAxios: MockAxiosAdapter;

    beforeEach(function () {
      mockAxios = new MockAxiosAdapter(axios);
    });

    it("returns schema change statuses when changes are in progress", async function () {
      mockAxios
        .onGet(
          apiCall.uriFor(
            "/operations/schema_changes",
            typesense.configuration.nodes[0],
          ),
          {
            headers: {
              Accept: "application/json, text/plain, */*",
              "Content-Type": "application/json",
              "X-TYPESENSE-API-KEY": typesense.configuration.apiKey,
            },
          },
        )
        .reply(200, [
          {
            collection: "companies",
            validated_docs: 873000,
            altered_docs: 0,
          },
        ]);

      const returnData = await operations.getSchemaChanges();

      expect(returnData).toEqual([
        {
          collection: "companies",
          validated_docs: 873000,
          altered_docs: 0,
        },
      ]);
    });

    it("returns an empty array when no changes are in progress", async function () {
      mockAxios
        .onGet(
          apiCall.uriFor(
            "/operations/schema_changes",
            typesense.configuration.nodes[0],
          ),
          {
            headers: {
              Accept: "application/json, text/plain, */*",
              "Content-Type": "application/json",
              "X-TYPESENSE-API-KEY": typesense.configuration.apiKey,
            },
          },
        )
        .reply(200, []);

      const returnData = await operations.getSchemaChanges();

      expect(returnData).toEqual([]);
    });
  });
});
