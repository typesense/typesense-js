# Migrating from Axios to fetch

The client uses the Fetch API. Node.js 20.18.1 or later is required. Modern browsers must provide `fetch`, `AbortController`, `Response`, and Web Streams. Unless you configure a custom `fetch`, every request uses the global `fetch`, including imports and requests with a configured `dispatcher`, so tools that intercept the global `fetch`, such as msw and nock 14, see all of them (nock 13 and axios-mock-adapter don't intercept fetch). A wrapper that replaces the global `fetch` must forward `init.dispatcher`, or imports lose the timeout override described below.

Requests without a body, such as searches, no longer send `Content-Type`.

## Timeouts and cancellation

`connectionTimeoutSeconds` remains active until the response body finishes or is cancelled. In Node.js it limits how long the request waits for headers and how long each body read waits for data, so a stream can run longer than the configured timeout, and a reader can pause between reads for as long as it likes. In browsers it is a total request timeout. Consume or cancel returned streams to release resources.

A request whose body is a stream, such as `importStream()` or a stream set by a request hook, is sent once. If it fails, the SDK rejects with that error instead of retrying on the next node, because the stream has already been consumed. A failed `import()` with a string or array body is retried as before.

`import()` with a large string holds the encoded body in memory alongside the string while the request is sent, so its peak memory is higher than with v3. Use `importStream()` to import a large file without loading it into memory.

`import()` and `importStream()` disable the SDK timer and override Undici's `headersTimeout` and `bodyTimeout` to zero at dispatch time. This works with the configured `dispatcher`, or Undici's global dispatcher when none is configured, without changing settings for other requests. Connection establishment failures and server/proxy timeouts can still fail an import. A custom fetch must honor the dispatcher options to provide the same behavior. See [Undici's timeout options](https://github.com/nodejs/undici/blob/v7.30.0/docs/docs/api/Client.md).

## Environment proxies

Axios proxy environment handling is no longer implicit. Install a compatible Undici version as a direct dependency when importing its agents in your application:

```sh
npm install undici@7
```

Use `EnvHttpProxyAgent` to respect `HTTP_PROXY`, `HTTPS_PROXY`, and `NO_PROXY` (and their lowercase equivalents):

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

Recent Node versions also support `NODE_USE_ENV_PROXY=1` for built-in fetch (22.21.0+, or 24.0.0+); see [Node's version-specific proxy configuration](https://nodejs.org/learn/http/enterprise-network-configuration). When no `dispatcher` is configured, imports go through the same proxy, since they forward to the global dispatcher that this option sets.

## Custom CAs, client certificates, and connection pooling

The SDK ignores `httpAgent`, `httpsAgent` and `axiosAdapter`, and logs a warning when they are set. Replace `httpAgent`/`httpsAgent` with an Undici dispatcher. The SDK passes it to Node's fetch, which bundles a different Undici major on each Node release line. An Undici 7 `Agent` works with Node 20, 22, 24 and 26. An Undici 8 `Agent` works with Node 26; with Node's fetch on Node 22 and 24, requests through it fail with `invalid onRequestStart method` unless you wrap it in Undici 8's `Dispatcher1Wrapper`. For a custom certificate authority and mutual TLS:

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

Default serialization supports scalars and flat arrays. Null and undefined values are omitted; arrays use bracketed keys, preserving `key[]=a&key[]=b` (brackets are URL encoded). Values are converted with `String()` and encoded with `URLSearchParams`.

The supported custom contract is a function or `{ serialize(params) }`. Axios `indexes`, `encode`, nested-object expansion, and automatic date conversion are not supported. Supply the full serializer when those behaviors matter.

## Axios interceptors and adapters

Replace request/response interceptors with async `requestHooks`, `responseHooks`, and `errorHooks`. Hooks run in array order for each attempt and receive `requestNumber`, `attemptNumber`, and `nodeIndex`. Request hooks run before URL/body serialization; mutate the request directly. Each attempt gets its own copy of the headers and of the plain objects and arrays in `queryParameters` and `bodyParameters`, so changes to them don't reach the caller's objects or carry over to a retry. Other values, such as Dates, class instances and objects with a `toJSON` method, are the caller's own: replace them rather than mutate them. Response hooks can mutate decoded `response.data`; their return values are ignored. They also see HTTP error responses. A response hook that replaces a streamed `response.data` owns the original stream and must consume or cancel it, because the SDK can't tell whether the replacement still reads from it. Until then the original keeps the connection open. Don't rely on `connectionTimeoutSeconds` to close it: in Node.js the timeout only runs while a read waits for data, so it stops once the SDK has buffered a chunk that nothing reads. The caller's `abortSignal` still closes it. If a response hook changes a streamed response's status to an error, the SDK closes the stream itself, since it rejects or retries the request without returning the stream. Error hooks receive `errorType` and HTTP response context when available; they observe errors and cannot recover a request by returning a value.

A request hook or response hook that throws ends the request: it rejects with a `FetchTransportError` of type `"hook"`, whose `originalError` is the thrown value and whose message is the thrown error's message. The SDK doesn't retry it, mark the node unhealthy, or call `errorHooks` for it. A response hook can throw after the server has applied a write, so a hook failure is not a sign that the request had no effect. If a response hook that throws holds a reader of a streamed `response.data`, the SDK aborts the request to close the connection, and the reader rejects with the hook error. An error hook that throws is logged as a warning and skipped; the request keeps its original error, retries and node health, and the remaining error hooks still run.

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

`client.apiCall` is internal: its types accept only lowercase methods and fetch's response types, and a `stream` response is a Web `ReadableStream`.

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
  // Before: axios.isAxiosError(error)
  if (error instanceof Errors.FetchTransportError && error.type === "timeout") {
    // retry later
  } else if (error instanceof Errors.ObjectNotFound) {
    // unchanged from v3
  }
}
```

When the caller aborts, client methods still reject with a plain `Error("Request aborted by caller.")`, as in v3. Error hooks, and the reader of a stream that was already returned, receive the `FetchTransportError` with type `abort`.

## Runtime notes

`dispatcher` applies in Node.js. Deno's fetch ignores it, and rejects a Node stream body whose chunks are strings, so pass `importStream()` a file stream or a stream of bytes there. Browsers and edge runtimes have no dispatcher; use a custom `fetch` there instead.

Unsetting a default header with `null` or `false` in `additionalHeaders` no longer removes it entirely: fetch adds its own `Content-Type` for string bodies and `Accept: */*`.

Next.js 14 caches `fetch` requests by default, and later versions can still cache requests made while rendering static routes. To always query Typesense, pass a fetch that opts out of the cache:

```javascript
const client = new Typesense.Client({
  nodes,
  apiKey,
  fetch: (input, init) => fetch(input, { ...init, cache: "no-store" }),
});
```

Jest's `jsdom` environment has no global `fetch`, unlike the XHR that Axios used there, so requests reject with "No fetch implementation is available". Run tests that make real requests in Jest's `node` environment, or load a fetch polyfill such as `whatwg-fetch` in the test setup. Tests that only import the SDK, or that pass their own `fetch`, work in either environment.

In Node.js, Bun and Deno, `exportStream()` resolves to a Node `Readable`, as in v3. Cloudflare Workers with `nodejs_compat` now get a Node `Readable` too, where v3 returned a Web `ReadableStream`. In browsers and other edge runtimes, it resolves to a Web `ReadableStream`; v3 resolved to the whole export as a string there, which `export()` still returns. React Native's built-in fetch does not expose response bodies as streams. There, `exportStream()` resolves to `null`, and streamed conversations call `onChunk` and `onComplete` only after the whole response arrives. Use `export()` instead, or a fetch that supports streaming, such as `expo/fetch`.
