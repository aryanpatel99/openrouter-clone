export type RetryPolicy = {
  maxAttempts: number;
  baseDelayMs: number;
  backoff: number;
  maxDelayMs: number;
};

export const DEFAULT_RETRY_POLICY: RetryPolicy = {
  maxAttempts: 3,
  baseDelayMs: 400,
  backoff: 2,
  maxDelayMs: 4000,
};

export class RetryHandler {
  constructor(private policy: RetryPolicy = DEFAULT_RETRY_POLICY) {}
  
  get maxAttempts() {
    return this.policy.maxAttempts;
  }

  computeDelay(attempt: number): number {
    const base =
      this.policy.baseDelayMs *
      Math.pow(this.policy.backoff, attempt);

    const capped = Math.min(base, this.policy.maxDelayMs);
    const jitter = Math.random() * 200;

    return Math.floor(capped + jitter);
  }

  sleep(ms: number) {
    return new Promise((res) => setTimeout(res, ms));
  }
}
