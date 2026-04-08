import type { ModelRegistryEntry } from "@repo/types";
import { modelRegistry } from "@repo/config";

// ─── Usage Metadata (from Gemini / generic provider) ─────────
export interface UsageMetadata {
  promptTokenCount: number;
  candidatesTokenCount: number;
  totalTokenCount?: number;
  thoughtsTokenCount?: number;
  cacheReadTokenCount?: number;
}

// ─── Cost Calculator ─────────────────────────────────────────
/**
 * Calculate the cost of an LLM call based on token usage and
 * the model registry pricing data.
 *
 * @param modelSlug - The full slug (e.g. "google/gemini-2.5-pro")
 *                    or just the provider-prefixed version.
 *                    If only a bare model name is provided,
 *                    pass `providerPrefix` to prepend it.
 * @param usage     - Token counts from the provider's response
 * @param providerPrefix - Optional prefix (e.g. "google/") to prepend
 * @returns Total cost in USD (number), or 0 if model not found
 */
export function costCalculation(
  modelSlug: string,
  usage: UsageMetadata,
  providerPrefix?: string
): number {
  const fullSlug = providerPrefix
    ? `${providerPrefix}${modelSlug}`
    : modelSlug;

  const entry: ModelRegistryEntry | undefined = modelRegistry[fullSlug];

  if (!entry) {
    console.warn(`[cost-calculator] Model "${fullSlug}" not found in registry`);
    return 0;
  }

  const { cost_per_token } = entry;

  const cost =
    usage.promptTokenCount * cost_per_token.input +
    usage.candidatesTokenCount * cost_per_token.output +
    (usage.thoughtsTokenCount || 0) * (cost_per_token.reasoning || 0) +
    (usage.cacheReadTokenCount || 0) * (cost_per_token.cache_read || 0);

  return cost;
}