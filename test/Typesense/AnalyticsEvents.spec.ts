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

describe("AnalyticsEvents", async function () {
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

    const counterRuleV1 = {
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

    const counterRule = {
      name: "event_conversion",
      type: "counter" as const,
      event_type: "conversion",
      collection: "event_source",
      params: {
        counter_field: "counter",
        destination_collection: "event_counter",
        weight: 3,
      },
    };

    if (!(await isV30OrAbove(typesense))) {
      await typesense.analyticsV1.rules().upsert(counterRuleV1.name, counterRuleV1);
    } else {
      await typesense.analytics.rules().upsert(counterRule.name, counterRule);
    }

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
      if (!(await isV30OrAbove(typesense))) {
        await typesense.analyticsV1.rules("counter-rule").delete();
      } else {
        await typesense.analytics.rules("event_conversion").delete();
      }
    } catch (error) {
      if (!(error instanceof ObjectNotFound)) {
        console.warn("Failed to cleanup analytics rule:", error);
      }
    }
  });

  describe(".create", function () {
    it("shouldn't create an event for a non-existing name", async function () {
      let errorMessage = "Request failed with HTTP code 400 | Server said: Rule not found";
      if (!(await isV30OrAbove(typesense))) {
        errorMessage = "Request failed with HTTP code 400 | Server said: No analytics rule defined for event name non-existing-event";
      }
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
        errorMessage,
      );
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

  describe.skipIf(!(await isV30OrAbove(typesense)))(".retrieve", function () {
    it("should retrieve recent events for a user and rule", async function () {
      // Ensure at least one event exists
      await analyticsEvents.create({
        name: "event_conversion",
        type: "conversion",
        data: {
          doc_id: "999",
          user_id: "user-1",
          q: "abc",
        },
      });

      const events = await analyticsEvents.retrieve({
        user_id: "user-1",
        name: "event_conversion",
        n: 10,
      });

      expect(events).toBeDefined();
      expect(Array.isArray(events.events)).toBe(true);
      if (events.events.length > 0) {
        const evt = events.events[0];
        expect(evt.name).toBeDefined();
        expect(evt.event_type).toBeDefined();
        expect(evt.user_id).toBeDefined();
      }
    });
  });
});
