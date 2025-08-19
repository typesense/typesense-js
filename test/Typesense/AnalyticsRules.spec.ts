import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { Client as TypesenseClient } from "../../src/Typesense";
import {
  ObjectNotFound,
  ObjectAlreadyExists,
} from "../../src/Typesense/Errors";
import { AnalyticsRuleCreateSchema } from "../../src/Typesense/AnalyticsRule";
import { isV30OrAbove } from "../utils";

const typesense = new TypesenseClient({
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

describe.skipIf(await isV30OrAbove(typesense))("AnalyticsRules", function () {
  const analyticsRules = typesense.analytics.rules();
  const testRuleName = "search_suggestions";
  const testRuleData = {
    type: "popular_queries",
    params: {
      source: { collections: ["products"] },
      destination: { collection: "products_top_queries" },
      expand_query: true,
      limit: 100,
    },
  } as const satisfies AnalyticsRuleCreateSchema;

  const createdRuleNames: string[] = [];

  beforeEach(async function () {
    try {
      await typesense.collections().create({
        name: "products",
        fields: [
          {
            name: "name",
            type: "string",
          },
          {
            name: "category",
            type: "string",
          },
        ],
      });
    } catch (error) {
      if (!(error instanceof ObjectAlreadyExists)) {
        throw error;
      }
    }

    try {
      await typesense.collections().create({
        name: "products_top_queries",
        fields: [
          {
            name: "q",
            type: "string",
          },
          {
            name: "count",
            type: "int32",
          },
        ],
      });
    } catch (error) {
      if (!(error instanceof ObjectAlreadyExists)) {
        throw error;
      }
    }
  });

  afterEach(async function () {
    for (const ruleName of createdRuleNames) {
      try {
        await typesense.analytics.rules(ruleName).delete();
      } catch (error) {
        if (!(error instanceof ObjectNotFound)) {
          console.warn("Failed to cleanup test analytics rule:", error);
        }
      }
    }
    createdRuleNames.length = 0;

    try {
      await typesense.collections("products").delete();
    } catch (error) {
      if (!(error instanceof ObjectNotFound)) {
        console.warn("Failed to cleanup test collection:", error);
      }
    }

    try {
      await typesense.collections("products_top_queries").delete();
    } catch (error) {
      if (!(error instanceof ObjectNotFound)) {
        console.warn("Failed to cleanup test collection:", error);
      }
    }
  });

  describe(".upsert", function () {
    it("upserts an analytics rule", async function () {
      const ruleData = await analyticsRules.upsert(testRuleName, testRuleData);

      expect(ruleData).toBeDefined();
      expect(ruleData.name).toBe(testRuleName);
      expect(ruleData.type).toBe(testRuleData.type);
      expect(ruleData.params).toBeDefined();
      expect(ruleData.params.source).toEqual(testRuleData.params.source);
      expect(ruleData.params.destination).toEqual(
        testRuleData.params.destination,
      );
      expect(ruleData.params.expand_query).toBe(
        testRuleData.params.expand_query,
      );
      expect(ruleData.params.limit).toBe(testRuleData.params.limit);
    });
  });

  describe(".retrieve", function () {
    it("retrieves all analytics rules", async function () {
      await analyticsRules.upsert(testRuleName, testRuleData);
      createdRuleNames.push(testRuleName);

      const rulesData = await analyticsRules.retrieve();

      expect(rulesData).toBeDefined();
      expect(rulesData.rules).toBeDefined();
      expect(Array.isArray(rulesData.rules)).toBe(true);

      const testRule = rulesData.rules.find(
        (rule) => rule.name === testRuleName,
      );
      expect(testRule).toBeDefined();
      expect(testRule!.type).toBe(testRuleData.type);
      expect(testRule!.params).toBeDefined();
      expect(testRule!.params.source).toEqual(testRuleData.params.source);
      expect(testRule!.params.destination).toEqual(
        testRuleData.params.destination,
      );
    });
  });
});
