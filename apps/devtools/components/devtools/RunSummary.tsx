"use client";

import type { Run } from "@/lib/telemetry";
import { Badge } from "@/components/ui/badge";

interface RunSummaryProps {
  run: Run;
}

function formatDuration(ms?: number): string {
  if (!ms) return "—";
  if (ms < 1000) return `${ms}ms`;
  return `${(ms / 1000).toFixed(2)}s`;
}

export function RunSummary({ run }: RunSummaryProps) {
  return (
    <div className="border border-border rounded-lg p-5 bg-card">
      <div className="grid grid-cols-4 gap-6">
        {/* Row 1 */}
        <div>
          <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wider">Status</p>
          <Badge
            variant="outline"
            className={
              run.status === "success"
                ? "bg-emerald-600/20 text-emerald-400 border-emerald-600/30"
                : run.status === "error"
                ? "bg-red-600/20 text-red-400 border-red-600/30"
                : "bg-yellow-600/20 text-yellow-400 border-yellow-600/30"
            }
          >
            {run.status}
          </Badge>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wider">Operation</p>
          <Badge variant="outline">{run.operation}</Badge>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wider">Model</p>
          <p className="text-sm">{run.model}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wider">Provider</p>
          <p className="text-sm">{run.provider || "—"}</p>
        </div>

        {/* Row 2 */}
        <div>
          <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wider">Duration</p>
          <p className="text-sm font-mono">{formatDuration(run.duration)}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wider">Prompt Tokens</p>
          <p className="text-sm font-mono">{run.promptTokens ?? "—"}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wider">Completion Tokens</p>
          <p className="text-sm font-mono">{run.completionTokens ?? "—"}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wider">Total Tokens</p>
          <p className="text-sm font-mono">{run.totalTokens ?? "—"}</p>
        </div>
      </div>

      {/* Step types row */}
      <div className="mt-4 pt-4 border-t border-border">
        <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wider">Step Types</p>
        <div className="flex gap-2">
          <Badge variant="outline">response: {run.steps.length}</Badge>
        </div>
      </div>

      {/* Error display */}
      {run.error && (
        <div className="mt-4 pt-4 border-t border-border">
          <p className="text-xs text-red-400 mb-2 uppercase tracking-wider">Error</p>
          <p className="text-sm text-red-300 font-mono bg-red-950/30 rounded p-3 break-words">
            {run.error}
          </p>
        </div>
      )}
    </div>
  );
}
