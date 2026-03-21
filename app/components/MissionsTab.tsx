"use client";

import { missions, type Status, type Priority, type Mission } from "../data/missions";

const statusConfig: Record<Status, { label: string; emoji: string; color: string; bg: string; glow?: string }> = {
  BLOCKED:     { label: "Blocked",     emoji: "🔴", color: "text-red-400",    bg: "bg-red-500/10 border-red-500/20",    glow: "shadow-red-500/20" },
  IN_PROGRESS: { label: "In Progress", emoji: "🟡", color: "text-yellow-400", bg: "bg-yellow-500/10 border-yellow-500/20", glow: "shadow-yellow-500/20" },
  COMPLETED:   { label: "Completed",   emoji: "🟢", color: "text-emerald-400",bg: "bg-emerald-500/10 border-emerald-500/20" },
  QUEUED:      { label: "Queued",      emoji: "⚪", color: "text-zinc-400",   bg: "bg-zinc-500/10 border-zinc-500/20" },
};

const priorityConfig: Record<Priority, { color: string; bg: string }> = {
  HIGH: { color: "text-red-300",    bg: "bg-red-500/15" },
  MED:  { color: "text-amber-300",  bg: "bg-amber-500/15" },
  LOW:  { color: "text-blue-300",   bg: "bg-blue-500/15" },
};

const statusOrder: Status[] = ["BLOCKED", "IN_PROGRESS", "QUEUED", "COMPLETED"];

function StatCard({ label, count, color }: { label: string; count: number; color: string }) {
  return (
    <div className="flex flex-col items-center gap-1 rounded-xl bg-zinc-900/80 border border-zinc-800 px-4 py-3 min-w-[80px]">
      <span className={`text-2xl font-bold tabular-nums ${color}`}>{count}</span>
      <span className="text-[11px] uppercase tracking-widest text-zinc-500 font-medium">{label}</span>
    </div>
  );
}

function MissionCard({ mission }: { mission: Mission }) {
  const sc = statusConfig[mission.status];
  const pc = priorityConfig[mission.priority];
  const isActive = mission.status === "IN_PROGRESS";

  return (
    <div
      className={`group relative rounded-xl border ${sc.bg} p-4 transition-all duration-300 hover:scale-[1.02] hover:border-zinc-600 ${isActive ? `shadow-lg ${sc.glow}` : ""}`}
    >
      {isActive && (
        <div className="absolute top-3 right-3 h-2 w-2 rounded-full bg-yellow-400 animate-pulse" />
      )}
      <div className="flex items-start justify-between gap-3 mb-2">
        <h3 className="font-semibold text-zinc-100 text-sm leading-tight">{mission.name}</h3>
        <span className={`shrink-0 rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${pc.bg} ${pc.color}`}>
          {mission.priority}
        </span>
      </div>
      <p className="text-xs text-zinc-400 leading-relaxed mb-3">{mission.description}</p>
      {(mission.leadAgent || mission.chat) && (
        <div className="flex items-center gap-3 mb-3 text-[11px]">
          {mission.leadAgent && (
            <span className="text-zinc-500">
              <span className="text-zinc-600">Lead:</span>{" "}
              <span className="text-zinc-300">{mission.leadAgent}</span>
            </span>
          )}
          {mission.chat && (
            <span className="text-zinc-500">
              <span className="text-zinc-600">Chat:</span>{" "}
              <span className="text-zinc-300">#{mission.chat}</span>
            </span>
          )}
        </div>
      )}
      <div className="flex items-center justify-between">
        <span className={`inline-flex items-center gap-1.5 text-[11px] font-medium ${sc.color}`}>
          <span>{sc.emoji}</span> {sc.label}
        </span>
        <span className="text-[10px] text-zinc-600 tabular-nums">{mission.dateAdded}</span>
      </div>
    </div>
  );
}

export default function MissionsTab() {
  const grouped = statusOrder.map((status) => ({
    status,
    config: statusConfig[status],
    items: missions.filter((m) => m.status === status),
  }));

  const total = missions.length;
  const active = missions.filter((m) => m.status === "IN_PROGRESS").length;
  const completed = missions.filter((m) => m.status === "COMPLETED").length;
  const blocked = missions.filter((m) => m.status === "BLOCKED").length;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-4 gap-3">
        <StatCard label="Total" count={total} color="text-zinc-100" />
        <StatCard label="Active" count={active} color="text-yellow-400" />
        <StatCard label="Done" count={completed} color="text-emerald-400" />
        <StatCard label="Blocked" count={blocked} color="text-red-400" />
      </div>

      <div className="space-y-6">
        {grouped.map(({ status, config, items }) =>
          items.length > 0 ? (
            <section key={status}>
              <div className="flex items-center gap-2 mb-3">
                <span>{config.emoji}</span>
                <h2 className={`text-xs font-bold uppercase tracking-widest ${config.color}`}>
                  {config.label}
                </h2>
                <span className="text-[10px] text-zinc-600 font-mono">({items.length})</span>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {items.map((mission) => (
                  <MissionCard key={mission.id} mission={mission} />
                ))}
              </div>
            </section>
          ) : null
        )}
      </div>
    </div>
  );
}
