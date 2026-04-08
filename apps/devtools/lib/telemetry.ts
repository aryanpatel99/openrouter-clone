// ─── Telemetry Types (client-side mirror) ────────────────────

export interface StepRequest {
  model: string;
  messages: { role: string; content: string }[];
  temperature?: number;
  provider_strategy?: string;
}

export interface StepResponse {
  content: string;
  promptTokens?: number;
  completionTokens?: number;
  totalTokens?: number;
  thoughtsTokens?: number;
  finishReason?: string;
  actualModel?: string;
  provider?: string;
  cost?: number;
}

export interface Step {
  index: number;
  model: string;
  provider: string;
  status: "success" | "error" | "pending";
  startedAt: number;
  completedAt?: number;
  duration?: number;
  request: StepRequest;
  response?: StepResponse;
  error?: string;
}

export interface Run {
  id: string;
  status: "success" | "error" | "pending";
  operation: "chat";
  model: string;
  provider?: string;
  startedAt: number;
  completedAt?: number;
  duration?: number;
  promptTokens?: number;
  completionTokens?: number;
  totalTokens?: number;
  cost?: number;
  steps: Step[];
  input: StepRequest;
  error?: string;
}

export interface TelemetryData {
  runs: Run[];
}
