"use client";

import { useState } from "react";
import { useRuns } from "@/lib/hooks";
import { Header } from "@/components/devtools/Header";
import { RunList } from "@/components/devtools/RunList";
import { RunSummary } from "@/components/devtools/RunSummary";
import { StepDetail } from "@/components/devtools/StepDetail";
import { ScrollArea } from "@/components/ui/scroll-area";


export default function DevToolsPage() {
  const { runs, loading, connected, refresh, clearRuns } = useRuns();
  const [selectedRunId, setSelectedRunId] = useState<string | null>(null);

  const selectedRun = runs.find((r) => r.id === selectedRunId) ?? runs[0] ?? null;

  return (
    <div className="h-screen flex flex-col bg-background text-foreground font-inter">
      <Header connected={connected} onRefresh={refresh} onClear={clearRuns} />

      <div className="flex flex-1 overflow-hidden">
        {/* Left: Run List */}
        <RunList
          runs={runs}
          selectedRunId={selectedRun?.id ?? null}
          onSelectRun={setSelectedRunId}
        />

        {/* Right: Detail Panel */}
        <div className="flex-1 overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              Loading...
            </div>
          ) : selectedRun ? (
            <ScrollArea className="h-full">
              <div className="p-6 space-y-6 max-w-5xl">
                {/* Run Summary */}
                <RunSummary run={selectedRun} />

                {/* Steps */}
                <div className="space-y-4">
                  {selectedRun.steps.map((step) => (
                    <StepDetail key={step.index} step={step} />
                  ))}
                </div>
              </div>
            </ScrollArea>
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center space-y-2">
                <p className="text-muted-foreground text-lg">No runs to display</p>
                <p className="text-muted-foreground text-sm">
                  Make a POST to <code className="bg-muted px-2 py-1 rounded text-xs font-mono">http://localhost:3001/chat/completions</code> to see telemetry
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
