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
  "CurationSets",
  function () {
    const testCurationSetName = "test-curation-set";
    const curationSetData = {
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

    describe(".upsert/.retrieve/.delete", function () {
      it("creates, retrieves and deletes a curation set", async function () {
        const upserted = await typesense
          .curationSets(testCurationSetName)
          .upsert(curationSetData);
        expect(upserted.items.length).toBeGreaterThan(0);

        const fetched = await typesense
          .curationSets(testCurationSetName)
          .retrieve();
        expect(fetched.items[0].includes?.[0].id).toBe("123");

        const deletion = await typesense
          .curationSets(testCurationSetName)
          .delete();
        expect(deletion.name).toBe(testCurationSetName);
      });
    });

    describe(".list all", function () {
      it("retrieves all curation sets", async function () {
        await typesense.curationSets(testCurationSetName).upsert(curationSetData);

        const all = await typesense.curationSets().retrieve();
        expect(Array.isArray(all)).toBe(true);
        const created = all.find((c) => c.name === testCurationSetName);
        expect(created).toBeDefined();
      });
    });
  },
);


