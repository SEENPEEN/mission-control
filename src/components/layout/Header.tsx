"use client";

import { useApp } from "@/context/AppContext";

export default function Header() {
  const { state } = useApp();

  const total = state.cards.length;
  const todo = state.cards.filter((c) => c.status === "todo").length;
  const active = state.cards.filter((c) => c.status === "in-progress").length;
  const done = state.cards.filter((c) => c.status === "complete").length;

  return (
    <header className="flex items-center gap-3 px-6 h-14 border-b border-border-subtle">
      <div className="status-dot w-2 h-2 rounded-full bg-text-secondary" />
      <h1 className="font-display text-sm font-bold tracking-[0.15em] uppercase text-text-primary">
        Mission Control
      </h1>
      <span className="text-text-ghost text-xs font-display ml-1">v1.0</span>

      {total > 0 && (
        <div className="ml-auto flex items-center gap-4 font-display text-[11px] tracking-wide tabular-nums">
          <span className="text-text-ghost">
            <span className="text-text-secondary">{todo}</span> todo
          </span>
          <span className="text-text-ghost">
            <span className="text-text-secondary">{active}</span> active
          </span>
          <span className="text-text-ghost">
            <span className="text-text-secondary">{done}</span> done
          </span>
          <span className="text-text-ghost border-l border-border-subtle pl-4">
            <span className="text-text-primary">{total}</span> total
          </span>
        </div>
      )}
    </header>
  );
}
