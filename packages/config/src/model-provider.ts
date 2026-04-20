import type { ModelConfigMap } from "@repo/types";

export const modelProvider: ModelConfigMap = {
  "gpt-4o": {
    max_tokens: 128000,
    streaming: true,
    providers: [
      {
        provider: "openai",
        provider_model: "gpt-4o",
        cost: { input: 0.005, output: 0.015 },
        metrics: { latency: 0.9, throughput: 0.85, reliability: 0.98 },
        priority: 1,
      },
      {
        provider: "azure",
        provider_model: "gpt-4o",
        cost: { input: 0.006, output: 0.016 },
        metrics: { latency: 0.85, throughput: 0.9, reliability: 0.99 },
        priority: 2,
      },
    ],
  },

  "gpt-4o-mini": {
    max_tokens: 128000,
    streaming: true,
    providers: [
      {
        provider: "openai",
        provider_model: "gpt-4o-mini",
        cost: { input: 0.00015, output: 0.0006 },
        metrics: { latency: 0.95, throughput: 0.95, reliability: 0.97 },
        priority: 1,
      },
    ],
  },

  "claude-3.5-sonnet": {
    max_tokens: 200000,
    streaming: true,
    providers: [
      {
        provider: "anthropic",
        provider_model: "claude-3.5-sonnet",
        cost: { input: 0.003, output: 0.015 },
        metrics: { latency: 0.85, throughput: 0.8, reliability: 0.99 },
      },
      {
        provider: "bedrock",
        provider_model: "anthropic.claude-3.5-sonnet",
        cost: { input: 0.0032, output: 0.016 },
        metrics: { latency: 0.8, throughput: 0.85, reliability: 0.99 },
      },
    ],
  },

  "gemini-2.5-flash": {
    max_tokens: 1000000,
    streaming: true,
    providers: [
      {
        provider: "google",
        provider_model: "gemini-2.5-flash",
        cost: { input: 0.0035, output: 0.0105 },
        metrics: { latency: 0.75, throughput: 0.9, reliability: 0.97 },
      },
    ],
  },

  "gemini-2.5-pro": {
    max_tokens: 2000000,
    streaming: true,
    providers: [
      {
        provider: "google",
        provider_model: "gemini-2.5-pro",
        cost: { input: 0.007, output: 0.021 },
        metrics: { latency: 0.8, throughput: 0.85, reliability: 0.99 },
      },
    ],
  },

  "gemini-2.5-flash-lite": {
    max_tokens: 1000000,
    streaming: true,
    providers: [
      {
        provider: "google",
        provider_model: "gemini-2.5-flash-lite",
        cost: { input: 0.0015, output: 0.0045 },
        metrics: { latency: 0.95, throughput: 0.95, reliability: 0.96 },
      },
    ],
  },

  "gemini-1.5-flash": {
    max_tokens: 1000000,
    streaming: true,
    providers: [
      {
        provider: "google",
        provider_model: "gemini-1.5-flash",
        cost: { input: 0.0035, output: 0.0105 },
        metrics: { latency: 0.8, throughput: 0.85, reliability: 0.95 },
      },
    ],
  },

  "gemini-1.5-pro": {
    max_tokens: 2000000,
    streaming: true,
    providers: [
      {
        provider: "google",
        provider_model: "gemini-1.5-pro",
        cost: { input: 0.007, output: 0.021 },
        metrics: { latency: 0.75, throughput: 0.8, reliability: 0.98 },
      },
    ],
  },

  "gemma-2": {
    max_tokens: 8000,
    streaming: true,
    providers: [
      {
        provider: "google",
        provider_model: "gemma-2",
        cost: { input: 0.001, output: 0.001 },
        metrics: { latency: 0.9, throughput: 0.9, reliability: 0.95 },
      },
    ],
  },

  "imagen-3": {
    max_tokens: 0,
    streaming: false,
    providers: [
      {
        provider: "google",
        provider_model: "imagen-3",
        cost: { input: 0.0, output: 0.03 },
        metrics: { latency: 0.7, throughput: 0.7, reliability: 0.99 },
      },
    ],
  },

  "imagen-4": {
    max_tokens: 0,
    streaming: false,
    providers: [
      {
        provider: "google",
        provider_model: "imagen-4",
        cost: { input: 0.0, output: 0.04 },
        metrics: { latency: 0.7, throughput: 0.7, reliability: 0.95 },
      },
    ],
  },

  "gemini-3.1-pro": {
    max_tokens: 2000000,
    streaming: true,
    providers: [
      {
        provider: "google",
        provider_model: "gemini-3.1-pro",
        cost: { input: 0.01, output: 0.03 },
        metrics: { latency: 0.85, throughput: 0.85, reliability: 0.95 },
      },
    ],
  },

  "gemini-3-flash": {
    max_tokens: 1000000,
    streaming: true,
    providers: [
      {
        provider: "google",
        provider_model: "gemini-3-flash",
        cost: { input: 0.003, output: 0.009 },
        metrics: { latency: 0.9, throughput: 0.9, reliability: 0.95 },
      },
    ],
  },

  "gemini-3-flash-preview": {
    max_tokens: 1000000,
    streaming: true,
    providers: [
      {
        provider: "google",
        provider_model: "gemini-3-flash-preview",
        cost: { input: 0.003, output: 0.009 },
        metrics: { latency: 0.9, throughput: 0.9, reliability: 0.9 },
      },
    ],
  },

  "gemini-2.5-computer-use": {
    max_tokens: 1000000,
    streaming: true,
    providers: [
      {
        provider: "google",
        provider_model: "gemini-2.5-computer-use",
        cost: { input: 0.005, output: 0.015 },
        metrics: { latency: 0.8, throughput: 0.8, reliability: 0.95 },
      },
    ],
  },

  "gemini-robotics-er-1.5": {
    max_tokens: 1000000,
    streaming: true,
    providers: [
      {
        provider: "google",
        provider_model: "gemini-robotics-er-1.5",
        cost: { input: 0.01, output: 0.03 },
        metrics: { latency: 0.7, throughput: 0.7, reliability: 0.95 },
      },
    ],
  },

  "grok-2": {
    max_tokens: 128000,
    streaming: true,
    providers: [
      {
        provider: "xai",
        provider_model: "grok-2",
        cost: { input: 0.005, output: 0.015 },
        metrics: { latency: 0.8, throughput: 0.85, reliability: 0.95 },
      },
    ],
  },

  "llama-3-70b": {
    max_tokens: 8000,
    streaming: true,
    providers: [
      {
        provider: "groq",
        provider_model: "llama3-70b",
        cost: { input: 0.0008, output: 0.0008 },
        metrics: { latency: 0.98, throughput: 0.99, reliability: 0.95 },
      },
      {
        provider: "together",
        provider_model: "llama-3-70b",
        cost: { input: 0.0009, output: 0.0009 },
        metrics: { latency: 0.85, throughput: 0.9, reliability: 0.94 },
      },
    ],
  },

  "mixtral-8x7b": {
    max_tokens: 32000,
    streaming: true,
    providers: [
      {
        provider: "mistral",
        provider_model: "mixtral-8x7b",
        cost: { input: 0.0007, output: 0.0007 },
        metrics: { latency: 0.9, throughput: 0.92, reliability: 0.95 },
      },
    ],
  },
};
