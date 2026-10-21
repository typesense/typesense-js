import { createRequire } from "node:module";
import { Readable } from "node:stream";
import type { ReadStream } from "node:fs";
import type { TypesenseRequest } from "../src/Typesense/Transport";
import { getGlobalDispatcher, setGlobalDispatcher, MockAgent } from "undici";
import loglevel from "loglevel";
import { afterEach, describe, expect, it, vi } from "vitest";
import Transport from "../src/Typesense/Transport";
import ApiCall from "../src/Typesense/ApiCall";
import * as sourcePackage from "../src/Typesense";

// Use Node's loader so Vitest cannot transpile away ES5 subclassing bugs.
const require = createRequire(import.meta.url);
const compiledTransport = require("../lib/Typesense/Transport");
const compiledClient = require("../lib/Typesense");
const compiledApiCall = require("../lib/Typesense/ApiCall");

const request = {
  method: "get" as const,
  url: "http://localhost/health",
  headers: {},
  queryParameters: {},
};
const requestOptions = { requestNumber: 1, attemptNumber: 1, nodeIndex: 0 };

describe.each([
  ["source", Transport, sourcePackage, ApiCall],
  [
    "compiled package",
    compiledTransport.default,
    compiledClient as typeof sourcePackage,
    compiledApiCall.default,
  ],
] as const)(
  "Transport (%s)",
  (_name, TransportClass, typesense, ApiCallClass) => {
    const {
      Client: ClientClass,
      SearchClient: SearchClientClass,
      Errors: ErrorsModule,
    } = typesense;
    const ErrorClass = ErrorsModule.FetchTransportError;
    afterEach(() => vi.useRealTimers());

    it("preserves the error prototype", () => {
      expect(new ErrorClass("abort", "cancelled")).toBeInstanceOf(ErrorClass);
    });

    it("preserves bracketed array parameters and supports serializer objects", async () => {
      const customFetch = vi.fn<typeof fetch>(async () => new Response("ok"));
      const transport = new TransportClass({
        fetch: customFetch,
        connectionTimeoutSeconds: 1,
      });
      await transport.perform(
        {
          ...request,
          queryParameters: {
            key: ["a", "b", null],
            q: "hello world",
            omitted: undefined,
          },
        },
        requestOptions,
      );
      const query = new URL(String(customFetch.mock.calls[0][0])).searchParams;
      expect(query.getAll("key[]")).toEqual(["a", "b"]);
      expect(query.get("q")).toBe("hello world");
      expect(query.has("omitted")).toBe(false);

      const serialize = vi.fn(() => "key[0]=a&key[1]=b");
      const custom = new TransportClass({
        fetch: customFetch,
        paramsSerializer: { serialize },
        connectionTimeoutSeconds: 1,
      });
      await custom.perform(
        { ...request, queryParameters: { key: ["a", "b"] } },
        requestOptions,
      );
      expect(customFetch.mock.calls[1][0]).toBe(
        "http://localhost/health?key[0]=a&key[1]=b",
      );
      expect(serialize).toHaveBeenCalledWith({ key: ["a", "b"] });
    });

    it.each(["headers", "body"])(
      "does not retry or mark a node unhealthy when aborted during %s",
      async (phase) => {
        const abort = new AbortController();
        let started!: () => void;
        const ready = new Promise<void>((resolve) => {
          started = resolve;
        });
        const customFetch = vi.fn<typeof fetch>((_url, init) => {
          if (phase === "headers") {
            return new Promise<Response>((_resolve, reject) => {
              init!.signal!.addEventListener("abort", () =>
                reject(new Error("aborted")),
              );
              started();
            });
          }
          return Promise.resolve(
            new Response(
              new ReadableStream({
                start(controller) {
                  init!.signal!.addEventListener("abort", () =>
                    controller.error(new Error("aborted")),
                  );
                  started();
                },
              }),
            ),
          );
        });
        const errorHook = vi.fn();
        const client = new ClientClass({
          nodes: [{ url: "http://localhost" }],
          apiKey: "xyz",
          fetch: customFetch,
          numRetries: 2,
          retryIntervalSeconds: 0.001,
          logLevel: "silent",
          errorHooks: [errorHook],
        });
        const api = new ApiCallClass(client.configuration);
        const health = vi.spyOn(api, "setNodeHealthcheck");
        const result = api.get("/health", {}, { abortSignal: abort.signal });
        const rejected = expect(result).rejects.toThrow(
          "Request aborted by caller.",
        );
        await ready;
        await Promise.resolve();
        abort.abort();
        await rejected;
        expect(customFetch).toHaveBeenCalledOnce();
        expect(health).not.toHaveBeenCalledWith(expect.anything(), false);
        expect(errorHook).toHaveBeenCalledWith(
          expect.any(Error),
          expect.objectContaining({ errorType: "abort" }),
        );
      },
    );

    it("reads responses from fetch implementations without body streams", async () => {
      // React Native's fetch polyfill returns responses without `body`
      const withoutBodyStream = (response: Response) =>
        new Proxy(response, {
          get: (target, key) => {
            if (key === "body") return undefined;
            const value = Reflect.get(target, key, target);
            return typeof value === "function" ? value.bind(target) : value;
          },
        });
      const customFetch = vi.fn<typeof fetch>(async (url) => {
        const { pathname } = new URL(String(url));
        if (pathname.endsWith("/export")) {
          return withoutBodyStream(new Response('{"id":"1"}'));
        }
        if (pathname.endsWith("/search")) {
          return withoutBodyStream(
            new Response(
              'data: {"conversation_id":"1","message":"hi"}\n\n{"found":1,"hits":[]}',
              { headers: { "content-type": "text/event-stream" } },
            ),
          );
        }
        return withoutBodyStream(Response.json({ found: 1, hits: [] }));
      });
      const client = new ClientClass({
        nodes: [{ url: "http://localhost" }],
        apiKey: "xyz",
        fetch: customFetch,
        logLevel: "silent",
      });

      await expect(client.collections("books").retrieve()).resolves.toEqual({
        found: 1,
        hits: [],
      });
      const onComplete = vi.fn();
      await expect(
        client.collections("books").documents().search({
          q: "hi",
          conversation: true,
          conversation_stream: true,
          streamConfig: { onComplete },
        }),
      ).resolves.toMatchObject({ found: 1 });
      expect(onComplete).toHaveBeenCalledOnce();
      await expect(
        client.collections("books").documents().exportStream(),
      ).resolves.toBeNull();
    });

    function responseFixture() {
      let source!: ReadableStreamDefaultController<Uint8Array>;
      let signal!: AbortSignal;
      const cancel = vi.fn();
      const customFetch = vi.fn<typeof fetch>((_url, init) => {
        signal = init!.signal!;
        return Promise.resolve(
          new Response(
            new ReadableStream<Uint8Array>({
              start(controller) {
                source = controller;
                signal.addEventListener("abort", () =>
                  controller.error(new Error("aborted")),
                );
              },
              cancel,
            }),
          ),
        );
      });
      const errorHook = vi.fn();
      const transport = new TransportClass({
        fetch: customFetch,
        connectionTimeoutSeconds: 0.05,
        errorHooks: [errorHook],
      });
      return {
        transport,
        errorHook,
        cancel,
        get source() {
          return source;
        },
        get signal() {
          return signal;
        },
      };
    }

    it("classifies timeouts during body consumption", async () => {
      vi.useFakeTimers();
      const fixture = responseFixture();
      const result = fixture.transport
        .perform(request, requestOptions)
        .catch((error: unknown) => error);
      await vi.advanceTimersByTimeAsync(51);
      expect(await result).toMatchObject({ type: "timeout" });
    });

    it("classifies body transport failures separately from invalid JSON", async () => {
      const fixture = responseFixture();
      const result = fixture.transport.perform(request, requestOptions);
      const rejected = expect(result).rejects.toMatchObject({
        type: "network",
      });
      await Promise.resolve();
      await Promise.resolve();
      fixture.source.error(new Error("connection reset"));
      await rejected;
      const transport = new TransportClass({
        fetch: async () =>
          new Response("{", {
            headers: { "content-type": "application/json" },
          }),
        connectionTimeoutSeconds: 1,
      });
      await expect(
        transport.perform(request, requestOptions),
      ).rejects.toMatchObject({ type: "parse" });
    });

    it("times out a stalled stream after headers", async () => {
      vi.useFakeTimers();
      const fixture = responseFixture();
      const response = await fixture.transport.perform(
        { ...request, responseType: "stream" },
        requestOptions,
      );
      await vi.advanceTimersByTimeAsync(51);
      expect(fixture.signal.aborted).toBe(true);
      await expect(response.data.getReader().read()).rejects.toMatchObject({
        type: "timeout",
      });
      expect(fixture.errorHook).toHaveBeenCalledOnce();
      expect(vi.getTimerCount()).toBe(0);
    });

    it("resets the Node stream timeout on activity and cleans up at EOF", async () => {
      vi.useFakeTimers();
      const fixture = responseFixture();
      const abort = new AbortController();
      const response = await fixture.transport.perform(
        { ...request, responseType: "stream" },
        { ...requestOptions, abortSignal: abort.signal },
      );
      const reader = response.data.getReader();
      for (let i = 0; i < 5; i++) {
        await vi.advanceTimersByTimeAsync(40);
        fixture.source.enqueue(new Uint8Array([i]));
        await expect(reader.read()).resolves.toMatchObject({ done: false });
        expect(fixture.signal.aborted).toBe(false);
      }
      fixture.source.close();
      await expect(reader.read()).resolves.toMatchObject({ done: true });
      expect(vi.getTimerCount()).toBe(0);
      abort.abort();
      expect(fixture.signal.aborted).toBe(false);
    });

    it("retains caller cancellation after headers and cleans up on stream cancellation", async () => {
      vi.useFakeTimers();
      const fixture = responseFixture();
      const abort = new AbortController();
      const response = await fixture.transport.perform(
        { ...request, responseType: "stream" },
        { ...requestOptions, abortSignal: abort.signal },
      );
      abort.abort();
      expect(fixture.signal.aborted).toBe(true);
      await expect(response.data.getReader().read()).rejects.toMatchObject({
        type: "abort",
      });
      expect(vi.getTimerCount()).toBe(0);

      const cancelled = responseFixture();
      const other = await cancelled.transport.perform(
        { ...request, responseType: "stream" },
        requestOptions,
      );
      await other.data.cancel();
      expect(cancelled.cancel).toHaveBeenCalledOnce();
      expect(vi.getTimerCount()).toBe(0);
    });

    it.each(["custom", "global"])(
      "disables Undici header/body timeouts for both import APIs with a %s dispatcher",
      async (mode) => {
        const original = getGlobalDispatcher();
        const agent = new MockAgent();
        agent.disableNetConnect();
        const dispatch = vi.spyOn(agent, "dispatch");
        if (mode === "global") setGlobalDispatcher(agent);
        const client = new ClientClass({
          nodes: [{ url: "http://localhost" }],
          apiKey: "xyz",
          numRetries: 0,
          ...(mode === "custom" ? { dispatcher: agent } : {}),
        });
        try {
          const pool = agent.get("http://localhost");
          pool
            .intercept({
              path: /\/collections\/books\/documents\/import/,
              method: "POST",
            })
            .reply(200, '{"success":true}')
            .times(2);
          await expect(
            client
              .collections("books")
              .documents()
              .import([{ id: "1" }]),
          ).resolves.toEqual([{ success: true }]);
          await expect(
            client
              .collections("books")
              .documents()
              .importStream(Readable.from(['{"id":"2"}']) as ReadStream),
          ).resolves.toEqual([{ success: true }]);
          expect(dispatch).toHaveBeenCalledTimes(2);
          for (const [options] of dispatch.mock.calls) {
            expect(options).toMatchObject({
              headersTimeout: 0,
              bodyTimeout: 0,
            });
          }
          pool.intercept({ path: "/health" }).reply(200, "ok");
          await new TransportClass({
            dispatcher: agent,
            connectionTimeoutSeconds: 1,
          }).perform(request, requestOptions);
          expect(dispatch.mock.calls[2][0].headersTimeout).not.toBe(0);
        } finally {
          setGlobalDispatcher(original);
          await agent.close();
        }
      },
    );

    function clientWith(
      customFetch: typeof fetch,
      options: Record<string, unknown> = {},
    ) {
      const client = new ClientClass({
        nodes: [{ url: "http://node0" }, { url: "http://node1" }],
        apiKey: "xyz",
        fetch: customFetch,
        numRetries: 2,
        retryIntervalSeconds: 0.001,
        randomizeNodes: false,
        logLevel: "silent",
        ...options,
      });
      const health = vi.spyOn(client.apiCall, "setNodeHealthcheck");
      const unhealthy = () =>
        health.mock.calls.filter(([, isHealthy]) => isHealthy === false);
      return { client, health, unhealthy };
    }

    it("sends Content-Type only when the request has a body", async () => {
      const customFetch = vi.fn<typeof fetch>(async () => Response.json({}));
      const { client } = clientWith(customFetch, {
        additionalHeaders: { "content-type": "application/json" },
      });
      await client.apiCall.get("/collections");
      await client.apiCall.delete("/collections/books");
      await client.apiCall.post("/collections", { name: "books" });
      await client.apiCall.post("/collections", []);
      const sent = customFetch.mock.calls.map(([, init]) => ({
        contentType: new Headers(init!.headers).get("content-type"),
        body: init!.body,
      }));
      expect(sent).toEqual([
        { contentType: null, body: undefined },
        { contentType: null, body: undefined },
        { contentType: "application/json", body: '{"name":"books"}' },
        { contentType: null, body: undefined },
      ]);
    });

    it("sends a browser search as a CORS simple request", async () => {
      const customFetch = vi.fn<typeof fetch>(async () =>
        Response.json({ hits: [] }),
      );
      const client = new SearchClientClass({
        nodes: [{ url: "http://node0" }],
        apiKey: "xyz",
        fetch: customFetch,
        logLevel: "silent",
      });
      await client.collections("books").documents().search({ q: "a" }, {});
      const [url, init] = customFetch.mock.calls[0];
      expect(new URL(String(url)).searchParams.get("x-typesense-api-key")).toBe(
        "xyz",
      );
      expect(init!.method).toBe("GET");
      expect([...new Headers(init!.headers).keys()]).toEqual(["accept"]);
    });

    it.each([
      ["Buffer", Buffer.from('{"id":"1"}\n{"id":"2"}')],
      ["Uint8Array", new TextEncoder().encode('{"id":"1"}\n{"id":"2"}')],
      [
        "ArrayBuffer",
        new TextEncoder().encode('{"id":"1"}\n{"id":"2"}').buffer,
      ],
    ])("sends a %s body as raw bytes", async (_type, body) => {
      const customFetch = vi.fn<typeof fetch>(
        async () => new Response('{"success":true}\n{"success":true}'),
      );
      const { client } = clientWith(customFetch);
      await expect(
        client
          .collections("books")
          .documents()
          .import(body as never),
      ).resolves.toBe('{"success":true}\n{"success":true}');
      const init = customFetch.mock.calls[0][1]!;
      expect(await new Response(init.body).text()).toBe(
        '{"id":"1"}\n{"id":"2"}',
      );
    });

    it("sets httpBody to the request body as it was passed in", async () => {
      const customFetch = vi.fn<typeof fetch>(async () =>
        Response.json({ message: "Bad" }, { status: 400 }),
      );
      const { client } = clientWith(customFetch);
      const stream = Readable.from(['{"id":"1"}']) as ReadStream;
      const failures = await Promise.all(
        [
          client.apiCall.post("/collections", { name: "books" }),
          client.apiCall.post("/collections", "raw"),
          client.collections("books").documents().importStream(stream),
          client.apiCall.get("/collections"),
        ].map((result) => result.catch((caught: unknown) => caught)),
      );
      expect(
        failures.map((failure) => (failure as { httpBody?: unknown }).httpBody),
      ).toEqual([{ name: "books" }, "raw", stream, undefined]);
    });

    it("does not retry a stream body that cannot be replayed", async () => {
      const customFetch = vi.fn<typeof fetch>(async () =>
        Response.json({ message: "Unavailable" }, { status: 503 }),
      );
      const { client } = clientWith(customFetch);
      const error = await client
        .collections("books")
        .documents()
        .importStream(Readable.from(['{"id":"1"}']) as ReadStream)
        .catch((caught: unknown) => caught);
      expect(error).toBeInstanceOf(ErrorsModule.ServerError);
      expect(error).toMatchObject({ httpStatus: 503 });
      expect(customFetch).toHaveBeenCalledOnce();
    });

    it.each([
      [
        "server",
        async () => Response.json({ message: "Unavailable" }, { status: 503 }),
      ],
      [
        "network",
        async () => {
          throw new TypeError("fetch failed");
        },
      ],
    ])(
      "does not retry a stream body set by a requestHook after a %s error",
      async (_failure, failingFetch) => {
        const customFetch = vi.fn<typeof fetch>(failingFetch);
        const stream = Readable.from(['{"id":"1"}']);
        const { client } = clientWith(customFetch, {
          requestHooks: [
            (sent: TypesenseRequest) => {
              sent.body = stream;
            },
          ],
        });
        await expect(
          client.apiCall.post("/collections/books/documents/import", "x"),
        ).rejects.toThrow();
        expect(customFetch).toHaveBeenCalledOnce();
      },
    );

    it("reports the underlying cause of network errors", async () => {
      const cases = [
        [
          Object.assign(new Error("connect ECONNREFUSED 127.0.0.1:1"), {
            code: "ECONNREFUSED",
          }),
          "connect ECONNREFUSED 127.0.0.1:1",
          "ECONNREFUSED",
        ],
        [
          Object.assign(
            new AggregateError(
              [
                Object.assign(new Error("connect ECONNREFUSED ::1:1"), {
                  code: "ECONNREFUSED",
                }),
              ],
              "",
            ),
            { code: "ECONNREFUSED" },
          ),
          "connect ECONNREFUSED ::1:1",
          "ECONNREFUSED",
        ],
        [
          Object.assign(new Error("Headers Timeout Error"), {
            code: "UND_ERR_HEADERS_TIMEOUT",
          }),
          "Headers Timeout Error",
          "UND_ERR_HEADERS_TIMEOUT",
        ],
      ] as const;
      for (const [cause, message, code] of cases) {
        const failure = Object.assign(new TypeError("fetch failed"), { cause });
        const transport = new TransportClass({
          fetch: async () => {
            throw failure;
          },
          connectionTimeoutSeconds: 1,
        });
        const error = await transport
          .perform(request, requestOptions)
          .catch((caught: unknown) => caught);
        expect(error).toBeInstanceOf(ErrorClass);
        expect(error).toMatchObject({
          type: "network",
          message,
          code,
          originalError: failure,
        });
      }
    });

    describe("hook failures", () => {
      it("rejects a throwing requestHook without sending, retrying or touching node health", async () => {
        const customFetch = vi.fn<typeof fetch>(async () => Response.json({}));
        const errorHook = vi.fn();
        const { client, health } = clientWith(customFetch, {
          requestHooks: [
            async () => {
              throw new Error("no token");
            },
          ],
          errorHooks: [errorHook],
        });
        const error = await client.apiCall
          .get("/health")
          .catch((caught: unknown) => caught);
        expect(error).toBeInstanceOf(ErrorClass);
        expect(error).toMatchObject({ type: "hook", message: "no token" });
        expect(customFetch).not.toHaveBeenCalled();
        expect(health).not.toHaveBeenCalled();
        expect(errorHook).not.toHaveBeenCalled();
      });

      it("rejects a throwing responseHook without repeating the write", async () => {
        const customFetch = vi.fn<typeof fetch>(async () =>
          Response.json({ id: "1" }),
        );
        const { client, health } = clientWith(customFetch, {
          responseHooks: [
            () => {
              throw new Error("bad hook");
            },
          ],
        });
        const error = await client
          .collections("books")
          .documents()
          .create({ id: "1" })
          .catch((caught: unknown) => caught);
        expect(error).toBeInstanceOf(ErrorClass);
        expect(error).toMatchObject({ type: "hook", message: "bad hook" });
        expect(customFetch).toHaveBeenCalledOnce();
        expect(health).not.toHaveBeenCalled();
      });

      it("keeps the HTTP error when an errorHook throws", async () => {
        const customFetch = vi.fn<typeof fetch>(async () =>
          Response.json({ message: "Not Found" }, { status: 404 }),
        );
        const nextHook = vi.fn();
        const { client, unhealthy } = clientWith(customFetch, {
          logger: loglevel.getLogger(`hooks-${_name}`),
          errorHooks: [
            () => {
              throw new Error("hook failed");
            },
            nextHook,
          ],
        });
        const warn = vi.spyOn(client.apiCall.logger, "warn");
        const error = await client.apiCall
          .get("/collections/books")
          .catch((caught: unknown) => caught);
        expect(error).toBeInstanceOf(ErrorsModule.ObjectNotFound);
        expect(customFetch).toHaveBeenCalledOnce();
        expect(unhealthy()).toEqual([]);
        expect(nextHook).toHaveBeenCalledOnce();
        expect(warn).toHaveBeenCalledWith(
          expect.stringContaining("hook failed"),
        );
      });

      it("keeps retrying server errors when an errorHook throws", async () => {
        const customFetch = vi.fn<typeof fetch>(async () =>
          Response.json({ message: "Unavailable" }, { status: 503 }),
        );
        const errorHook = vi.fn(() => {
          throw new Error("hook failed");
        });
        const { client } = clientWith(customFetch, {
          errorHooks: [errorHook],
        });
        await expect(client.apiCall.get("/health")).rejects.toBeInstanceOf(
          ErrorsModule.ServerError,
        );
        expect(customFetch).toHaveBeenCalledTimes(3);
        expect(errorHook).toHaveBeenCalledTimes(3);
      });

      it("keeps node health untouched when an errorHook throws after a caller abort", async () => {
        const abort = new AbortController();
        const customFetch = vi.fn<typeof fetch>(
          (_url, init) =>
            new Promise<Response>((_resolve, reject) => {
              init!.signal!.addEventListener("abort", () =>
                reject(new Error("aborted")),
              );
              queueMicrotask(() => abort.abort());
            }),
        );
        const { client, unhealthy } = clientWith(customFetch, {
          errorHooks: [
            () => {
              throw new Error("hook failed");
            },
          ],
        });
        await expect(
          client.apiCall.get("/health", {}, { abortSignal: abort.signal }),
        ).rejects.toThrow("Request aborted by caller.");
        expect(customFetch).toHaveBeenCalledOnce();
        expect(unhealthy()).toEqual([]);
      });
    });
  },
);
