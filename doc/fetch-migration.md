# Migrating from Axios to fetch

The client uses the Fetch API. Node.js 22 or later is required. Modern browsers must provide `fetch`, `AbortController`, `Response`, and Web Streams. Ordinary requests use native `fetch`. In Node.js, imports and requests with a configured dispatcher use the bundled Undici 7 fetch, because Node's native fetch uses a different Undici major on each release line and the dispatcher protocol changes between majors. Undici is excluded from browser bundles. A configured custom `fetch` always takes precedence.

The SDK loads Undici the first time a request needs it, not when the SDK is imported. When Undici loads, it installs an Undici 7 `Agent` as the process-wide global dispatcher if nothing has set one yet, and Node's native fetch then uses that agent too. Call `setGlobalDispatcher()` before the first import if the process needs a different global dispatcher.

Requests without a body, such as searches, no longer send `Content-Type`. In browsers, this keeps a GET search with the API key in the query string a CORS simple request, so the browser doesn't send a preflight `OPTIONS` before each search. A body that is a `Buffer`, a typed array, or an `ArrayBuffer` is sent as raw bytes. An empty object or array body is not sent, as in v3.

## Timeouts and cancellation

Caller cancellation remains separate from network failures: it does not retry or mark a node unhealthy, including cancellation while reading the body. Invalid JSON is a parsing error; failed body transfers are network errors.

`connectionTimeoutSeconds` remains active until the response body finishes or is cancelled. In Node.js it limits how long the request waits for headers and how long each body read waits for data, so a stream can run longer than the configured timeout, and a reader can pause between reads for as long as it likes. In browsers it is a total request timeout. A value of zero disables the SDK timer. Consume or cancel returned streams to release resources. Errors after a stream is returned reject its reader and notify `errorHooks`; the SDK cannot replay an already delivered stream.

A request whose body is a stream, such as `importStream()` or a stream set by a request hook, is sent once. If it fails, the SDK rejects with that error instead of retrying on the next node, because the stream has already been consumed. A failed `import()` with a string or array body is retried as before.

`import()` with a large string holds the encoded body in memory alongside the string while the request is sent, so its peak memory is higher than with v3. Use `importStream()` to import a large file without loading it into memory.

`import()` and `importStream()` disable the SDK timer and override Undici's `headersTimeout` and `bodyTimeout` to zero at dispatch time. This works with the configured `dispatcher`, or Undici's global dispatcher when none is configured, without changing settings for other requests. Connection establishment failures and server/proxy timeouts can still fail an import. A custom fetch must honor the dispatcher options to provide the same behavior. See [Undici's timeout options](https://github.com/nodejs/undici/blob/v7.30.0/docs/docs/api/Client.md).

## Export streams

`exportStream()` now returns `Promise<ReadableStream<Uint8Array> | null>` in both Node.js and browsers. For existing Node `.pipe()`, `.on()`, or `.destroy()` code, convert the Web stream:

```javascript
import { Readable } from "node:stream";
import { pipeline } from "node:stream/promises";
import { createWriteStream } from "node:fs";

const stream = await client.collections("books").documents().exportStream();
if (stream) {
  await pipeline(Readable.fromWeb(stream), createWriteStream("books.jsonl"));
}
```

TypeScript projects whose DOM and Node stream types differ can use `Readable.fromWeb(stream as import("node:stream/web").ReadableStream<Uint8Array>)`. Cancelling the Web stream, or destroying its Node wrapper, releases the response and its timeout.

## Environment proxies

Axios proxy environment handling is no longer implicit. Install a compatible Undici version as a direct dependency when importing its agents in your application:

```sh
npm install undici@7
```

Use `EnvHttpProxyAgent` on the supported Node versions to respect `HTTP_PROXY`, `HTTPS_PROXY`, and `NO_PROXY` (and their lowercase equivalents):

```javascript
import Typesense from "typesense";
import { EnvHttpProxyAgent } from "undici";

const dispatcher = new EnvHttpProxyAgent();
const client = new Typesense.Client({
  nodes: [{ url: "https://typesense.example.com" }],
  apiKey: process.env.TYPESENSE_API_KEY,
  dispatcher,
});
// After all client requests and streams finish, at application shutdown:
// await dispatcher.close();
```

See [EnvHttpProxyAgent](https://github.com/nodejs/undici/blob/v7.30.0/docs/docs/api/EnvHttpProxyAgent.md). For an explicit proxy, use `new ProxyAgent("http://proxy.example.com:8080")` instead; `ProxyAgent` does not automatically apply `NO_PROXY`. See [ProxyAgent](https://github.com/nodejs/undici/blob/v7.30.0/docs/docs/api/ProxyAgent.md).

Recent Node versions also support `NODE_USE_ENV_PROXY=1` for built-in fetch (22.21.0+, or 24.0.0+); see [Node's version-specific proxy configuration](https://nodejs.org/learn/http/enterprise-network-configuration). Use an explicit `EnvHttpProxyAgent` here to ensure imports use the same proxy policy, since imports supply a dispatcher to override timeouts.

## Custom CAs, client certificates, and connection pooling

Replace `httpAgent`/`httpsAgent` with an Undici 7 dispatcher. For a custom certificate authority and mutual TLS:

```javascript
import { Agent } from "undici";
import { readFileSync } from "node:fs";

const dispatcher = new Agent({
  connect: {
    ca: readFileSync("company-ca.pem"),
    cert: readFileSync("client-cert.pem"),
    key: readFileSync("client-key.pem"),
  },
  keepAliveTimeout: 10_000,
});
const client = new Typesense.Client({ nodes, apiKey, dispatcher });
```

Omit `cert` and `key` when client authentication is not needed. An explicit `ca` replaces the default trust roots; include all roots the client needs. The application closes its dispatcher after all requests and streams finish. The SDK forwards import requests through this same dispatcher so TLS and proxy settings remain effective. See [Undici connection options](https://github.com/nodejs/undici/blob/v7.30.0/docs/docs/api/Client.md).

## Query serialization

Default serialization supports scalars and flat arrays. Null and undefined values are omitted; arrays use bracketed keys, preserving `key[]=a&key[]=b` (brackets are URL encoded). Values are converted with `String()` and encoded with `URLSearchParams`. Typesense search parameters that the SDK already joins with commas retain that behavior.

The supported custom contract is a function or `{ serialize(params) }`. Axios `indexes`, `encode`, nested-object expansion, and automatic date conversion are not supported. Supply the full serializer when those behaviors matter. For example, to keep indexed arrays:

```javascript
const client = new Typesense.Client({
  nodes,
  apiKey,
  paramsSerializer: {
    serialize(params) {
      const query = new URLSearchParams();
      for (const [key, value] of Object.entries(params)) {
        if (value == null) continue;
        if (Array.isArray(value)) {
          value.forEach((entry, index) => {
            if (entry != null) query.append(`${key}[${index}]`, String(entry));
          });
        } else {
          query.append(
            key,
            value instanceof Date ? value.toISOString() : String(value),
          );
        }
      }
      return query.toString();
    },
  },
});
```

## Axios interceptors and adapters

Replace request/response interceptors with async `requestHooks`, `responseHooks`, and `errorHooks`. Hooks run in array order for each attempt and receive `requestNumber`, `attemptNumber`, and `nodeIndex`. Request hooks run before URL/body serialization; mutate the request directly. Response hooks can mutate decoded `response.data`; their return values are ignored. They also see HTTP error responses. Error hooks receive `errorType` and HTTP response context when available; they observe errors and cannot recover a request by returning a value.

A request hook or response hook that throws ends the request: it rejects with a `FetchTransportError` of type `"hook"`, whose `originalError` is the thrown value and whose message is the thrown error's message. The SDK doesn't retry it, mark the node unhealthy, or call `errorHooks` for it. A response hook can throw after the server has applied a write, so a hook failure is not a sign that the request had no effect. An error hook that throws is logged as a warning and skipped; the request keeps its original error, retries and node health, and the remaining error hooks still run.

```javascript
const client = new Typesense.Client({
  nodes,
  apiKey,
  requestHooks: [
    async (request) => {
      request.headers.Authorization = `Bearer ${await getAccessToken()}`;
    },
  ],
  responseHooks: [
    (response, context) => {
      recordStatus(response.status, context.attemptNumber);
    },
  ],
  errorHooks: [
    (error, context) => {
      recordFailure(context.errorType, error);
    },
  ],
});
```

Replace an Axios adapter with a fetch-compatible function that accepts `(input, init)` and returns a `Response`. Forward the complete `init` object, including `signal`, `dispatcher`, and upload `duplex`, to retain transport behavior. In Node.js, wrap Undici 7's fetch so it uses the same dispatcher protocol as the SDK's imports:

```javascript
import { fetch as compatibleFetch } from "undici";
const client = new Typesense.Client({
  nodes,
  apiKey,
  fetch: async (input, init) => {
    const started = performance.now();
    try {
      return await compatibleFetch(input, init);
    } finally {
      recordTimeToHeaders(performance.now() - started);
    }
  },
});
```

## Error shapes

Errors from HTTP responses keep their v3 classes and fields: `ObjectNotFound`, `RequestMalformed`, `ServerError` and the other subclasses of `TypesenseError` under `Errors`, with `httpStatus` and `httpBody`, which holds the request body as it was passed in.

Network failures and timeouts are now `Errors.FetchTransportError` instead of `AxiosError`, and an invalid JSON response is one too, instead of a `SyntaxError`. Its `type` is one of:

| `type`    | Cause                                           | Retried | Node marked unhealthy |
| --------- | ----------------------------------------------- | ------- | --------------------- |
| `network` | The request or response body failed to transfer | Yes     | Yes                   |
| `timeout` | `connectionTimeoutSeconds` elapsed              | Yes     | Yes                   |
| `parse`   | A JSON response body was invalid                | Yes     | Yes                   |
| `abort`   | The caller's `abortSignal` fired                | No      | No                    |
| `hook`    | A request or response hook threw                | No      | No                    |

For network errors, `message` and `code` come from the underlying socket or Undici error, for example `connect ECONNREFUSED 127.0.0.1:8108` with `code: "ECONNREFUSED"`, or `UND_ERR_HEADERS_TIMEOUT`. The original error is in `originalError`, and the failed request in `request`. Browsers don't expose the cause of a network error, so there `message` is the browser's, such as `Failed to fetch`, and `code` is undefined.

Checks written for Axios no longer match, and fail silently rather than throwing:

```javascript
import { Errors } from "typesense";

try {
  await client.collections("books").retrieve();
} catch (error) {
  // Before: axios.isAxiosError(error), error.code === "ECONNABORTED"
  if (error instanceof Errors.FetchTransportError && error.type === "timeout") {
    // retry later
  } else if (error instanceof Errors.ObjectNotFound) {
    // unchanged from v3
  }
}
```

When the caller aborts, client methods still reject with a plain `Error("Request aborted by caller.")`, as in v3. Error hooks, and the reader of a stream that was already returned, receive the `FetchTransportError` with type `abort`.

## Runtime notes

`dispatcher` applies in Node.js and Deno. Bun replaces the `undici` package with its own partial implementation: Bun's fetch ignores `dispatcher`, and Bun's `Agent` has no `close()` method, so guard shutdown code that calls it. Browsers and edge runtimes have no dispatcher; use a custom `fetch` there instead.

Next.js 14 caches `fetch` requests by default, and later versions can still cache requests made while rendering static routes. To always query Typesense, pass a fetch that opts out of the cache:

```javascript
const client = new Typesense.Client({
  nodes,
  apiKey,
  fetch: (input, init) => fetch(input, { ...init, cache: "no-store" }),
});
```

Jest's `jsdom` environment has no global `fetch`, unlike the XHR that Axios used there, so requests reject with "No fetch implementation is available". Run tests that make real requests in Jest's `node` environment, or load a fetch polyfill such as `whatwg-fetch` in the test setup. Tests that only import the SDK, or that pass their own `fetch`, work in either environment.

React Native's built-in fetch does not expose response bodies as streams. There, `exportStream()` resolves to `null`, and streamed conversations call `onChunk` and `onComplete` only after the whole response arrives. Use `export()` instead, or a fetch that supports streaming, such as `expo/fetch` (the global fetch from Expo SDK 56).
