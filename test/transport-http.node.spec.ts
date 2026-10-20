import { createRequire } from "node:module";
import {
  createServer,
  IncomingMessage,
  Server,
  ServerResponse,
} from "node:http";
import { AddressInfo } from "node:net";
import { Readable } from "node:stream";
import { afterEach, describe, expect, it } from "vitest";

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
    await expect(stream.getReader().read()).rejects.toMatchObject({
      type: "timeout",
    });
  }, 3000);

  it("streams active exports beyond the timeout and supports Readable.fromWeb", async () => {
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
    const web = await client.collections("books").documents().exportStream();
    let result = "";
    for await (const chunk of Readable.fromWeb(web)) result += chunk.toString();
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
      response.write('{"id":"1"}\n');
      const timers = [
        setTimeout(() => response.write('{"id":"2"}\n'), 10),
        setTimeout(() => response.end('{"id":"3"}\n'), 20),
      ];
      response.on("close", () => timers.forEach(clearTimeout));
    });
    const client = new Client({
      nodes: [{ url }],
      apiKey: "xyz",
      connectionTimeoutSeconds: 0.05,
    });
    const stream = await client.collections("books").documents().exportStream();
    const reader = stream.getReader();
    await reader.read();
    await new Promise((resolve) => setTimeout(resolve, 200));
    let done = false;
    while (!done) ({ done } = await reader.read());
  }, 3000);
});
