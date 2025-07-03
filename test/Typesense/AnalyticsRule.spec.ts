import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { Client as TypesenseClient } from "../../src/Typesense";
import {
  ObjectNotFound,
  ObjectAlreadyExists,
} from "../../src/Typesense/Errors";
import { AnalyticsRuleCreateSchema } from "../../src/Typesense/AnalyticsRule";

describe("AnalyticsRule", function () {
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

  const testRuleName = "test_analytics_rule";
  const testRuleData = {
    type: "popular_queries",
    params: {
      source: {
        collections: ["*"],
      },
      destination: {
        collection: "top_queries",
      },
    },
  } as const satisfies AnalyticsRuleCreateSchema;

  let createdRuleNames: string[] = [];

  beforeEach(async function () {
    try {
      await typesense.collections().create({
        name: "top_queries",
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
    createdRuleNames = [];

    try {
      await typesense.collections("top_queries").delete();
    } catch (error) {
      if (!(error instanceof ObjectNotFound)) {
        console.warn("Failed to cleanup test collection:", error);
      }
    }
  });

  describe(".retrieve", function () {
    it("retrieves the rule", async function () {
      await typesense.analytics.rules().upsert(testRuleName, testRuleData);
      createdRuleNames.push(testRuleName);

      const analyticsRule = typesense.analytics.rules(testRuleName);
      const ruleData = await analyticsRule.retrieve();

      expect(ruleData).toBeDefined();
      expect(ruleData.name).toBe(testRuleName);
      expect(ruleData.type).toBe(testRuleData.type);
      expect(ruleData.params).toBeDefined();
      expect(ruleData.params.source).toEqual(testRuleData.params.source);
      expect(ruleData.params.destination).toEqual(
        testRuleData.params.destination,
      );
    });
  });

  describe(".delete", function () {
    it("deletes a rule", async function () {
      await typesense.analytics.rules().upsert(testRuleName, testRuleData);
      createdRuleNames.push(testRuleName);

      const analyticsRule = typesense.analytics.rules(testRuleName);
      const deleteResponse = await analyticsRule.delete();

      expect(deleteResponse).toBeDefined();
      expect(deleteResponse.name).toBe(testRuleName);

      await expect(analyticsRule.retrieve()).rejects.toThrow(ObjectNotFound);

      createdRuleNames = createdRuleNames.filter(
        (name) => name !== testRuleName,
      );
    });
  });
});
