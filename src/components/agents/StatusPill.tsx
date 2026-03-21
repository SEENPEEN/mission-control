"use client";

import { AgentStatus } from "@/types";

const statusConfig: Record<AgentStatus, { label: string; bg: string; text: string; dot: string; pulse: boolean }> = {
  working: { label: "Working", bg: "bg-green-500/10", text: "text-green-400", dot: "bg-green-400", pulse: true },
  idle: { label: "Idle", bg: "bg-zinc-500/10", text: "text-zinc-400", dot: "bg-zinc-400", pulse: false },
  error: { label: "Error", bg: "bg-red-500/10", text: "text-red-400", dot: "bg-red-400", pulse: true },
  offline: { label: "Offline", bg: "bg-zinc-800/50", text: "text-zinc-600", dot: "bg-zinc-600", pulse: false },
};

export default function StatusPill({ status }: { status: AgentStatus }) {
  const config = statusConfig[status];
  return (
    <div className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full ${config.bg}`}>
      <div className={`w-1.5 h-1.5 rounded-full ${config.dot} ${config.pulse ? "animate-pulse" : ""}`} />
      <span className={`text-[10px] font-display font-bold tracking-wider uppercase ${config.text}`}>
        {config.label}
      </span>
    </div>
  );
}