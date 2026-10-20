import { createRequire } from "node:module";
import { Readable } from "node:stream";
import type { ReadStream } from "node:fs";
import { getGlobalDispatcher, setGlobalDispatcher, MockAgent } from "undici";
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
    const { Client: ClientClass, Errors: ErrorsModule } = typesense;
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
  },
);
