import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { Client as TypesenseClient } from "../../src/Typesense";

describe("Preset", function () {
  const typesense = new TypesenseClient({
    nodes: [
      {
        host: "localhost",
        port: 8108,
        protocol: "http",
      },
    ],
    apiKey: "xyz",
    randomizeNodes: false,
  });

  describe(".retrieve", function () {
    beforeEach(async function () {
      await typesense.presets().upsert("123", {
        value: {
          query_by: "field1,field2",
          facet_by: "category,brand",
          group_by: "department",
        },
      });
    });
    afterEach(async function () {
      await typesense.presets("123").delete();
    });
    it("retrieves the preset", async function () {
      const returnData = await typesense.presets("123").retrieve();

      expect(returnData).toEqual({
        name: "123",
        value: {
          query_by: "field1,field2",
          facet_by: "category,brand",
          group_by: "department",
        },
      });
    });
  });
});
