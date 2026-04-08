import crypto from "crypto";
import type { Run, Step, StepRequest, StepResponse } from "./types.ts";
import { saveRun } from "./storage.ts";
import { notifyDevtools } from "./notifier.ts";

export class TelemetryCollector {
  private run: Run;

  constructor(input: StepRequest) {
    this.run = {
      id: crypto.randomUUID(),
      status: "pending",
      operation: "chat",
      model: input.model,
      startedAt: Date.now(),
      steps: [],
      input,
    };

    this.save();
  }

  get runId(): string {
    return this.run.id;
  }

  // ─── Step Tracking ───────────────────────────────────────────

  startStep(model: string, provider: string, request: StepRequest): number {
    const step: Step = {
      index: this.run.steps.length,
      model,
      provider,
      status: "pending",
      startedAt: Date.now(),
      request,
    };

    this.run.steps.push(step);
    this.save();
    return step.index;
  }

  completeStep(stepIndex: number, response: StepResponse): void {
    const step = this.run.steps[stepIndex];
    if (!step) return;

    step.status = "success";
    step.completedAt = Date.now();
    step.duration = step.completedAt - step.startedAt;
    step.response = response;

    this.save();
  }

  failStep(stepIndex: number, error: string): void {
    const step = this.run.steps[stepIndex];
    if (!step) return;

    step.status = "error";
    step.completedAt = Date.now();
    step.duration = step.completedAt - step.startedAt;
    step.error = error;

    this.save();
  }

  // ─── Run Completion ──────────────────────────────────────────

  completeRun(response: StepResponse): void {
    this.run.status = "success";
    this.run.completedAt = Date.now();
    this.run.duration = this.run.completedAt - this.run.startedAt;
    this.run.provider = response.provider;
    this.run.promptTokens = response.promptTokens;
    this.run.completionTokens = response.completionTokens;
    this.run.totalTokens = response.totalTokens;
    this.run.cost = response.cost;

    this.save();
  }

  failRun(error: string): void {
    this.run.status = "error";
    this.run.completedAt = Date.now();
    this.run.duration = this.run.completedAt - this.run.startedAt;
    this.run.error = error;

    this.save();
  }

  // ─── Persistence ─────────────────────────────────────────────

  private save(): void {
    try {
      saveRun(this.run);
      notifyDevtools().catch(() => {});
    } catch {
      // Never break the LLM call
    }
  }
}
