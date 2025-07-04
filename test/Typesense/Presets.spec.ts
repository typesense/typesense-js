import { describe, it, expect, beforeEach } from "vitest";
import { Client as TypesenseClient } from "../../src/Typesense";

describe("Presets", function () {
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

  describe(".upsert", function () {
    it("normalizes arrayable parameters in preset values", async function () {
      const presetData = {
        value: {
          query_by: ["field1", "field2"],
          facet_by: ["category", "brand"],
          group_by: ["department"],
        },
      };

      const returnData = await typesense
        .presets()
        .upsert("preset-normalize", presetData);

      expect(returnData).toEqual({
        name: "preset-normalize",
        value: {
          query_by: "field1,field2",
          facet_by: "category,brand",
          group_by: "department",
        },
      });
    });

    it("normalizes arrayable parameters in preset searches", async function () {
      const presetData = {
        value: {
          searches: [
            {
              query_by: ["title", "description"],
              facet_by: ["tags", "type"],
            },
            {
              query_by: "name",
              facet_by: ["color"],
            },
          ],
        },
      };

      const returnData = await typesense
        .presets()
        .upsert("preset-normalize-searches", presetData);

      expect(returnData).toEqual({
        name: "preset-normalize-searches",
        value: {
          searches: [
            {
              query_by: "title,description",
              facet_by: "tags,type",
            },
            {
              query_by: "name",
              facet_by: "color",
            },
          ],
        },
      });
    });
  });

  describe(".retrieve", function () {
    beforeEach(async function () {
      const presets = await typesense.presets().retrieve();
      for (const preset of presets.presets) {
        await typesense.presets(preset.name).delete();
      }
    });
    it("retrieves all presets", async function () {
      const returnData = await typesense.presets().retrieve();

      expect(returnData).toEqual({ presets: [] });
    });
  });
});
