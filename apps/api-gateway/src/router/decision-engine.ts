import { classifyErrorUniversal, DecisionBucket } from "../errors/index.ts";

export enum RouterAction {
  RETRY,
  FALLBACK_PROVIDER,
  FAIL_USER,
  FAIL_DEV,
}

export function decide(error: any, attempt: number, maxAttempts: number): RouterAction {
  const { bucket } = classifyErrorUniversal(error);

  if (bucket === DecisionBucket.FIX_USER) {
    return RouterAction.FAIL_USER;
  }

  if (bucket === DecisionBucket.FIX_DEV) {
    return RouterAction.FAIL_DEV;
  }

  if (bucket === DecisionBucket.RETRY) {
    const isLast = attempt >= maxAttempts - 1;
    return isLast ? RouterAction.FALLBACK_PROVIDER : RouterAction.RETRY;
  }

  return RouterAction.FALLBACK_PROVIDER;
}
