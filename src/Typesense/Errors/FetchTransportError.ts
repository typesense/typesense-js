import type {
  TransportErrorType,
  TypesenseRequest,
  TypesenseResponse,
} from "../Transport";

export default class FetchTransportError extends Error {
  readonly type: TransportErrorType;
  readonly request?: TypesenseRequest;
  readonly response?: TypesenseResponse;
  readonly originalError?: unknown;

  constructor(
    type: TransportErrorType,
    message: string,
    {
      request,
      response,
      originalError,
    }: {
      request?: TypesenseRequest;
      response?: TypesenseResponse;
      originalError?: unknown;
    } = {},
  ) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = "FetchTransportError";
    this.type = type;
    this.request = request;
    this.response = response;
    this.originalError = originalError;
  }
}
