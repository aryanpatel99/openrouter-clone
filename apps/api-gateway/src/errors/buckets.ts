export enum DecisionBucket {
  RETRY = "RETRY",
  FALLBACK = "FALLBACK",
  FIX_USER = "FIX_USER",
  FIX_DEV = "FIX_DEV",
  UNKNOWN = "UNKNOWN"
}

export const FIX_USER_ERRORS = new Set([
  "BadRequestError",
  "ValidationError",
  "ValueError",
  "SyntaxError",
  "JSONParseError",
  "PromptTooLongError",
  "InvalidToolArgumentsError",
  "InvalidMessageFormatError",
  "RangeError",
  "URIError"
]);

export const FIX_DEV_ERRORS = new Set([
  "TypeError",
  "ReferenceError",
  "AttributeError",
  "KeyError",
  "RuntimeError",
  "SerializationError",
  "DeserializationError",
  "LogicError",
  "NullPointerError",
  "UndefinedAccessError",
  "UnauthorizedError",
  "ForbiddenError"
]);

export const RETRY_ERRORS = new Set([
  "RateLimitError",
  "ConnectionError",
  "ConnectionResetError",
  "DNSError",
  "FetchError",
  "SocketError",
  "RequestTimeoutError",
  "TimeoutError",
  "GatewayTimeoutError"
]);

export const FALLBACK_ERRORS = new Set([
  "InternalServerError",
  "BadGatewayError",
  "ServiceUnavailableError",
  "ProviderInternalError",
  "ModelOverloadedError",
  "ModelUnavailableError",
  "InvalidProviderResponseError",
  "EmptyCompletionError"
]);

export const STREAM_ERRORS = new Set([
  "StopIteration",
  "StopAsyncIteration",
  "StreamClosedError",
  "SSEDisconnectError",
  "ChunkParseError",
  "IncompleteGenerationError"
]);

export function resolveBucket(errorName: string): DecisionBucket {
  if (FIX_USER_ERRORS.has(errorName)) return DecisionBucket.FIX_USER;
  if (FIX_DEV_ERRORS.has(errorName)) return DecisionBucket.FIX_DEV;
  if (RETRY_ERRORS.has(errorName)) return DecisionBucket.RETRY;
  if (FALLBACK_ERRORS.has(errorName)) return DecisionBucket.FALLBACK;
  if (STREAM_ERRORS.has(errorName)) return DecisionBucket.RETRY;

  return DecisionBucket.UNKNOWN;
}
