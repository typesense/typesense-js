import { describe, it, expect } from "vitest";
import { Client as TypesenseClient } from "../../src/Typesense";
import type { HealthResponse } from "../../src/Typesense/Health";

describe("Health", function () {
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
    it("retrieves health information", async function () {
      const healthResponse = await typesense.health.retrieve();

      expect(healthResponse).toBeDefined();
      expect(healthResponse).toHaveProperty("ok");
      expect(typeof healthResponse.ok).toBe("boolean");
    });

    it("returns the expected health response structure", async function () {
      const healthResponse: HealthResponse = await typesense.health.retrieve();

      expect(healthResponse).toEqual({
        ok: true,
      });
    });
  });
});
