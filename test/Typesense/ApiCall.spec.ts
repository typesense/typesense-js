import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { Client as TypesenseClient } from "../../src/Typesense";
import ApiCall from "../../src/Typesense/ApiCall";
import { ObjectUnprocessable } from "../../src/Typesense/Errors";
import axios from "axios";
import MockAxiosAdapter from "axios-mock-adapter";
import timekeeper from "timekeeper";

const createSharedNodeSelectionBehavior = (method: string) => {
  return () => {
    let typesense: TypesenseClient;
    let mockAxios: MockAxiosAdapter;
    let apiCall: ApiCall;

    beforeEach(() => {
      typesense = new TypesenseClient({
        nodes: [
          {
            host: "node0",
            port: 8108,
            protocol: "http",
          },
          {
            host: "node1",
            port: 7108,
            protocol: "http",
          },
          {
            host: "node2",
            port: 9108,
            protocol: "http",
          },
        ],
        apiKey: "abcd",
        randomizeNodes: false,
        logLevel: "error",
        retryIntervalSeconds: 0.001,
      });
      mockAxios = new MockAxiosAdapter(axios);
      apiCall = new ApiCall(typesense.configuration);
    });

    it("does not retry when HTTPStatus >= 300 and HTTPStatus < 500", async () => {
      mockAxios
        .onAny(apiCall.uriFor("/", typesense.configuration.nodes[0]))
        .reply(409, JSON.stringify({ message: "Already exists" }), {
          "content-type": "application/json",
        });
      mockAxios
        .onAny(apiCall.uriFor("/", typesense.configuration.nodes[1]))
        .reply(422, JSON.stringify({ message: "Unprocessable" }), {
          "content-type": "application/json",
        });
      mockAxios
        .onAny(apiCall.uriFor("/", typesense.configuration.nodes[2]))
        .reply(500, JSON.stringify({ message: "Error message" }), {
          "content-type": "application/json",
        });

      await expect(apiCall[method]("/")).rejects.toThrow(
        "Request failed with HTTP code 409 | Server said: Already exists",
      );
      await expect(apiCall[method]("/")).rejects.toThrow(ObjectUnprocessable);
      const requestHistory = mockAxios.history[method];
      expect(requestHistory.length).toBe(2);
      expect(requestHistory[0].url).toBe("http://node0:8108/");
      expect(requestHistory[1].url).toBe("http://node1:7108/");
    });

    it("raises an error when no nodes are healthy", async () => {
      mockAxios
        .onAny(apiCall.uriFor("/", typesense.configuration.nodes[0]))
        .reply(500, JSON.stringify({ message: "Error message" }), {
          "content-type": "application/json",
        });
      mockAxios
        .onAny(apiCall.uriFor("/", typesense.configuration.nodes[1]))
        .reply(500, JSON.stringify({ message: "Error message" }), {
          "content-type": "application/json",
        });
      mockAxios
        .onAny(apiCall.uriFor("/", typesense.configuration.nodes[2]))
        .reply(500, JSON.stringify({ message: "Error message" }), {
          "content-type": "application/json",
        });

      await expect(apiCall[method]("/")).rejects.toThrow(
        "Request failed with HTTP code 500 | Server said: Error message",
      );
      const requestHistory = mockAxios.history[method];
      expect(requestHistory.length).toBe(4);
      expect(requestHistory[0].url).toBe("http://node0:8108/");
      expect(requestHistory[1].url).toBe("http://node1:7108/");
      expect(requestHistory[2].url).toBe("http://node2:9108/");
      expect(requestHistory[3].url).toBe("http://node0:8108/");
    });

    it("selects the next available node when there is a connection timeout", async () => {
      mockAxios
        .onAny(apiCall.uriFor("/", typesense.configuration.nodes[0]))
        .timeout();
      mockAxios
        .onAny(apiCall.uriFor("/", typesense.configuration.nodes[1]))
        .timeout();
      mockAxios
        .onAny(apiCall.uriFor("/", typesense.configuration.nodes[2]))
        .reply(200, JSON.stringify({ message: "Success" }), {
          "content-type": "application/json",
        });

      const result = await apiCall[method]("/");
      expect(result).toEqual({
        message: "Success",
      });
      const requestHistory = mockAxios.history[method];
      expect(requestHistory.length).toBe(3);
      expect(requestHistory[0].url).toBe("http://node0:8108/");
      expect(requestHistory[1].url).toBe("http://node1:7108/");
      expect(requestHistory[2].url).toBe("http://node2:9108/");
    });

    it("removes unhealthy nodes out of rotation, until threshold", async () => {
      mockAxios
        .onAny(apiCall.uriFor("/", typesense.configuration.nodes[0]))
        .timeout();
      mockAxios
        .onAny(apiCall.uriFor("/", typesense.configuration.nodes[1]))
        .timeout();
      mockAxios
        .onAny(apiCall.uriFor("/", typesense.configuration.nodes[2]))
        .reply(200, JSON.stringify({ message: "Success" }), {
          "content-type": "application/json",
        });

      const currentTime = Date.now();
      timekeeper.freeze(currentTime);
      await apiCall[method]("/"); // Node 0 and Node 1 are marked as unhealthy after this, request should have been made to Node 2
      await apiCall[method]("/"); // Request should have been made to Node 2
      await apiCall[method]("/"); // Request should have been made to Node 2

      timekeeper.freeze(currentTime + 5 * 1000);
      await apiCall[method]("/"); // Request should have been made to Node 2

      timekeeper.freeze(currentTime + 65 * 1000);
      await apiCall[method]("/"); // Request should have been made to Node 2, since Node 0 and Node 1 are still unhealthy, though they were added back into rotation after the threshold

      // Remove first mock, to let request to node 0 succeed
      mockAxios
        .onAny(apiCall.uriFor("/", typesense.configuration.nodes[0]))
        .reply(200, JSON.stringify({ message: "Success" }), {
          "content-type": "application/json",
        });

      timekeeper.freeze(currentTime + 185 * 1000);
      await apiCall[method]("/"); // Request should have been made to Node 0, since it is now healthy and the unhealthy threshold was exceeded

      const requestHistory = mockAxios.history[method];
      expect(requestHistory.length).toBe(12);

      expect(requestHistory[0].url).toBe("http://node0:8108/");
      expect(requestHistory[1].url).toBe("http://node1:7108/");
      expect(requestHistory[2].url).toBe("http://node2:9108/");

      expect(requestHistory[3].url).toBe("http://node2:9108/");

      expect(requestHistory[4].url).toBe("http://node2:9108/");

      expect(requestHistory[5].url).toBe("http://node2:9108/");

      expect(requestHistory[6].url).toBe("http://node0:8108/");
      expect(requestHistory[7].url).toBe("http://node1:7108/");
      expect(requestHistory[8].url).toBe("http://node2:9108/");

      expect(requestHistory[9].url).toBe("http://node0:8108/");

      timekeeper.reset();
    });

    describe("when a nearestNode is specified", () => {
      let nearestNodeTypesense: TypesenseClient;
      let nearestNodeMockAxios: MockAxiosAdapter;
      let nearestNodeApiCall: ApiCall;

      beforeEach(() => {
        nearestNodeTypesense = new TypesenseClient({
          nearestNode: {
            host: "nearestNode",
            port: 6108,
            protocol: "http",
          },
          nodes: [
            {
              host: "node0",
              port: 8108,
              protocol: "http",
            },
            {
              host: "node1",
              port: 7108,
              protocol: "http",
            },
            {
              host: "node2",
              port: 9108,
              protocol: "http",
            },
          ],
          apiKey: "abcd",
          randomizeNodes: false,
          logLevel: "error",
          retryIntervalSeconds: 0.001,
        });
        nearestNodeMockAxios = new MockAxiosAdapter(axios);
        nearestNodeApiCall = new ApiCall(nearestNodeTypesense.configuration);
      });

      it("uses the nearestNode if it is present and healthy, otherwise fallsback to regular nodes", async () => {
        nearestNodeMockAxios
          .onAny(
            nearestNodeApiCall.uriFor(
              "/",
              nearestNodeTypesense.configuration.nearestNode,
            ),
          )
          .timeout();
        nearestNodeMockAxios
          .onAny(
            nearestNodeApiCall.uriFor(
              "/",
              nearestNodeTypesense.configuration.nodes[0],
            ),
          )
          .timeout();
        nearestNodeMockAxios
          .onAny(
            nearestNodeApiCall.uriFor(
              "/",
              nearestNodeTypesense.configuration.nodes[1],
            ),
          )
          .timeout();
        nearestNodeMockAxios
          .onAny(
            nearestNodeApiCall.uriFor(
              "/",
              nearestNodeTypesense.configuration.nodes[2],
            ),
          )
          .reply(200, JSON.stringify({ message: "Success" }), {
            "content-type": "application/json",
          });

        const currentTime = Date.now();
        timekeeper.freeze(currentTime);
        await nearestNodeApiCall[method]("/"); // Node nearestNode, Node 0 and Node 1 are marked as unhealthy after this, request should have been made to Node 2
        await nearestNodeApiCall[method]("/"); // Request should have been made to Node 2
        await nearestNodeApiCall[method]("/"); // Request should have been made to Node 2

        timekeeper.freeze(currentTime + 5 * 1000);
        await nearestNodeApiCall[method]("/"); // Request should have been made to Node 2

        timekeeper.freeze(currentTime + 65 * 1000);
        await nearestNodeApiCall[method]("/"); // Request should have been attempted to nearestNode, Node 0 and Node 1, but finally made to Node 2 (since disributedSearchNode, Node 0 and Node 1 are still unhealthy, though they were added back into rotation after the threshold)
        // Remove first mock, to let request to nearestNode succeed
        nearestNodeMockAxios.resetHandlers();
        nearestNodeMockAxios
          .onAny(
            nearestNodeApiCall.uriFor(
              "/",
              nearestNodeTypesense.configuration.nearestNode,
            ),
          )
          .reply(200, JSON.stringify({ message: "Success" }), {
            "content-type": "application/json",
          });

        timekeeper.freeze(currentTime + 185 * 1000);
        await nearestNodeApiCall[method]("/"); // Request should have been made to nearestNode, since it is now healthy and the unhealthy threshold was exceeded
        await nearestNodeApiCall[method]("/"); // Request should have been made to nearestNode, since no roundrobin if it is present and healthy
        await nearestNodeApiCall[method]("/"); // Request should have been made to nearestNode, since no roundrobin if it is present and healthy

        const requestHistory = nearestNodeMockAxios.history[method];
        expect(requestHistory.length).toBe(14);

        expect(requestHistory[0].url).toBe("http://nearestNode:6108/");
        expect(requestHistory[1].url).toBe("http://node0:8108/");
        expect(requestHistory[2].url).toBe("http://node1:7108/");
        expect(requestHistory[3].url).toBe("http://node2:9108/");

        expect(requestHistory[4].url).toBe("http://node2:9108/");

        expect(requestHistory[5].url).toBe("http://node2:9108/");

        expect(requestHistory[6].url).toBe("http://node2:9108/");

        expect(requestHistory[7].url).toBe("http://nearestNode:6108/");
        expect(requestHistory[8].url).toBe("http://node0:8108/");
        expect(requestHistory[9].url).toBe("http://node1:7108/");
        expect(requestHistory[10].url).toBe("http://node2:9108/");

        expect(requestHistory[11].url).toBe("http://nearestNode:6108/");

        expect(requestHistory[12].url).toBe("http://nearestNode:6108/");

        expect(requestHistory[13].url).toBe("http://nearestNode:6108/");

        timekeeper.reset();
      });

      it("raises an error when no nodes are healthy", async () => {
        nearestNodeMockAxios
          .onAny(
            nearestNodeApiCall.uriFor(
              "/",
              nearestNodeTypesense.configuration.nearestNode,
            ),
          )
          .reply(500, JSON.stringify({ message: "Error message" }), {
            "content-type": "application/json",
          });
        nearestNodeMockAxios
          .onAny(
            nearestNodeApiCall.uriFor(
              "/",
              nearestNodeTypesense.configuration.nodes[0],
            ),
          )
          .reply(500, JSON.stringify({ message: "Error message" }), {
            "content-type": "application/json",
          });
        nearestNodeMockAxios
          .onAny(
            nearestNodeApiCall.uriFor(
              "/",
              nearestNodeTypesense.configuration.nodes[1],
            ),
          )
          .reply(500, JSON.stringify({ message: "Error message" }), {
            "content-type": "application/json",
          });
        nearestNodeMockAxios
          .onAny(
            nearestNodeApiCall.uriFor(
              "/",
              nearestNodeTypesense.configuration.nodes[2],
            ),
          )
          .reply(500, JSON.stringify({ message: "Error message" }), {
            "content-type": "application/json",
          });

        await expect(nearestNodeApiCall[method]("/")).rejects.toThrow(
          "Request failed with HTTP code 500 | Server said: Error message",
        );
        const requestHistory = nearestNodeMockAxios.history[method];
        expect(requestHistory.length).toBe(5);
        expect(requestHistory[0].url).toBe("http://nearestNode:6108/");
        expect(requestHistory[1].url).toBe("http://node0:8108/");
        expect(requestHistory[2].url).toBe("http://node1:7108/");
        expect(requestHistory[3].url).toBe("http://node2:9108/");
        expect(requestHistory[4].url).toBe("http://node0:8108/");
      });
    });
  };
};

describe("ApiCall", () => {
  describe("Method Calls", () => {
    describe(".post", () => {
      createSharedNodeSelectionBehavior("post")();
    });

    describe(".put", () => {
      createSharedNodeSelectionBehavior("put")();
    });

    describe(".get", () => {
      createSharedNodeSelectionBehavior("get")();
    });

    describe(".delete", () => {
      createSharedNodeSelectionBehavior("delete")();
    });
  });

  describe("URL Construction", () => {
    it("constructs the URL based on the node params", () => {
      const client = new TypesenseClient({
        nodes: [
          {
            url: "https://node0/path",
          },
        ],
        apiKey: "abcd",
        randomizeNodes: false,
      });

      const apiCall = new ApiCall(client.configuration);

      expect(
        apiCall.uriFor("/collections", client.configuration.nodes[0]),
      ).toBe("https://node0/path/collections");
    });
  });

  describe("Custom Headers", () => {
    it("passes on additional user-provided headers in the request", async () => {
      const client = new TypesenseClient({
        nodes: [
          {
            url: "https://node0/path",
          },
        ],
        apiKey: "abcd",
        randomizeNodes: false,
        additionalHeaders: {
          "x-header-name": "value",
        },
      });

      const mockAxios = new MockAxiosAdapter(axios);
      const apiCall = new ApiCall(client.configuration);

      mockAxios
        .onGet("https://node0/path/collections", "", {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
          "X-TYPESENSE-API-KEY": client.configuration.apiKey,
          "x-header-name": "value",
        })
        .reply(200, JSON.stringify({}), { "content-type": "application/json" });

      // Will error out if request doesn't match the stub
      await apiCall.get("/collections", {});
    });
  });

  describe("Abort Signal Behavior", () => {
    let typesense: TypesenseClient;
    let mockAxios: MockAxiosAdapter;
    let apiCall: ApiCall;

    beforeEach(() => {
      typesense = new TypesenseClient({
        nodes: [
          {
            host: "node0",
            port: 8108,
            protocol: "http",
          },
          {
            host: "node1",
            port: 7108,
            protocol: "http",
          },
          {
            host: "node2",
            port: 9108,
            protocol: "http",
          },
        ],
        apiKey: "abcd",
        randomizeNodes: false,
        logLevel: "error",
        retryIntervalSeconds: 0.001,
      });
      mockAxios = new MockAxiosAdapter(axios);
      apiCall = new ApiCall(typesense.configuration);
    });

    afterEach(() => {
      mockAxios.reset();
    });

    it("aborts request without marking node as unhealthy", async () => {
      const controller = new AbortController();

      // First request fails immediately
      mockAxios
        .onAny(apiCall.uriFor("/", typesense.configuration.nodes[0]))
        .reply(500, JSON.stringify({ message: "Server Error" }), {
          "content-type": "application/json",
        });

      // Second request has a delay to allow for abort
      mockAxios
        .onAny(apiCall.uriFor("/", typesense.configuration.nodes[1]))
        .reply(200, JSON.stringify({ message: "Success" }), {
          "content-type": "application/json",
        });

      // Abort immediately
      controller.abort();

      await expect(
        apiCall.get("/", {}, { abortSignal: controller.signal }),
      ).rejects.toThrow("Request aborted by caller.");

      // Reset mocks for next request
      mockAxios.reset();

      // Next request should succeed
      mockAxios
        .onAny(apiCall.uriFor("/", typesense.configuration.nodes[1]))
        .reply(200, JSON.stringify({ message: "Success" }), {
          "content-type": "application/json",
        });

      await apiCall.get("/");

      const requestHistory = mockAxios.history.get;
      expect(requestHistory.length).toBe(1);
      expect(requestHistory[0].url).toBe("http://node1:7108/");
    });

    it("keeps track of healthy nodes when some requests are aborted", async () => {
      const controller = new AbortController();

      // First node fails
      mockAxios
        .onAny(apiCall.uriFor("/", typesense.configuration.nodes[0]))
        .reply(500, JSON.stringify({ message: "Server Error" }), {
          "content-type": "application/json",
        });

      // Second node has a delayed response that will be aborted
      mockAxios
        .onAny(apiCall.uriFor("/", typesense.configuration.nodes[1]))
        .reply(200, JSON.stringify({ message: "Success" }), {
          "content-type": "application/json",
        });

      controller.abort();

      await expect(
        apiCall.get("/", {}, { abortSignal: controller.signal }),
      ).rejects.toThrow("Request aborted by caller.");

      mockAxios.reset();
      mockAxios
        .onAny(apiCall.uriFor("/", typesense.configuration.nodes[1]))
        .reply(200, JSON.stringify({ message: "Success" }), {
          "content-type": "application/json",
        });

      await apiCall.get("/");

      const requestHistory = mockAxios.history.get;
      expect(requestHistory.length).toBe(1);
      expect(requestHistory[0].url).toBe("http://node1:7108/");
    });
  });
});
