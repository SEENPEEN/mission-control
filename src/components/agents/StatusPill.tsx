"use client";

import { AgentStatus } from "@/types";

const statusConfig: Record<AgentStatus, { label: string; dotColor: string; pulse: boolean }> = {
  working: { label: "Working", dotColor: "#39FF14", pulse: true },
  idle: { label: "Idle", dotColor: "#00F0FF", pulse: false },
  error: { label: "Error", dotColor: "#FF2E97", pulse: true },
  offline: { label: "Offline", dotColor: "#BF5FFF", pulse: false },
};

export default function StatusPill({ status }: { status: AgentStatus }) {
  const config = statusConfig[status];
  return (
    <div
      className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full"
      style={{ backgroundColor: config.dotColor + "15" }}
    >
      <div
        className={`w-1.5 h-1.5 rounded-full ${config.pulse ? "animate-pulse" : ""}`}
        style={{ backgroundColor: config.dotColor, boxShadow: `0 0 6px ${config.dotColor}60` }}
      />
      <span
        className="text-[10px] font-display font-bold tracking-wider uppercase"
        style={{ color: config.dotColor }}
      >
        {config.label}
      </span>
    </div>
  );
}
