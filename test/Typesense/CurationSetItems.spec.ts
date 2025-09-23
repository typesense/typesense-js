import { describe, it, expect, beforeEach, afterEach } from "vitest";
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

describe.skipIf(!(await isV30OrAbove(typesense)))(
  "CurationSetItems",
  function () {
    const testCurationSetName = "test-curation-set-items";
    const initialData = {
      items: [
        {
          id: "rule-1",
          rule: {
            query: "test",
            match: "exact" as const,
          },
          includes: [{ id: "123", position: 1 }],
        },
      ],
    };

    beforeEach(async function () {
      try {
        await typesense.curationSets(testCurationSetName).delete();
      } catch (error) {
        // ignore
      }
    });

    afterEach(async function () {
      try {
        await typesense.curationSets(testCurationSetName).delete();
      } catch (error) {
        if (!(error instanceof ObjectNotFound)) {
          console.warn("Failed to cleanup test curation set:", error);
        }
      }
    });

    it("lists items in a curation set", async function () {
      await typesense.curationSets(testCurationSetName).upsert(initialData);

      const items = await typesense
        .curationSets(testCurationSetName)
        .items()
        .retrieve();

      expect(Array.isArray(items)).toBe(true);
      expect(items.length).toBeGreaterThan(0);
      expect(items[0].includes?.[0].id).toBe("123");
    });

    it("upserts, retrieves and deletes an item", async function () {
      await typesense.curationSets(testCurationSetName).upsert(initialData);

      const upserted = await typesense
        .curationSets(testCurationSetName)
        .items("rule-1")
        .upsert({ id: "rule-1", rule: { query: "test", match: "exact" as const }, includes: [{ id: "999", position: 1 }] });
      expect(upserted.id).toBe("rule-1");

      const fetched = await typesense
        .curationSets(testCurationSetName)
        .items("rule-1")
        .retrieve();
      expect(fetched.includes?.[0].id).toBe("999");

      const deletion = await typesense
        .curationSets(testCurationSetName)
        .items("rule-1")
        .delete();
      expect(deletion.id).toBe("rule-1");
    });
  },
);


