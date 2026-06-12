import { vi } from "vitest";

type MockMethod = "get" | "delete" | "post" | "put" | "patch" | "any";

type ReplyTuple = [number, unknown?, Record<string, string>?];
type ReplyCallback = (
  config: FetchMockRequest,
) => ReplyTuple | Promise<ReplyTuple>;
type Reply = ReplyTuple | ReplyCallback;

interface FetchMockHandler {
  method: MockMethod;
  url?: string;
  reply?: Reply;
  timeout?: boolean;
}

interface FetchMockHandlerBuilder {
  reply(
    replyOrStatus: Reply | number,
    body?: unknown,
    headers?: Record<string, string>,
  ): FetchMock;
  timeout(): FetchMock;
}

export interface FetchMockRequest {
  method: string;
  url: string;
  baseUrl: string;
  headers: Record<string, string>;
  body?: unknown;
  data?: unknown;
  params: Record<string, string>;
}

type FetchMockHistory = Record<string, FetchMockRequest[]>;

export class FetchMock {
  readonly originalFetch = globalThis.fetch;
  readonly mock = vi.fn(this.fetch.bind(this));
  readonly history: FetchMockHistory = {
    get: [],
    delete: [],
    post: [],
    put: [],
    patch: [],
  };

  private handlers: FetchMockHandler[] = [];

  install(): void {
    globalThis.fetch = this.mock as typeof fetch;
  }

  restore(): void {
    globalThis.fetch = this.originalFetch;
  }

  reset(): void {
    this.resetHandlers();
    this.resetHistory();
    this.mock.mockClear();
  }

  resetHandlers(): void {
    this.handlers = [];
  }

  resetHistory(): void {
    Object.values(this.history).forEach((entries) => {
      entries.splice(0, entries.length);
    });
  }

  onAny(url?: string): FetchMockHandlerBuilder {
    return this.addHandler("any", url);
  }

  onGet(url?: string): FetchMockHandlerBuilder {
    return this.addHandler("get", url);
  }

  onDelete(url?: string): FetchMockHandlerBuilder {
    return this.addHandler("delete", url);
  }

  onPost(url?: string): FetchMockHandlerBuilder {
    return this.addHandler("post", url);
  }

  onPut(url?: string): FetchMockHandlerBuilder {
    return this.addHandler("put", url);
  }

  onPatch(url?: string): FetchMockHandlerBuilder {
    return this.addHandler("patch", url);
  }

  private addHandler(
    method: MockMethod,
    url?: string,
  ): FetchMockHandlerBuilder {
    const handler: FetchMockHandler = { method, url };
    this.handlers.push(handler);

    return {
      reply: (
        replyOrStatus: Reply | number,
        body?: unknown,
        headers?: Record<string, string>,
      ) => {
        handler.reply =
          typeof replyOrStatus === "number"
            ? [replyOrStatus, body, headers]
            : replyOrStatus;
        return this;
      },
      timeout: () => {
        handler.timeout = true;
        return this;
      },
    };
  }

  private async fetch(
    input: string | URL | Request,
    init?: RequestInit,
  ): Promise<Response> {
    const request = await this.requestFrom(input, init);
    this.history[request.method as Exclude<MockMethod, "any">].push(request);

    const handler = this.handlers.find(
      (candidate) =>
        (candidate.method === "any" || candidate.method === request.method) &&
        (candidate.url === undefined ||
          candidate.url === request.url ||
          candidate.url === request.baseUrl),
    );

    if (!handler) {
      throw new Error(
        `No fetch mock matched ${request.method.toUpperCase()} ${request.url}`,
      );
    }

    if (handler.timeout) {
      throw new Error("timeout");
    }

    if (handler.reply === undefined) {
      throw new Error(
        `No fetch mock reply configured for ${request.method.toUpperCase()} ${request.url}`,
      );
    }

    const [status, body, headers] =
      typeof handler.reply === "function"
        ? await handler.reply(request)
        : handler.reply;

    return this.responseFrom(status, body, headers);
  }

  private async requestFrom(
    input: string | URL | Request,
    init?: RequestInit,
  ): Promise<FetchMockRequest> {
    const request = input instanceof Request ? input : undefined;
    const url = request ? request.url : String(input);
    const method = (init?.method || request?.method || "GET").toLowerCase();
    const headers = this.headersFrom(init?.headers || request?.headers);
    const body = init?.body ?? (request ? await request.text() : undefined);
    const parsedUrl = new URL(url);

    return {
      method,
      url,
      baseUrl: `${parsedUrl.origin}${parsedUrl.pathname}`,
      headers,
      body,
      data: body,
      params: Object.fromEntries(parsedUrl.searchParams.entries()),
    };
  }

  private headersFrom(headers?: HeadersInit): Record<string, string> {
    const result: Record<string, string> = {};
    if (!headers) {
      return result;
    }

    new Headers(headers).forEach((value, key) => {
      result[key] = value;
    });
    return result;
  }

  private responseFrom(
    status: number,
    body?: unknown,
    headers: Record<string, string> = {},
  ): Response {
    const responseHeaders = new Headers(headers);
    let responseBody: BodyInit | null = null;

    if (body instanceof ReadableStream) {
      responseBody = body;
    } else if (typeof body === "string") {
      responseBody = body;
    } else if (body !== undefined && body !== null) {
      if (!responseHeaders.has("content-type")) {
        responseHeaders.set("content-type", "application/json");
      }
      responseBody = JSON.stringify(body);
    }

    return new Response(responseBody, { status, headers: responseHeaders });
  }
}

export function createFetchMock(): FetchMock {
  const fetchMock = new FetchMock();
  fetchMock.install();
  return fetchMock;
}
