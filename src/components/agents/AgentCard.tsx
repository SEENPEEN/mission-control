"use client";

import { Agent } from "@/types";
import StatusPill from "./StatusPill";

function timeAgoStr(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return mins + "m ago";
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return hrs + "h ago";
  return Math.floor(hrs / 24) + "d ago";
}

export default function AgentCard({ agent }: { agent: Agent }) {
  return (
    <div
      className="relative group bg-bg-card rounded-2xl border border-border-subtle p-4 transition-all duration-200 hover:-translate-y-0.5 cursor-pointer"
      style={{
        boxShadow: "0 0 0 1px " + agent.accentColor + "15, 0 0 20px " + agent.accentColor + "08",
        borderColor: agent.accentColor + "25",
      }}
    >
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
        style={{ boxShadow: "0 0 30px " + agent.accentColor + "15, 0 0 0 1px " + agent.accentColor + "30" }}
      />
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-3">
          <span className="text-xl">{agent.emoji}</span>
          <StatusPill status={agent.status} />
        </div>
        <h3 className="font-display text-sm font-bold tracking-wide" style={{ color: agent.accentColor }}>
          {agent.name}
        </h3>
        <p className="text-text-secondary text-xs mt-0.5">{agent.role}</p>
        <div className="mt-3 space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="text-text-ghost text-[10px] font-display uppercase tracking-wider w-12">Model</span>
            <span className="text-text-secondary text-xs truncate">{agent.model}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-text-ghost text-[10px] font-display uppercase tracking-wider w-12">Task</span>
            <span className="text-text-secondary text-xs truncate">
              {agent.currentTask || "\u2014"}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-text-ghost text-[10px] font-display uppercase tracking-wider w-12">Active</span>
            <span className="text-text-secondary text-xs">{timeAgoStr(agent.lastActive)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}