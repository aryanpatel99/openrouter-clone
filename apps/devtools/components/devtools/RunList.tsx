"use client";

import type { Run } from "@/lib/telemetry";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

interface RunListProps {
  runs: Run[];
  selectedRunId: string | null;
  onSelectRun: (id: string) => void;
}

function StatusBadge({ status }: { status: Run["status"] }) {
  const variants: Record<string, string> = {
    success: "bg-emerald-600/20 text-emerald-400 border-emerald-600/30",
    error: "bg-red-600/20 text-red-400 border-red-600/30",
    pending: "bg-yellow-600/20 text-yellow-400 border-yellow-600/30",
  };

  return (
    <Badge variant="outline" className={`text-[11px] px-1.5 py-0 ${variants[status]}`}>
      {status}
    </Badge>
  );
}

function timeAgo(timestamp: number): string {
  const seconds = Math.floor((Date.now() - timestamp) / 1000);
  if (seconds < 60) return `${seconds}s ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

function getMessagePreview(run: Run): string {
  const userMessage = run.input.messages.find((m) => m.role === "user");
  if (!userMessage) return "No message";
  return userMessage.content.length > 50
    ? userMessage.content.substring(0, 50) + "..."
    : userMessage.content;
}

export function RunList({ runs, selectedRunId, onSelectRun }: RunListProps) {
  return (
    <div className="w-80 border-r border-border flex flex-col bg-card">
      <div className="px-4 py-3 border-b border-border">
        <h2 className="text-sm font-medium text-muted-foreground">
          RUNS ({runs.length})
        </h2>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-2 space-y-1">
          {runs.map((run) => (
            <button
              key={run.id}
              onClick={() => onSelectRun(run.id)}
              className={`w-full text-left p-3 rounded-lg transition-colors ${
                selectedRunId === run.id
                  ? "bg-accent"
                  : "hover:bg-accent/50"
              }`}
            >
              <div className="flex items-center gap-1.5 mb-1.5">
                <StatusBadge status={run.status} />
                <Badge variant="outline" className="text-[11px] px-1.5 py-0">
                  chat
                </Badge>
                <Badge variant="outline" className="text-[11px] px-1.5 py-0">
                  response
                </Badge>
              </div>

              <p className="text-sm text-foreground truncate">
                {getMessagePreview(run)}
              </p>

              <div className="flex items-center gap-2 mt-1.5 text-xs text-muted-foreground">
                <span>{run.steps.length} step{run.steps.length !== 1 ? "s" : ""}</span>
                <span>·</span>
                <span>{timeAgo(run.startedAt)}</span>
              </div>
            </button>
          ))}

          {runs.length === 0 && (
            <div className="text-center text-muted-foreground text-sm py-10">
              No runs yet. Make an API call to see telemetry.
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
