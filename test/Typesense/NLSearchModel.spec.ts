import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { Client as TypesenseClient } from "../../src/Typesense";
import { ObjectNotFound } from "../../src/Typesense/Errors";

const runIntegrationTests = process.env.RUN_INTEGRATION_TESTS === "true";

describe.skipIf(!runIntegrationTests)("NLSearchModel", function () {
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
    } catch (error) {
      // Ignore if model doesn't exist
    }
  });

  afterEach(async function () {
    try {
      await typesense.nlSearchModels(testModelId).delete();
    } catch (error) {
      if (!(error instanceof ObjectNotFound)) {
        console.warn("Failed to cleanup test NL search model:", error);
      }
    }
  });

  describe(".retrieve", function () {
    it("retrieves the NL search model", async function () {
      await typesense.nlSearchModels().create({
        id: testModelId,
        ...testModelData,
      });

      const nlSearchModel = typesense.nlSearchModels(testModelId);
      const modelData = await nlSearchModel.retrieve();

      expect(modelData).toBeDefined();
      expect(modelData.id).toBe(testModelId);
      expect(modelData.model_name).toBe(testModelData.model_name);
      expect(modelData.max_bytes).toBe(testModelData.max_bytes);
      expect(modelData.system_prompt).toBe(testModelData.system_prompt);
    });

    it("throws ObjectNotFound for non-existent model", async function () {
      const nlSearchModel = typesense.nlSearchModels("non-existent-model");

      await expect(nlSearchModel.retrieve()).rejects.toThrow(ObjectNotFound);
    });
  });

  describe(".update", function () {
    it("updates the NL search model", async function () {
      await typesense.nlSearchModels().create({
        id: testModelId,
        ...testModelData,
      });

      const nlSearchModel = typesense.nlSearchModels(testModelId);
      const updateData = {
        model_name: testModelData.model_name,
        system_prompt: "Updated system prompt",
        temperature: 0.5,
      };

      const updatedModel = await nlSearchModel.update(updateData);

      expect(updatedModel).toBeDefined();
      expect(updatedModel.id).toBe(testModelId);
      expect(updatedModel.system_prompt).toBe(updateData.system_prompt);
      expect(updatedModel.temperature).toBe(updateData.temperature);
      expect(updatedModel.model_name).toBe(testModelData.model_name);
      expect(updatedModel.max_bytes).toBe(testModelData.max_bytes);
    });

    it("throws ObjectNotFound when updating non-existent model", async function () {
      const nlSearchModel = typesense.nlSearchModels("non-existent-model");

      await expect(
        nlSearchModel.update({
          system_prompt: "Updated system prompt",
          model_name: "openai/gpt-3.5-turbo",
        }),
      ).rejects.toThrow(ObjectNotFound);
    });
  });

  describe(".delete", function () {
    it("deletes the NL search model", async function () {
      await typesense.nlSearchModels().create({
        id: testModelId,
        ...testModelData,
      });

      const nlSearchModel = typesense.nlSearchModels(testModelId);
      const deleteResponse = await nlSearchModel.delete();

      expect(deleteResponse).toBeDefined();
      expect(deleteResponse.id).toBe(testModelId);

      await expect(nlSearchModel.retrieve()).rejects.toThrow(ObjectNotFound);
    });

    it("throws ObjectNotFound when deleting non-existent model", async function () {
      const nlSearchModel = typesense.nlSearchModels("non-existent-model");

      await expect(nlSearchModel.delete()).rejects.toThrow(ObjectNotFound);
    });
  });
});
