import { missions, type Status, type Priority } from "./data/missions";

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

function MissionCard({ mission }: { mission: typeof missions[0] }) {
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
      <div className="flex items-center justify-between">
        <span className={`inline-flex items-center gap-1.5 text-[11px] font-medium ${sc.color}`}>
          <span>{sc.emoji}</span> {sc.label}
        </span>
        <span className="text-[10px] text-zinc-600 tabular-nums">{mission.dateAdded}</span>
      </div>
    </div>
  );
}

export default function Home() {
  const grouped = statusOrder.map((status) => ({
    status,
    config: statusConfig[status],
    items: missions.filter((m) => m.status === status),
  }));

  const total = missions.length;
  const active = missions.filter((m) => m.status === "IN_PROGRESS").length;
  const completed = missions.filter((m) => m.status === "COMPLETED").length;
  const blocked = missions.filter((m) => m.status === "BLOCKED").length;

  const allGreen = blocked === 0;

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-zinc-800/60 bg-black/80 backdrop-blur-xl">
        <div className="mx-auto max-w-5xl px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`h-3 w-3 rounded-full ${allGreen ? "bg-emerald-400 shadow-lg shadow-emerald-500/40" : "bg-red-400 shadow-lg shadow-red-500/40 animate-pulse"}`} />
            <h1 className="text-lg font-bold tracking-wider uppercase text-zinc-100">
              Mission Control
            </h1>
          </div>
          <span className="text-[11px] text-zinc-600 font-mono tabular-nums">
            {allGreen ? "ALL SYSTEMS GO" : "ATTENTION REQUIRED"}
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-6 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-4 gap-3">
          <StatCard label="Total" count={total} color="text-zinc-100" />
          <StatCard label="Active" count={active} color="text-yellow-400" />
          <StatCard label="Done" count={completed} color="text-emerald-400" />
          <StatCard label="Blocked" count={blocked} color="text-red-400" />
        </div>

        {/* Mission columns */}
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

        {/* Footer */}
        <footer className="border-t border-zinc-900 pt-4 pb-8 text-center">
          <p className="text-[10px] text-zinc-700 uppercase tracking-widest">
            SEEN-TOWER • Last build {new Date().toISOString().split("T")[0]}
          </p>
        </footer>
      </main>
    </div>
  );
}
