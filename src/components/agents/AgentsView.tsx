"use client";

import { ArrowRight } from "lucide-react";
import PanelShell from "@/components/layout/PanelShell";
import StatusPill from "./StatusPill";
import { mockAgents } from "@/data/mockData";
import { agentCosts } from "@/data/usageData";
import type { Agent } from "@/types";

function timeAgoStr(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return mins + "m ago";
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return hrs + "h ago";
  return Math.floor(hrs / 24) + "d ago";
}

function getCost(name: string): string {
  const entry = agentCosts.find(
    (a) => name.toLowerCase().includes(a.name.toLowerCase().split(" ")[0])
  );
  if (!entry) return "—";
  if (entry.costPerDay === 0) return "$0.00";
  return "$" + entry.costPerDay.toFixed(2) + "/day";
}

// Chain of command data
const chain = [
  { name: "Steven", role: "Commander", color: "#E8E8F0" },
  { name: "Alfred", role: "Lead", color: "#E8F630" },
  { name: "Alfred2", role: "2nd", color: "#00F0FF" },
];

const subordinates = [
  { name: "AlfredSLIM", color: "#00F0FF" },
  { name: "Kodex", color: "#39FF14" },
  { name: "Kimi", color: "#FF2E97" },
  { name: "CronjobLewis", color: "#BF5FFF" },
];

function ExpandedAgentCard({ agent }: { agent: Agent }) {
  return (
    <div
      className="bg-bg-card rounded-2xl border border-border-subtle p-5 transition-all duration-200 hover:-translate-y-0.5"
      style={{
        boxShadow: `0 0 0 1px ${agent.accentColor}15, 0 0 20px ${agent.accentColor}08`,
        borderColor: agent.accentColor + "25",
      }}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{agent.emoji}</span>
          <div>
            <h3
              className="font-display text-sm font-bold tracking-wide"
              style={{ color: agent.accentColor }}
            >
              {agent.name}
            </h3>
            <p className="text-text-secondary text-xs">{agent.role}</p>
          </div>
        </div>
        <StatusPill status={agent.status} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 mt-4">
        {[
          { label: "Model", value: agent.model },
          { label: "Cost", value: getCost(agent.name) },
          { label: "Task", value: agent.currentTask || "—" },
          { label: "Active", value: timeAgoStr(agent.lastActive) },
        ].map((row) => (
          <div key={row.label} className="flex items-center gap-2">
            <span className="text-text-ghost text-[10px] font-display uppercase tracking-wider w-12 shrink-0">
              {row.label}
            </span>
            <span className="text-text-secondary text-xs truncate">{row.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function AgentsView() {
  return (
    <div className="flex flex-col gap-4 h-full overflow-y-auto">
      {/* Chain of Command */}
      <PanelShell label="Chain of Command" accentColor="#E8F630">
        <div className="flex flex-col md:flex-row items-center gap-2 md:gap-1 py-2 overflow-x-auto">
          {/* Main chain */}
          {chain.map((node, i) => (
            <div key={node.name} className="flex items-center gap-1 md:gap-1 shrink-0">
              <div className="flex items-center gap-2 bg-bg-card border border-border-subtle rounded-lg px-3 py-2">
                <div
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ backgroundColor: node.color }}
                />
                <div>
                  <span
                    className="font-display text-xs font-bold tracking-wide"
                    style={{ color: node.color }}
                  >
                    {node.name}
                  </span>
                  <span className="text-[10px] text-text-ghost ml-1.5">{node.role}</span>
                </div>
              </div>
              {i < chain.length - 1 && (
                <ArrowRight size={14} className="text-text-ghost shrink-0 hidden md:block" />
              )}
              {i < chain.length - 1 && (
                <div className="w-px h-4 bg-border-subtle md:hidden" />
              )}
            </div>
          ))}

          {/* Arrow to subordinates */}
          <ArrowRight size={14} className="text-text-ghost shrink-0 hidden md:block" />
          <div className="w-px h-4 bg-border-subtle md:hidden" />

          {/* Subordinates bracket */}
          <div className="flex items-center gap-1.5 shrink-0 flex-wrap justify-center">
            <span className="text-text-ghost text-xs hidden md:inline">[</span>
            {subordinates.map((sub, i) => (
              <span key={sub.name} className="flex items-center gap-1">
                <span
                  className="font-display text-[11px] font-bold tracking-wide"
                  style={{ color: sub.color }}
                >
                  {sub.name}
                </span>
                {i < subordinates.length - 1 && (
                  <span className="text-text-ghost text-[10px]">,</span>
                )}
              </span>
            ))}
            <span className="text-text-ghost text-xs hidden md:inline">]</span>
          </div>
        </div>
      </PanelShell>

      {/* Expanded agent cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {mockAgents.map((agent) => (
          <ExpandedAgentCard key={agent.id} agent={agent} />
        ))}
      </div>
    </div>
  );
}
