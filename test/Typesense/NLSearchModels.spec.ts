import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { Client as TypesenseClient } from "../../src/Typesense";

const runIntegrationTests = process.env.RUN_INTEGRATION_TESTS === "true";

describe.skipIf(!runIntegrationTests)("NLSearchModels", function () {
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

  const testModelId = "test-nl-search-model";
  const testModelData = {
    model_name: "openai/gpt-3.5-turbo",
    api_key: process.env.OPENAI_API_KEY,
    max_bytes: 16384,
    system_prompt: "This is a test system prompt",
  };

  beforeEach(async function () {
    try {
      await typesense.nlSearchModels(testModelId).delete();
    } catch (error) {}
  });

  afterEach(async function () {
    try {
      await typesense.nlSearchModels(testModelId).delete();
    } catch (error) {}
  });

  describe(".create", function () {
    it("creates a new NL search model", async function () {
      const createData = {
        id: testModelId,
        ...testModelData,
      };

      const createdModel = await typesense.nlSearchModels().create(createData);

      expect(createdModel).toBeDefined();
      expect(createdModel.id).toBe(testModelId);
      expect(createdModel.model_name).toBe(testModelData.model_name);
      expect(createdModel.max_bytes).toBe(testModelData.max_bytes);
      expect(createdModel.system_prompt).toBe(testModelData.system_prompt);
    });

    it("creates a model with auto-generated ID", async function () {
      const createData = {
        ...testModelData,
      };

      const createdModel = await typesense.nlSearchModels().create(createData);

      expect(createdModel).toBeDefined();
      expect(createdModel.id).toBeDefined();
      expect(createdModel.id).not.toBe("");
      expect(createdModel.model_name).toBe(testModelData.model_name);
      expect(createdModel.max_bytes).toBe(testModelData.max_bytes);
      expect(createdModel.system_prompt).toBe(testModelData.system_prompt);
    });
  });

  describe(".retrieve", function () {
    it("retrieves all NL search models", async function () {
      // Create a test model first
      await typesense.nlSearchModels().create({
        id: testModelId,
        ...testModelData,
      });

      const models = await typesense.nlSearchModels().retrieve();

      expect(models).toBeDefined();
      expect(Array.isArray(models)).toBe(true);
      expect(models.length).toBeGreaterThan(0);

      const testModel = models.find((model) => model.id === testModelId);
      expect(testModel).toBeDefined();
      expect(testModel?.model_name).toBe(testModelData.model_name);
      expect(testModel?.max_bytes).toBe(testModelData.max_bytes);
      expect(testModel?.system_prompt).toBe(testModelData.system_prompt);
    });
  });
});
