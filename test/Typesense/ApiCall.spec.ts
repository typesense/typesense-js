import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { Client as TypesenseClient } from "../../src/Typesense";
import ApiCall from "../../src/Typesense/ApiCall";
import { ObjectUnprocessable } from "../../src/Typesense/Errors";
import timekeeper from "timekeeper";
import { createFetchMock, FetchMock } from "../fetchMock";

const createSharedNodeSelectionBehavior = (method: string) => {
  return () => {
    let typesense: TypesenseClient;
    let mockFetch: FetchMock;
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
      mockFetch = createFetchMock();
      apiCall = new ApiCall(typesense.configuration);
    });

    afterEach(() => {
      mockFetch.restore();
    });

    it("does not retry when HTTPStatus >= 300 and HTTPStatus < 500", async () => {
      mockFetch
        .onAny(apiCall.uriFor("/", typesense.configuration.nodes[0]))
        .reply(409, JSON.stringify({ message: "Already exists" }), {
          "content-type": "application/json",
        });
      mockFetch
        .onAny(apiCall.uriFor("/", typesense.configuration.nodes[1]))
        .reply(422, JSON.stringify({ message: "Unprocessable" }), {
          "content-type": "application/json",
        });
      mockFetch
        .onAny(apiCall.uriFor("/", typesense.configuration.nodes[2]))
        .reply(500, JSON.stringify({ message: "Error message" }), {
          "content-type": "application/json",
        });

      await expect(apiCall[method]("/")).rejects.toThrow(
        "Request failed with HTTP code 409 | Server said: Already exists",
      );
      await expect(apiCall[method]("/")).rejects.toThrow(ObjectUnprocessable);
      const requestHistory = mockFetch.history[method];
      expect(requestHistory.length).toBe(2);
      expect(requestHistory[0].url).toBe("http://node0:8108/");
      expect(requestHistory[1].url).toBe("http://node1:7108/");
    });

    it("raises an error when no nodes are healthy", async () => {
      mockFetch
        .onAny(apiCall.uriFor("/", typesense.configuration.nodes[0]))
        .reply(500, JSON.stringify({ message: "Error message" }), {
          "content-type": "application/json",
        });
      mockFetch
        .onAny(apiCall.uriFor("/", typesense.configuration.nodes[1]))
        .reply(500, JSON.stringify({ message: "Error message" }), {
          "content-type": "application/json",
        });
      mockFetch
        .onAny(apiCall.uriFor("/", typesense.configuration.nodes[2]))
        .reply(500, JSON.stringify({ message: "Error message" }), {
          "content-type": "application/json",
        });

      await expect(apiCall[method]("/")).rejects.toThrow(
        "Request failed with HTTP code 500 | Server said: Error message",
      );
      const requestHistory = mockFetch.history[method];
      expect(requestHistory.length).toBe(4);
      expect(requestHistory[0].url).toBe("http://node0:8108/");
      expect(requestHistory[1].url).toBe("http://node1:7108/");
      expect(requestHistory[2].url).toBe("http://node2:9108/");
      expect(requestHistory[3].url).toBe("http://node0:8108/");
    });

    it("selects the next available node when there is a connection timeout", async () => {
      mockFetch
        .onAny(apiCall.uriFor("/", typesense.configuration.nodes[0]))
        .timeout();
      mockFetch
        .onAny(apiCall.uriFor("/", typesense.configuration.nodes[1]))
        .timeout();
      mockFetch
        .onAny(apiCall.uriFor("/", typesense.configuration.nodes[2]))
        .reply(200, JSON.stringify({ message: "Success" }), {
          "content-type": "application/json",
        });

      const result = await apiCall[method]("/");
      expect(result).toEqual({
        message: "Success",
      });
      const requestHistory = mockFetch.history[method];
      expect(requestHistory.length).toBe(3);
      expect(requestHistory[0].url).toBe("http://node0:8108/");
      expect(requestHistory[1].url).toBe("http://node1:7108/");
      expect(requestHistory[2].url).toBe("http://node2:9108/");
    });

    it("removes unhealthy nodes out of rotation, until threshold", async () => {
      mockFetch
        .onAny(apiCall.uriFor("/", typesense.configuration.nodes[0]))
        .timeout();
      mockFetch
        .onAny(apiCall.uriFor("/", typesense.configuration.nodes[1]))
        .timeout();
      mockFetch
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
      mockFetch
        .onAny(apiCall.uriFor("/", typesense.configuration.nodes[0]))
        .reply(200, JSON.stringify({ message: "Success" }), {
          "content-type": "application/json",
        });

      timekeeper.freeze(currentTime + 185 * 1000);
      await apiCall[method]("/"); // Request should have been made to Node 0, since it is now healthy and the unhealthy threshold was exceeded

      const requestHistory = mockFetch.history[method];
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
      let nearestNodeMockFetch: FetchMock;
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
        nearestNodeMockFetch = createFetchMock();
        nearestNodeApiCall = new ApiCall(nearestNodeTypesense.configuration);
      });

      afterEach(() => {
        nearestNodeMockFetch.restore();
      });

      it("uses the nearestNode if it is present and healthy, otherwise fallsback to regular nodes", async () => {
        nearestNodeMockFetch
          .onAny(
            nearestNodeApiCall.uriFor(
              "/",
              nearestNodeTypesense.configuration.nearestNode,
            ),
          )
          .timeout();
        nearestNodeMockFetch
          .onAny(
            nearestNodeApiCall.uriFor(
              "/",
              nearestNodeTypesense.configuration.nodes[0],
            ),
          )
          .timeout();
        nearestNodeMockFetch
          .onAny(
            nearestNodeApiCall.uriFor(
              "/",
              nearestNodeTypesense.configuration.nodes[1],
            ),
          )
          .timeout();
        nearestNodeMockFetch
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
        nearestNodeMockFetch.resetHandlers();
        nearestNodeMockFetch
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

        const requestHistory = nearestNodeMockFetch.history[method];
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
        nearestNodeMockFetch
          .onAny(
            nearestNodeApiCall.uriFor(
              "/",
              nearestNodeTypesense.configuration.nearestNode,
            ),
          )
          .reply(500, JSON.stringify({ message: "Error message" }), {
            "content-type": "application/json",
          });
        nearestNodeMockFetch
          .onAny(
            nearestNodeApiCall.uriFor(
              "/",
              nearestNodeTypesense.configuration.nodes[0],
            ),
          )
          .reply(500, JSON.stringify({ message: "Error message" }), {
            "content-type": "application/json",
          });
        nearestNodeMockFetch
          .onAny(
            nearestNodeApiCall.uriFor(
              "/",
              nearestNodeTypesense.configuration.nodes[1],
            ),
          )
          .reply(500, JSON.stringify({ message: "Error message" }), {
            "content-type": "application/json",
          });
        nearestNodeMockFetch
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
        const requestHistory = nearestNodeMockFetch.history[method];
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

      const mockFetch = createFetchMock();
      const apiCall = new ApiCall(client.configuration);

      mockFetch.onGet("https://node0/path/collections").reply((config) => {
        expect(config.headers).toMatchObject({
          accept: "application/json, text/plain, */*",
          "content-type": "application/json",
          "x-typesense-api-key": client.configuration.apiKey,
          "x-header-name": "value",
        });
        return [200, {}, { "content-type": "application/json" }];
      });

      // Will error out if request doesn't match the stub
      try {
        await apiCall.get("/collections", {});
      } finally {
        mockFetch.restore();
      }
    });
  });

  describe("Fetch transport", () => {
    let mockFetch: FetchMock;

    const client = (options = {}) =>
      new TypesenseClient({
        nodes: [
          {
            host: "node0",
            port: 8108,
            protocol: "http",
          },
        ],
        apiKey: "abcd",
        randomizeNodes: false,
        logLevel: "error",
        numRetries: 0,
        ...options,
      });

    beforeEach(() => {
      mockFetch = createFetchMock();
    });

    afterEach(() => {
      vi.useRealTimers();
      mockFetch.restore();
    });

    it("sends the API key as a query parameter when configured", async () => {
      const typesense = client({ sendApiKeyAsQueryParam: true });
      const apiCall = new ApiCall(typesense.configuration);

      mockFetch.onGet("http://node0:8108/collections").reply((config) => {
        expect(config.params["x-typesense-api-key"]).toBe("abcd");
        expect(config.headers["x-typesense-api-key"]).toBeUndefined();
        return [200, {}];
      });

      await apiCall.get("/collections", {});
    });

    it("uses a custom params serializer", async () => {
      const paramsSerializer = vi.fn(() => "serialized=true");
      const typesense = client({ paramsSerializer });
      const apiCall = new ApiCall(typesense.configuration);

      mockFetch.onGet("http://node0:8108/collections").reply((config) => {
        expect(config.url).toBe(
          "http://node0:8108/collections?serialized=true",
        );
        return [200, {}];
      });

      await apiCall.get("/collections", { q: "hello world" });

      expect(paramsSerializer).toHaveBeenCalledWith({ q: "hello world" });
    });

    it("uses a custom fetch implementation", async () => {
      mockFetch.restore();
      const customFetch = vi.fn<typeof fetch>().mockResolvedValue(
        new Response(JSON.stringify({ ok: true }), {
          status: 200,
          headers: { "content-type": "application/json" },
        }),
      );
      const typesense = client({ fetch: customFetch });
      const apiCall = new ApiCall(typesense.configuration);

      await expect(apiCall.get("/health")).resolves.toEqual({ ok: true });
      expect(customFetch).toHaveBeenCalledOnce();
    });

    it("returns text and empty response bodies without JSON parsing", async () => {
      const typesense = client();
      const apiCall = new ApiCall(typesense.configuration);

      mockFetch
        .onGet("http://node0:8108/text")
        .reply(200, "plain text", { "content-type": "text/plain" });
      await expect(apiCall.get<string>("/text")).resolves.toBe("plain text");

      mockFetch.reset();
      mockFetch
        .onGet("http://node0:8108/empty")
        .reply(200, "", { "content-type": "application/json" });
      await expect(apiCall.get<string>("/empty")).resolves.toBe("");
    });

    it("handles non-JSON error bodies", async () => {
      const typesense = client();
      const apiCall = new ApiCall(typesense.configuration);

      mockFetch
        .onGet("http://node0:8108/collections")
        .reply(400, "bad request", { "content-type": "text/plain" });

      await expect(apiCall.get("/collections")).rejects.toThrow(
        "Request failed with HTTP code 400",
      );
    });

    it("runs request, response, and HTTP error hooks", async () => {
      const requestHook = vi.fn((request) => {
        request.headers["x-hook"] = "request";
        request.queryParameters["hook"] = "yes";
      });
      const responseHook = vi.fn();
      const errorHook = vi.fn();
      const typesense = client({
        requestHooks: [requestHook],
        responseHooks: [responseHook],
        errorHooks: [errorHook],
      });
      const apiCall = new ApiCall(typesense.configuration);

      mockFetch.onGet("http://node0:8108/collections").reply((config) => {
        expect(config.headers["x-hook"]).toBe("request");
        expect(config.params["hook"]).toBe("yes");
        return [200, { ok: true }];
      });

      await expect(apiCall.get("/collections")).resolves.toEqual({ ok: true });
      expect(requestHook).toHaveBeenCalledOnce();
      expect(responseHook).toHaveBeenCalledWith(
        expect.objectContaining({
          status: 200,
          data: { ok: true },
        }),
        expect.objectContaining({ attemptNumber: 1 }),
      );

      mockFetch.reset();
      mockFetch.onGet("http://node0:8108/collections").reply(503, {
        message: "Unavailable",
      });

      await expect(apiCall.get("/collections")).rejects.toThrow(
        "Request failed with HTTP code 503 | Server said: Unavailable",
      );
      expect(errorHook).toHaveBeenCalledWith(
        expect.any(Error),
        expect.objectContaining({ errorType: "http" }),
      );
    });

    it("classifies SDK timeouts separately from caller aborts", async () => {
      mockFetch.restore();
      const errorHook = vi.fn();
      const customFetch = vi.fn<typeof fetch>(
        (_url, init) =>
          new Promise<Response>((_resolve, reject) => {
            init?.signal?.addEventListener("abort", () => {
              reject(new Error("fetch aborted"));
            });
          }),
      );
      const typesense = client({
        connectionTimeoutSeconds: 0.001,
        fetch: customFetch,
        errorHooks: [errorHook],
      });
      const apiCall = new ApiCall(typesense.configuration);

      await expect(apiCall.get("/collections")).rejects.toThrow(
        "Request timed out after 0.001 seconds.",
      );
      expect(errorHook).toHaveBeenCalledWith(
        expect.any(Error),
        expect.objectContaining({ errorType: "timeout" }),
      );
    });
  });

  describe("Abort Signal Behavior", () => {
    let typesense: TypesenseClient;
    let mockFetch: FetchMock;
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
      mockFetch = createFetchMock();
      apiCall = new ApiCall(typesense.configuration);
    });

    afterEach(() => {
      mockFetch.restore();
    });

    it("aborts request without marking node as unhealthy", async () => {
      const controller = new AbortController();

      // First request fails immediately
      mockFetch
        .onAny(apiCall.uriFor("/", typesense.configuration.nodes[0]))
        .reply(500, JSON.stringify({ message: "Server Error" }), {
          "content-type": "application/json",
        });

      // Second request has a delay to allow for abort
      mockFetch
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
      mockFetch.reset();

      // Next request should succeed
      mockFetch
        .onAny(apiCall.uriFor("/", typesense.configuration.nodes[1]))
        .reply(200, JSON.stringify({ message: "Success" }), {
          "content-type": "application/json",
        });

      await apiCall.get("/");

      const requestHistory = mockFetch.history.get;
      expect(requestHistory.length).toBe(1);
      expect(requestHistory[0].url).toBe("http://node1:7108/");
    });

    it("keeps track of healthy nodes when some requests are aborted", async () => {
      const controller = new AbortController();

      // First node fails
      mockFetch
        .onAny(apiCall.uriFor("/", typesense.configuration.nodes[0]))
        .reply(500, JSON.stringify({ message: "Server Error" }), {
          "content-type": "application/json",
        });

      // Second node has a delayed response that will be aborted
      mockFetch
        .onAny(apiCall.uriFor("/", typesense.configuration.nodes[1]))
        .reply(200, JSON.stringify({ message: "Success" }), {
          "content-type": "application/json",
        });

      controller.abort();

      await expect(
        apiCall.get("/", {}, { abortSignal: controller.signal }),
      ).rejects.toThrow("Request aborted by caller.");

      mockFetch.reset();
      mockFetch
        .onAny(apiCall.uriFor("/", typesense.configuration.nodes[1]))
        .reply(200, JSON.stringify({ message: "Success" }), {
          "content-type": "application/json",
        });

      await apiCall.get("/");

      const requestHistory = mockFetch.history.get;
      expect(requestHistory.length).toBe(1);
      expect(requestHistory[0].url).toBe("http://node1:7108/");
    });
  });
});
