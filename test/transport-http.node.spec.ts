import { execFile } from "node:child_process";
import { createRequire } from "node:module";
import {
  createServer,
  IncomingMessage,
  Server,
  ServerResponse,
} from "node:http";
import { AddressInfo } from "node:net";
import { Readable } from "node:stream";
import { promisify } from "node:util";
import { afterEach, describe, expect, it } from "vitest";
import type { TypesenseResponse } from "../src/Typesense/Transport";

const require = createRequire(import.meta.url);
const { Client, Errors } = require("../lib/Typesense");
const Transport = require("../lib/Typesense/Transport").default;
const requestOptions = { requestNumber: 1, attemptNumber: 1, nodeIndex: 0 };

describe("Compiled transport over HTTP", () => {
  let server: Server;

  afterEach(async () => {
    if (!server) return;
    server.closeAllConnections();
    await new Promise<void>((resolve) => server.close(() => resolve()));
  });

  async function listen(
    handler: (response: ServerResponse, request: IncomingMessage) => void,
  ) {
    server = createServer((request, response) => handler(response, request));
    await new Promise<void>((resolve, reject) => {
      server.once("error", reject);
      server.listen(0, "127.0.0.1", resolve);
    });
    return `http://127.0.0.1:${(server.address() as AddressInfo).port}`;
  }

  it("rejects a stalled export after headers", async () => {
    const url = await listen((response) => response.flushHeaders());
    const client = new Client({
      nodes: [{ url }],
      apiKey: "xyz",
      connectionTimeoutSeconds: 0.1,
    });
    const stream = await client.collections("books").documents().exportStream();
    await expect(stream.toArray()).rejects.toMatchObject({ type: "timeout" });
  }, 3000);

  it("streams active exports beyond the timeout as a Node Readable", async () => {
    const url = await listen((response) => {
      response.flushHeaders();
      let count = 0;
      const timer = setInterval(() => {
        response.write('{"id":"' + count++ + '"}\n');
        if (count === 8) response.end();
      }, 30);
      response.on("close", () => clearInterval(timer));
    });
    const client = new Client({
      nodes: [{ url }],
      apiKey: "xyz",
      connectionTimeoutSeconds: 0.15,
    });
    const stream = await client.collections("books").documents().exportStream();
    expect(stream).toBeInstanceOf(Readable);
    let result = "";
    for await (const chunk of stream) result += chunk.toString();
    expect(result.trim().split("\n")).toHaveLength(8);
  }, 3000);

  it("classifies cancellation during a real body transfer", async () => {
    let started!: () => void;
    const headers = new Promise<void>((resolve) => {
      started = resolve;
    });
    const url = await listen((response) => {
      response.write("partial");
      started();
    });
    const transport = new Transport({ connectionTimeoutSeconds: 1 });
    const abort = new AbortController();
    const result = transport.perform(
      { method: "get", url, headers: {}, queryParameters: {} },
      { ...requestOptions, abortSignal: abort.signal },
    );
    const rejected = expect(result).rejects.toMatchObject({ type: "abort" });
    await headers;
    abort.abort();
    await rejected;
  }, 3000);

  it("closes the connection when a responseHook holding the stream's reader throws", async () => {
    let closed!: () => void;
    const connectionClosed = new Promise<void>((resolve) => {
      closed = resolve;
    });
    const url = await listen((response) => {
      response.write("partial");
      response.on("close", () => closed());
    });
    const transport = new Transport({
      connectionTimeoutSeconds: 1,
      responseHooks: [
        (response: TypesenseResponse) => {
          (response.data as ReadableStream<Uint8Array>).getReader();
          throw new Error("bad hook");
        },
      ],
    });
    await expect(
      transport.perform(
        {
          method: "get",
          url,
          headers: {},
          queryParameters: {},
          responseType: "stream",
        },
        requestOptions,
      ),
    ).rejects.toMatchObject({ type: "hook" });
    await connectionClosed;
  }, 3000);

  it("closes the connection when a responseHook holding the stream's reader turns its status into an error", async () => {
    let closed!: () => void;
    const connectionClosed = new Promise<void>((resolve) => {
      closed = resolve;
    });
    const url = await listen((response) => {
      response.write("partial");
      response.on("close", () => closed());
    });
    const client = new Client({
      nodes: [{ url }],
      apiKey: "xyz",
      connectionTimeoutSeconds: 1,
      numRetries: 0,
      logLevel: "silent",
      responseHooks: [
        (response: TypesenseResponse) => {
          (response.data as ReadableStream<Uint8Array>).getReader();
          response.status = 503;
        },
      ],
    });
    await expect(
      client.collections("books").documents().exportStream(),
    ).rejects.toBeInstanceOf(Errors.ServerError);
    await connectionClosed;
  }, 3000);

  it("allows an import to wait for headers beyond the configured timeout", async () => {
    const url = await listen((response) => {
      const timer = setTimeout(() => response.end('{"success":true}'), 150);
      response.on("close", () => clearTimeout(timer));
    });
    const client = new Client({
      nodes: [{ url }],
      apiKey: "xyz",
      connectionTimeoutSeconds: 0.05,
    });
    await expect(
      client
        .collections("books")
        .documents()
        .import([{ id: "1" }]),
    ).resolves.toEqual([{ success: true }]);
  }, 3000);

  async function recordingServer(
    respond: (response: ServerResponse) => void = (response) =>
      response.end('{"success":true}'),
  ) {
    const received: { headers: IncomingMessage["headers"]; body: string }[] =
      [];
    const url = await listen((response, request) => {
      const chunks: Buffer[] = [];
      request.on("data", (chunk) => chunks.push(chunk));
      request.on("end", () => {
        received.push({
          headers: request.headers,
          body: Buffer.concat(chunks).toString(),
        });
        respond(response);
      });
    });
    return { url, received };
  }

  it("sends Content-Type only with a body and Buffer bodies as bytes", async () => {
    const { url, received } = await recordingServer();
    const client = new Client({ nodes: [{ url }], apiKey: "xyz" });
    await client.collections("books").retrieve();
    await client
      .collections("books")
      .documents()
      .import(Buffer.from('{"id":"1"}'));
    expect(received[0].headers["content-type"]).toBeUndefined();
    expect(received[1].headers["content-type"]).toBe("text/plain");
    expect(received[1].body).toBe('{"id":"1"}');
  }, 3000);

  it("sends a stream import once when the server fails", async () => {
    const { url, received } = await recordingServer((response) => {
      response.writeHead(503, { "content-type": "application/json" });
      response.end('{"message":"Unavailable"}');
    });
    const client = new Client({
      nodes: [{ url }],
      apiKey: "xyz",
      numRetries: 2,
      retryIntervalSeconds: 0.001,
      logLevel: "silent",
    });
    await expect(
      client
        .collections("books")
        .documents()
        .importStream(Readable.from(['{"id":"1"}'])),
    ).rejects.toBeInstanceOf(Errors.ServerError);
    expect(received).toHaveLength(1);
    expect(received[0].body).toBe('{"id":"1"}');
  }, 3000);

  it("reports the socket error of a refused connection", async () => {
    const url = await listen(() => {});
    await new Promise<void>((resolve) => server.close(() => resolve()));
    const client = new Client({
      nodes: [{ url }],
      apiKey: "xyz",
      numRetries: 0,
      logLevel: "silent",
    });
    const error = await client.health
      .retrieve()
      .catch((caught: unknown) => caught);
    expect(error).toBeInstanceOf(Errors.FetchTransportError);
    expect(error).toMatchObject({ type: "network", code: "ECONNREFUSED" });
    expect((error as Error).message).toMatch(/ECONNREFUSED/);
  }, 3000);

  it("lets an export reader pause for longer than the timeout", async () => {
    const url = await listen((response) => {
      // More than the Readable buffers, so it stops reading during the pause
      response.end(`{"id":"${"1".repeat(1 << 20)}"}\n`);
    });
    const client = new Client({
      nodes: [{ url }],
      apiKey: "xyz",
      connectionTimeoutSeconds: 0.05,
    });
    const stream = await client.collections("books").documents().exportStream();
    const chunks = stream[Symbol.asyncIterator]();
    await chunks.next();
    await new Promise((resolve) => setTimeout(resolve, 200));
    let done = false;
    while (!done) ({ done } = await chunks.next());
  }, 3000);

  async function runFresh(script: string) {
    const { stdout } = await promisify(execFile)(process.execPath, [
      "-e",
      script,
    ]);
    return JSON.parse(stdout);
  }

  it("loads Undici only on the first import", async () => {
    const { url } = await recordingServer();
    // A fresh process, so no earlier test has loaded Undici
    const states = await runFresh(`
      const loaded = () => Object.keys(require.cache).some((file) => file.split(/[\\\\/]/).includes("undici"));
      const { Client } = require(${JSON.stringify(require.resolve("../lib/Typesense"))});
      const nodes = [{ url: ${JSON.stringify(url)} }];
      const dispatcher = { dispatch: (...args) => globalThis[Symbol.for("undici.globalDispatcher.1")].dispatch(...args) };
      const client = new Client({ nodes, apiKey: "xyz" });
      const withDispatcher = new Client({ nodes, apiKey: "xyz", dispatcher });
      (async () => {
        const states = [loaded()];
        await client.collections("books").retrieve();
        await withDispatcher.collections("books").retrieve();
        states.push(loaded());
        await client.collections("books").documents().import([{ id: "1" }]);
        states.push(loaded());
        console.log(JSON.stringify(states));
      })();
    `);
    expect(states).toEqual([false, false, true]);
  }, 5000);

  it("keeps Node's global dispatcher when the first request is an import", async () => {
    const { url } = await recordingServer();
    // Loaded first into an empty slot, Undici would install its own Agent
    const states = await runFresh(`
      const slot = Symbol.for("undici.globalDispatcher.1");
      const states = [globalThis[slot] === undefined];
      const { Client } = require(${JSON.stringify(require.resolve("../lib/Typesense"))});
      const client = new Client({ nodes: [{ url: ${JSON.stringify(url)} }], apiKey: "xyz" });
      client.collections("books").documents().import([{ id: "1" }]).then(() => {
        const { Agent } = require("undici");
        states.push(globalThis[slot] instanceof Agent);
        console.log(JSON.stringify(states));
      });
    `);
    expect(states).toEqual([true, false]);
  }, 5000);

  it("treats a null dispatcher as no dispatcher", async () => {
    const { url, received } = await recordingServer();
    const client = new Client({
      nodes: [{ url }],
      apiKey: "xyz",
      numRetries: 0,
      dispatcher: null,
    });
    await client.collections("books").retrieve();
    await client
      .collections("books")
      .documents()
      .import([{ id: "1" }]);
    expect(received).toHaveLength(2);
  });
});
