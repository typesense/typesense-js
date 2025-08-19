import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { Client as TypesenseClient } from "../../src/Typesense";
import { ObjectNotFound } from "../../src/Typesense/Errors";
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

describe.skipIf(await isV30OrAbove(typesense))("AnalyticsEvents", function () {
  const analyticsEvents = typesense.analytics.events();

  beforeAll(async function () {
    const sourceCollection = {
      name: "event_source",
      fields: [
        {
          name: "title",
          type: "string" as const,
        },
        {
          name: "counter",
          type: "int32" as const,
        },
      ],
    };

    const counterCollection = {
      name: "event_counter",
      fields: [
        {
          name: "counter",
          type: "int32" as const,
        },
      ],
    };

    await typesense.collections().create(sourceCollection);
    await typesense.collections().create(counterCollection);

    const counterRule = {
      name: "counter-rule",
      type: "counter" as const,
      params: {
        destination: {
          collection: "event_counter",
          counter_field: "counter",
        },
        source: {
          collections: ["event_source"],
          events: [
            {
              name: "event_conversion",
              type: "conversion",
              weight: 3,
            },
          ],
        },
      },
    };

    await typesense.analytics.rules().upsert(counterRule.name, counterRule);
  });

  afterAll(async function () {
    try {
      await typesense.collections("event_source").delete();
    } catch (error) {
      if (!(error instanceof ObjectNotFound)) {
        console.warn("Failed to cleanup source collection:", error);
      }
    }

    try {
      await typesense.collections("event_counter").delete();
    } catch (error) {
      if (!(error instanceof ObjectNotFound)) {
        console.warn("Failed to cleanup counter collection:", error);
      }
    }

    try {
      await typesense.analytics.rules("counter-rule").delete();
    } catch (error) {
      if (!(error instanceof ObjectNotFound)) {
        console.warn("Failed to cleanup analytics rule:", error);
      }
    }
  });

  describe(".create", function () {
    it("shouldn't create an event for a non-existing name", async function () {
      await expect(
        analyticsEvents.create({
          name: "non-existing-event",
          type: "conversion",
          data: {
            doc_id: "123",
            user_id: "456",
          },
        }),
      ).rejects.toThrow(
        "No analytics rule defined for event name non-existing-event",
      );
    });

    it("shouldn't create an event for a mismatched name-type", async function () {
      await expect(
        analyticsEvents.create({
          name: "event_conversion",
          type: "click",
          data: {
            doc_id: "123",
            user_id: "456",
            q: "test",
          },
        }),
      ).rejects.toThrow("event_type mismatch in analytic rules.");
    });

    it("should create an event for a valid name-type", async function () {
      const result = await analyticsEvents.create({
        name: "event_conversion",
        type: "conversion",
        data: {
          doc_id: "123",
          user_id: "456",
          q: "test",
        },
      });

      expect(result).toBeDefined();
      expect(typeof result).toBe("object");
    });
  });
});
