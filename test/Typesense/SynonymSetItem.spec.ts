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

describe.skipIf(!(await isV30OrAbove(typesense)))("SynonymSetItem", function () {
  const testSynonymSetName = "test-synonym-set-item";

  beforeEach(async function () {
    try {
      await typesense.synonymSets(testSynonymSetName).delete();
    } catch (error) {
      // Ignore if synonym set doesn't exist
    }
    await typesense.synonymSets(testSynonymSetName).upsert({
      items: [
        {
          id: "custom-item",
          synonyms: ["alpha", "a"],
        },
      ],
    });
  });

  afterEach(async function () {
    try {
      await typesense.synonymSets(testSynonymSetName).delete();
    } catch (error) {
      if (!(error instanceof ObjectNotFound)) {
        console.warn("Failed to cleanup test synonym set:", error);
      }
    }
  });

  it("retrieves a specific item", async function () {
    await typesense
      .synonymSets(testSynonymSetName)
      .items()
      .upsert("custom-item", { synonyms: ["beta", "b"] });

    const retrieved = await typesense
      .synonymSets(testSynonymSetName)
      .items("custom-item")
      .retrieve();

    expect(retrieved.id).toBe("custom-item");
    expect(retrieved.synonyms).toEqual(["beta", "b"]);
  });

  it("deletes a specific item", async function () {
    await typesense
      .synonymSets(testSynonymSetName)
      .items()
      .upsert("custom-item", { synonyms: ["gamma", "g"] });

    const deleteResult = await typesense
      .synonymSets(testSynonymSetName)
      .items("custom-item")
      .delete();

    expect(deleteResult.id).toBe("custom-item");

    await expect(
      typesense.synonymSets(testSynonymSetName).items("custom-item").retrieve(),
    ).rejects.toThrow(ObjectNotFound);
  });
});


