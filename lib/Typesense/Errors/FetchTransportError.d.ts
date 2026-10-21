import type { TransportErrorType, TypesenseRequest, TypesenseResponse } from "../Transport";
export default class FetchTransportError extends Error {
    readonly type: TransportErrorType;
    readonly code?: string;
    readonly request?: TypesenseRequest;
    readonly response?: TypesenseResponse;
    readonly originalError?: unknown;
    constructor(type: TransportErrorType, message: string, { code, request, response, originalError, }?: {
        code?: string;
        request?: TypesenseRequest;
        response?: TypesenseResponse;
        originalError?: unknown;
    });
}
