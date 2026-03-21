"use client";

import { mockAgents } from "@/data/mockData";
import AgentCard from "./AgentCard";

export default function AgentGrid() {
  const activeCount = mockAgents.filter((a) => a.status === "working").length;
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          <h2 className="font-display text-[11px] font-bold tracking-[0.15em] uppercase text-text-secondary">
            Agent Status Cards
          </h2>
        </div>
        <span className="font-display text-[11px] text-text-ghost tabular-nums">
          <span className="text-green-400">{activeCount}</span> / {mockAgents.length} active
        </span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {mockAgents.map((agent) => (
          <AgentCard key={agent.id} agent={agent} />
        ))}
      </div>
    </div>
  );
}