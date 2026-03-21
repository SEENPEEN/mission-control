"use client";

import { agents, type Agent, type AgentStatus } from "../data/agents";

const statusStyles: Record<AgentStatus, { dot: string; label: string; text: string }> = {
  online:  { dot: "bg-emerald-400 shadow-lg shadow-emerald-500/40", label: "Online", text: "text-emerald-400" },
  offline: { dot: "bg-red-400 shadow-lg shadow-red-500/40", label: "Offline", text: "text-red-400" },
  pending: { dot: "bg-amber-400 shadow-lg shadow-amber-500/40 animate-pulse", label: "Pending Setup", text: "text-amber-400" },
};

const tierLabels: Record<number, string> = {
  1: "Commander",
  2: "Lieutenant",
  3: "Operator",
};

function AgentCard({ agent }: { agent: Agent }) {
  const ss = statusStyles[agent.status];

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-4 transition-all duration-300 hover:border-zinc-600 hover:scale-[1.02]">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-semibold text-zinc-100 text-sm">{agent.name}</h3>
          <p className="text-[11px] text-zinc-500 mt-0.5">{agent.role}</p>
        </div>
        <div className="flex items-center gap-2">
          <div className={`h-2.5 w-2.5 rounded-full ${ss.dot}`} />
          <span className={`text-[10px] font-medium ${ss.text}`}>{ss.label}</span>
        </div>
      </div>
      <div className="flex items-center gap-2 mb-3">
        <span className="rounded-md bg-zinc-800 px-2 py-0.5 text-[10px] font-mono text-zinc-400">
          {agent.model}
        </span>
        <span className="rounded-md bg-zinc-800/60 px-2 py-0.5 text-[10px] text-zinc-500">
          {tierLabels[agent.tier] || "Operator"}
        </span>
        {agent.costPerDay > 0 && (
          <span className="rounded-md bg-zinc-800/60 px-2 py-0.5 text-[10px] text-zinc-500 font-mono">
            ~${agent.costPerDay.toFixed(2)}/day
          </span>
        )}
      </div>
      {agent.chats.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {agent.chats.map((chat) => (
            <span key={chat} className="rounded bg-zinc-800/80 px-1.5 py-0.5 text-[10px] text-zinc-500">
              #{chat}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

export default function AgentsTab() {
  const online = agents.filter((a) => a.status === "online").length;
  const pending = agents.filter((a) => a.status === "pending").length;

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="flex gap-3">
        <div className="flex items-center gap-2 rounded-xl bg-zinc-900/80 border border-zinc-800 px-4 py-3">
          <div className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
          <span className="text-sm font-bold text-zinc-100">{online}</span>
          <span className="text-[11px] text-zinc-500 uppercase tracking-wider">Online</span>
        </div>
        <div className="flex items-center gap-2 rounded-xl bg-zinc-900/80 border border-zinc-800 px-4 py-3">
          <div className="h-2.5 w-2.5 rounded-full bg-amber-400 animate-pulse" />
          <span className="text-sm font-bold text-zinc-100">{pending}</span>
          <span className="text-[11px] text-zinc-500 uppercase tracking-wider">Pending</span>
        </div>
        <div className="flex items-center gap-2 rounded-xl bg-zinc-900/80 border border-zinc-800 px-4 py-3">
          <span className="text-sm font-bold text-zinc-100">{agents.length}</span>
          <span className="text-[11px] text-zinc-500 uppercase tracking-wider">Total Fleet</span>
        </div>
      </div>

      {/* Chain of Command */}
      <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-4">
        <h3 className="text-[11px] font-bold uppercase tracking-widest text-zinc-500 mb-3">Chain of Command</h3>
        <div className="flex items-center gap-2 text-sm flex-wrap">
          <span className="rounded-lg bg-blue-500/15 border border-blue-500/20 px-3 py-1.5 text-blue-300 font-semibold">
            Steven
          </span>
          <span className="text-zinc-600">&rarr;</span>
          <span className="rounded-lg bg-emerald-500/15 border border-emerald-500/20 px-3 py-1.5 text-emerald-300 font-semibold">
            Alfred
          </span>
          <span className="text-zinc-600">&rarr;</span>
          <span className="rounded-lg bg-yellow-500/15 border border-yellow-500/20 px-3 py-1.5 text-yellow-300 font-semibold">
            Alfred2
          </span>
          <span className="text-zinc-600">&rarr;</span>
          <span className="rounded-lg bg-zinc-500/15 border border-zinc-500/20 px-3 py-1.5 text-zinc-300">
            Fleet
          </span>
        </div>
      </div>

      {/* Agent Grid */}
      <div className="grid gap-3 sm:grid-cols-2">
        {agents.map((agent) => (
          <AgentCard key={agent.id} agent={agent} />
        ))}
      </div>
    </div>
  );
}
