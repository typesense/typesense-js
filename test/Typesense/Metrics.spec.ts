import { describe, it, expect } from "vitest";
import { Client as TypesenseClient } from "../../src/Typesense";

describe("Metrics", function () {
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
    it("retrieves metrics", async function () {
      const metricsData = await typesense.metrics.retrieve();

      expect(metricsData).toBeDefined();
      expect(metricsData).toHaveProperty("system_cpu_active_percentage");
      expect(metricsData).toHaveProperty("system_disk_total_bytes");
      expect(metricsData).toHaveProperty("system_disk_used_bytes");
      expect(metricsData).toHaveProperty("system_memory_total_bytes");
      expect(metricsData).toHaveProperty("system_memory_used_bytes");
      expect(metricsData).toHaveProperty("system_network_received_bytes");
      expect(metricsData).toHaveProperty("system_network_sent_bytes");

      if (Object.keys(metricsData).length > 0) {
        for (const [key, value] of Object.entries(metricsData)) {
          expect(key).toBeDefined();
          expect(typeof key).toBe("string");
          expect(value !== undefined).toBe(true);
        }
      }
    });
  });
});
