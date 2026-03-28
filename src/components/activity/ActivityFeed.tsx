"use client";

import { useEffect, useRef } from "react";
import { mockActivities } from "@/data/mockData";
import { ActivitySeverity } from "@/types";

const severityDot: Record<ActivitySeverity, string> = {
  info: "bg-[#00F0FF]",
  success: "bg-[#39FF14]",
  warning: "bg-[#E8F630]",
  error: "bg-[#FF2E97]",
};

function formatTime(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false });
}

export default function ActivityFeed() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const sorted = [...mockActivities].sort(
    (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
  );

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, []);

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-[#E8F630] animate-pulse" />
          <h2 className="font-display text-[11px] font-bold tracking-[0.15em] uppercase text-text-secondary">
            Live Activity Feed
          </h2>
        </div>
        <span className="font-display text-[10px] text-text-ghost tabular-nums">
          {sorted.length} events
        </span>
      </div>
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto space-y-0.5 bg-bg-surface rounded-xl border border-border-subtle p-2"
      >
        {sorted.map((entry) => (
          <div
            key={entry.id}
            className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-3 px-2 sm:px-3 py-2 rounded-lg hover:bg-bg-card transition-colors group"
          >
            <div className="flex items-center gap-2 shrink-0">
              <span className="font-editor text-[11px] text-text-ghost tabular-nums whitespace-nowrap">
                {formatTime(entry.timestamp)}
              </span>
              <div className={"w-1.5 h-1.5 rounded-full shrink-0 " + severityDot[entry.status]} />
              <span
                className="font-display text-[11px] font-bold tracking-wide whitespace-nowrap"
                style={{ color: entry.agentColor }}
              >
                {entry.agentName}
              </span>
            </div>
            <span className="text-xs text-text-secondary leading-relaxed pl-4 sm:pl-0">
              <span className="text-text-ghost font-display text-[10px] uppercase tracking-wider mr-1.5">
                {entry.action}
              </span>
              {entry.taskName && (
                <span className="text-text-primary font-medium mr-1.5">{entry.taskName}</span>
              )}
              {entry.message}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}