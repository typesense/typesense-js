import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { Client as TypesenseClient } from "../../src/Typesense";
import { ObjectNotFound } from "../../src/Typesense/Errors";
import type { CurationObjectSchema } from "../../src/Typesense/CurationSets";
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

const validTaggedRule = {
  id: "rule-with-tags",
  rule: {
    query: "test",
    match: "exact",
    filter_by: "brand:=nike",
    tags: ["tag1", "tag2"],
  },
  includes: [{ id: "123", position: 1 }],
} as const satisfies CurationObjectSchema;

const _: CurationObjectSchema = {
  id: "invalid-rule-missing-match",
  // @ts-expect-error query requires match
  rule: {
    query: "test",
    tags: ["tag1"],
  },
  includes: [{ id: "123", position: 1 }],
};

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
        .upsert({
          rule: { query: "test", match: "exact" as const },
          includes: [{ id: "999", position: 1 }],
        });
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

    it("upserts and retrieves an item with rule tags", async function () {
      await typesense.curationSets(testCurationSetName).upsert({ items: [] });

      const upserted = await typesense
        .curationSets(testCurationSetName)
        .items("rule-with-tags")
        .upsert(validTaggedRule);
      expect(upserted.id).toBe("rule-with-tags");

      const fetched = await typesense
        .curationSets(testCurationSetName)
        .items("rule-with-tags")
        .retrieve();
      expect(fetched.rule.tags).toEqual(["tag1", "tag2"]);
      expect(fetched.rule.filter_by).toBe("brand:=nike");
    });
  },
);
