import { describe, it, expect } from "vitest";
import { Client as TypesenseClient } from "../../src/Typesense";

describe("Debug", function () {
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

  describe(".retrieve", function () {
    it("retrieves debugging information", async function () {
      const debugInfo = await typesense.debug.retrieve();

      expect(debugInfo).toBeDefined();
      expect(typeof debugInfo).toBe("object");

      expect(debugInfo.version).toBeDefined();
      expect(typeof debugInfo.version).toBe("string");

      if (Object.keys(debugInfo).length > 1) {
        for (const [key, value] of Object.entries(debugInfo)) {
          expect(key).toBeDefined();
          expect(typeof key).toBe("string");
          expect(value !== undefined).toBe(true);
        }
      }
    });
  });
});
